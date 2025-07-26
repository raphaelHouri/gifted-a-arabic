import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import FeaturedRow from "../components/FeaturedRow";
import { useQuiz } from "../useContext/useQuiz";
import LoadingScreen from "./LoadingScreen";
// import { usePushNotification } from "./usePushNotification";
import { useAuth } from "../useContext/AuthContext";
import { textToHex } from "../utils/generalUtil";
import { updateDocument } from "../api/firestoreApi";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Or any other icon set you prefer
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { categories, subscription, getGenericData, testVersion } = useQuiz();
  const { currentUser } = useAuth();
  // const { expoPushToken } = usePushNotification();
  const navigation = useNavigation(); // Hook to access navigation object

  // Animation values
  const scale = useSharedValue(1);

  // useEffect(() => {
  //   if (expoPushToken?.data && !currentUser?.isPremium) {
  //     const encrypted = textToHex(expoPushToken.data);

  //     updateDocument(
  //       `push_notification/registers`,
  //       encrypted,
  //       currentUser.email.replace(".", "$")
  //     );
  //   }
  // }, [expoPushToken]);

  useEffect(() => {
    if (!categories) {
      getGenericData();
    }
  }, [categories]);

  // Animated style for the button
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.7); // Shrink slightly on press
  };

  const handlePressOut = () => {
    scale.value = withSpring(1); // Return to original size
  };

  const navigateToPrintPage = () => {
    // Navigate to your printing page component
    navigation.navigate("Printers"); // Make sure "PrintingPage" is defined in your navigator
  };

  if (!categories && !subscription) return <LoadingScreen />;

  return (
    <SafeAreaView
      className="flex-1 bg-whiteBackground"
      style={{ direction: "rtl" }}
    >
      <View className="bg-whiteBackground flex-1">
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <FeaturedRow
              order={item.order}
              title={item.name}
              description={item.description}
              innerDescription={item.innerDescription}
              exercises={item.exercises}
              iconName={item.iconName}
              bgColor={item.bgColor}
            />
          )}
        />
        {!testVersion ? (
          <View key={"listFooter"} className="items-center mt-2 mb-6">
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={navigateToPrintPage}
              activeOpacity={1}
              className="flex-row items-center justify-center p-4 rounded-xl shadow-lg"
              style={{
                backgroundColor: "#a8c7fa",
                width: "80%",
              }}
            >
              <Animated.View
                style={[
                  animatedButtonStyle,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Icon name="printer" size={28} color="#000" />
                <Text className="text-black text-lg font-semibold ml-3">
                  להדפסת מבחנים
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
