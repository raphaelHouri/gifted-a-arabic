import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import AuthStackNavigator from "./navigators/AuthStackNavigator";
import { I18nManager, Platform, StatusBar } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { LoadingScreen } from "./screens";
import { FIREBASE_AUTH } from "./firebaseConfig";
import AppStackNavigator from "./navigators/AppStackNavigator";
import { QuizProvider } from "./useContext/useQuiz";
import { getOrCreateUserDocument, updateDocument } from "./api/firestoreApi";
import "react-native-gesture-handler";
import { PostHogProvider } from "posthog-react-native";
import { posthog, posthogAsync } from "./utils/posthog";
import { timestampToString } from "./utils/generalUtil";
import { AuthContext } from "./useContext/AuthContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const setNewScore = (summarySolutionDB, exerciseId) => {
    if (currentUser) {
      const temp_currentUser = { ...currentUser };
      if (!(exerciseId in temp_currentUser.solutions))
        temp_currentUser.solutions[exerciseId] = {};
      temp_currentUser.solutions[exerciseId] = summarySolutionDB;
      setCurrentUser(temp_currentUser);
      const result = updateDocument(
        `users/${currentUser.email}`,
        summarySolutionDB,
        `solutions.${exerciseId}`
      );
    }
  };
  const updateField = async (data, innerPath) => {
    const result = await updateDocument(
      `users/${currentUser.email}`,
      data,
      innerPath
    );
    setCurrentUser((user) => ({ ...user, ["settings"]: data }));
    return result;
  };

  const authStateChanged = async (user) => {
    if (user) {
      const userDB = await getOrCreateUserDocument(`users/${user.email}`, user);
      setCurrentUser(userDB);
      if (posthog) {
        posthog?.identify(userDB.email, {
          device: Platform.OS,
          isPremium: userDB.isPremium,
        });
      } else {
        (await posthogAsync).identify(userDB.email, {
          isPremium: userDB.isPremium,
        });
      }
    } else {
      setCurrentUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    Platform.OS == "android" && I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
    //create lister for changes in the connection
    const auth = FIREBASE_AUTH;
    const subscriber = onAuthStateChanged(auth, authStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    let premiumEndTime = currentUser?.premiumEndTime;
    if (premiumEndTime != null && typeof premiumEndTime == "object") {
      premiumEndTime = timestampToString(premiumEndTime);
      // console.log(premiumEndTime);
      updateDocument(
        `users/${currentUser.email}`,
        premiumEndTime,
        `premiumEndTime`
      );
    }

    if (premiumEndTime && new Date(premiumEndTime)) {
      if (new Date(premiumEndTime) < new Date()) {
        setCurrentUser((user) => ({
          ...user,
          premiumEndTime,
          isPremium: false,
        }));
        updateDocument(`users/${currentUser.email}`, false, `isPremium`);
      }
    }
  }, [currentUser?.premiumEndTime, currentUser?.isPremium]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  const navigationRef = createNavigationContainerRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // Initial route when the app is ready
        const routeName = navigationRef.getCurrentRoute()?.name;
        // console.log("Current route name111:", routeName); //test it please
        posthogAsync.screen(routeName);
      }}
      onStateChange={async () => {
        const routeName = navigationRef.getCurrentRoute()?.name;
        // console.log("Current route name222:", routeName); //test it please
        posthogAsync.screen(routeName);
      }}
    >
      <PostHogProvider
        client={posthogAsync}
        autocapture={{ captureScreens: false }}
      >
        <AuthContext.Provider
          value={{ currentUser, setNewScore, updateField, authStateChanged }}
        >
          <QuizProvider>
            <StatusBar barStyle="light-content" backgroundColor="#b8bdf0" />
            {currentUser ? <AppStackNavigator /> : <AuthStackNavigator />}
          </QuizProvider>
        </AuthContext.Provider>
      </PostHogProvider>
    </NavigationContainer>
  );
}
