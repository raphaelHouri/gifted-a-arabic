// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { ExerciseScreen, HomeScreen, QuizScreen } from "../screens";
// import { createStackNavigator } from "@react-navigation/stack";
// import { Ionicons } from "@expo/vector-icons";

// import SettingsScreen from "../screens/SettingsScreen";
// import InstructionsScreen from "../screens/InstructionsScreen";
// import CustomDrawer from "../components/CustomDrawer";
// import PrintPaperScreen from "../screens/PrintPaperScreen";
// import SubscriptionScreen from "../screens/SubscriptionScreen";
// import { useQuiz } from "../useContext/useQuiz";
// import { languageDrawerDict } from "../constant/LanguageDict";
// import { Platform, Image } from "react-native";
// import StatisticsScreen from "../screens/StatisticsScreen";
// import SubscriptionStackScreen from "../screens/SubscriptionStackScreen";
// import { useAuth } from "../useContext/AuthContext";
// import OnboardingRegisterScreen from "../components/onboarding/OnboardingRegisterScreen";
// import CouponScreen from "../screens/CouponScreen";
// import { Directions } from "react-native-gesture-handler";

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// function AppStackNavigator() {
//   const { currentUser } = useAuth();
//   const { testVersion } = useQuiz();
//   const screenOptionsStyle = {
//     headerTitleAlign: "center",
//     headerShown: false,
//     headerStyle: {
//       backgroundColor: "#e8ecf4",
//     },
//     drawerActiveBackgroundColor: "#aa18ea",
//     drawerActiveTintColor: "#fff",
//     drawerInactiveTintColor: "#333",
//     drawerLabelStyle: {
//       marginStart: -25,
//       // fontFamily: 'Roboto-Medium',
//       fontSize: 15,
//       textAlign: Platform.OS == "web" ? "right" : "left",
//     },
//   };
//   if (Platform.OS === "ios") {
//     screenOptionsStyle["drawerItemStyle"] = { display: "inline-block" };
//   }
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={screenOptionsStyle}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: true,
//           headerTitle: () => (
//             <Image
//               style={{ width: 172, height: 52 }}
//               source={require("./../assets/logo/logo.png")}
//             />
//           ),
//           title: languageDrawerDict["Home"],
//           drawerLabel: languageDrawerDict["Home"],
//           drawerLabelStyle: {
//             marginLeft: 10,
//             marginRight: 10,
//             flex: 1,
//             direction: "ltr",
//             textAlign: "right",
//             flexDirection: "row",
//           },
//           drawerIcon: ({ color }) => (
//             <Ionicons name="home-outline" size={22} color={color} />
//           ),
//         }}
//       />
//       {/* // TODO: remove true */}
//       {currentUser?.isPremium || testVersion ? null : (
//         <Drawer.Screen
//           name="Subscription"
//           component={SubscriptionScreen}
//           options={{
//             headerShown: true,
//             title: languageDrawerDict["Subscription"],
//             drawerLabel: languageDrawerDict["Subscription"],
//             drawerLabelStyle: {
//               marginLeft: 10,
//               marginRight: 10,
//               flex: 1,
//               direction: "ltr",
//               textAlign: "right",
//               flexDirection: "row",
//             },
//             drawerIcon: ({ color }) => (
//               <Ionicons name="lock-closed-outline" size={22} color={color} />
//             ),
//           }}
//         />
//       )}
//       {currentUser?.isPremium || testVersion ? null : (
//         <Drawer.Screen
//           name="coupon"
//           component={CouponScreen}
//           options={{
//             headerShown: true,
//             title: languageDrawerDict["coupon"],
//             drawerLabel: languageDrawerDict["coupon"],
//             drawerLabelStyle: {
//               marginLeft: 10,
//               marginRight: 10,
//               flex: 1,
//               direction: "ltr",
//               textAlign: "right",
//               flexDirection: "row",
//             },
//             drawerIcon: ({ color }) => (
//               <Ionicons name="pricetag-outline" size={22} color={color} />
//             ),
//           }}
//         />
//       )}
//       <Drawer.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{
//           headerShown: true,
//           title: languageDrawerDict["Settings"],
//           drawerLabel: languageDrawerDict["Settings"],
//           drawerLabelStyle: {
//             marginLeft: 10,
//             marginRight: 10,
//             flex: 1,
//             direction: "ltr",
//             textAlign: "right",
//             flexDirection: "row",
//           },
//           drawerIcon: ({ color }) => (
//             <Ionicons name="settings-outline" size={22} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Instructions"
//         component={InstructionsScreen}
//         options={{
//           headerShown: true,
//           title: languageDrawerDict["Instructions"],
//           drawerLabel: languageDrawerDict["Instructions"],
//           drawerLabelStyle: {
//             marginLeft: 10,
//             marginRight: 10,
//             flex: 1,
//             direction: "ltr",
//             textAlign: "right",
//             flexDirection: "row",
//           },
//           drawerIcon: ({ color }) => (
//             <Ionicons name="book-outline" size={22} color={color} />
//           ),
//         }}
//       />
//       {testVersion ? null : (
//         <Drawer.Screen
//           name="Printers"
//           component={PrintPaperScreen}
//           options={{
//             headerShown: true,
//             title: languageDrawerDict["Printers"],
//             drawerLabel: languageDrawerDict["Printers"],
//             drawerLabelStyle: {
//               marginLeft: 10,
//               marginRight: 10,
//               flex: 1,
//               direction: "ltr",
//               textAlign: "right",
//               flexDirection: "row",
//             },
//             drawerIcon: ({ color }) => (
//               <Ionicons name="print-outline" size={22} color={color} />
//             ),
//           }}
//         />
//       )}
//       <Drawer.Screen
//         name="Statistics"
//         component={StatisticsScreen}
//         options={{
//           headerShown: true,
//           title: languageDrawerDict["Statistics"],
//           drawerLabel: languageDrawerDict["Statistics"],
//           drawerLabelStyle: {
//             marginLeft: 10,
//             marginRight: 10,
//             flex: 1,
//             direction: "ltr",
//             textAlign: "right",
//             flexDirection: "row",
//           },
//           drawerIcon: ({ color }) => (
//             <Ionicons name="reader-outline" size={22} color={color} />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }

// const AppAuthNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="OnboardingRegister">
//       <Stack.Screen
//         name="OnboardingRegister"
//         component={OnboardingRegisterScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Home"
//         component={AppStackNavigator}
//         options={{ headerShown: false }}
//       />
//       {/*  name= המלצות להורים */}
//       <Stack.Screen
//         name={languageDrawerDict["Instructions"]}
//         component={InstructionsScreen}
//         options={{ headerShown: true }}
//       />
//       <Stack.Screen
//         name="Exercise"
//         component={ExerciseScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SubscriptionStack"
//         component={SubscriptionStackScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Quiz"
//         component={QuizScreen}
//         options={{
//           headerShown: false,
//           swipeEnabled: false,
//           gestureEnabled: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AppAuthNavigator;

import { createDrawerNavigator } from "@react-navigation/drawer";
import { ExerciseScreen, HomeScreen, QuizScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import InstructionsScreen from "../screens/InstructionsScreen";
import CustomDrawer from "../components/CustomDrawer";
import PrintPaperScreen from "../screens/PrintPaperScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import { useQuiz } from "../useContext/useQuiz";
import { languageDrawerDict } from "../constant/LanguageDict";
import { Platform, Image } from "react-native";
import StatisticsScreen from "../screens/StatisticsScreen";
import SubscriptionStackScreen from "../screens/SubscriptionStackScreen";
import { useAuth } from "../useContext/AuthContext";
import OnboardingRegisterScreen from "../components/onboarding/OnboardingRegisterScreen";
import CouponScreen from "../screens/CouponScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AppStackNavigator() {
  const { currentUser } = useAuth();
  const { testVersion } = useQuiz();
  const screenOptionsStyle = {
    headerTitleAlign: "center",
    headerShown: false,
    headerStyle: {
      backgroundColor: "#e8ecf4",
    },
    drawerActiveBackgroundColor: "#aa18ea",
    drawerActiveTintColor: "#fff",
    drawerInactiveTintColor: "#333",
    drawerStyle: {
      width: Platform.OS == "ios" ? 280 : 320, // add it to handle the width for ios and android default width is bigger then normal
    },
    // drawerLabelStyle: {   BC we add custom DrawerItem and donot need it.
    //   marginStart: -5,
    //   fontSize: 15,
    //   textAlign: Platform.OS == "web" ? "right" : "left",
    // },
    // drawerItemStyle:{
    //   borderRadius: 8,
    //   marginHorizontal: 8,
    //   marginVertical: 4,
    //   overflow: 'hidden',
    //   backgroundColor:'red'

    // }
  };
  if (Platform.OS === "ios") {
    screenOptionsStyle["drawerItemStyle"] = { display: "inline-block" };
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={screenOptionsStyle}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image
              style={{ width: 172, height: 52 }}
              source={require("./../assets/logo/logo.png")}
            />
          ),
          title: languageDrawerDict["Home"],
          drawerLabel: languageDrawerDict["Home"],
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      {/* // TODO: remove true */}
      {currentUser?.isPremium || testVersion ? null : (
        <Drawer.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{
            headerShown: true,
            title: languageDrawerDict["Subscription"],
            drawerLabel: languageDrawerDict["Subscription"],
            drawerIcon: ({ color }) => (
              <Ionicons name="lock-closed-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      {currentUser?.isPremium || testVersion ? null : (
        <Drawer.Screen
          name="coupon"
          component={CouponScreen}
          options={{
            headerShown: true,
            title: languageDrawerDict["coupon"],
            drawerLabel: languageDrawerDict["coupon"],
            drawerIcon: ({ color }) => (
              <Ionicons name="pricetag-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: languageDrawerDict["Settings"],
          drawerLabel: languageDrawerDict["Settings"],
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Instructions"
        component={InstructionsScreen}
        options={{
          headerShown: true,
          title: languageDrawerDict["Instructions"],
          drawerLabel: languageDrawerDict["Instructions"],
          drawerIcon: ({ color }) => (
            <Ionicons name="book-outline" size={22} color={color} />
          ),
        }}
      />
      {testVersion ? null : (
        <Drawer.Screen
          name="Printers"
          component={PrintPaperScreen}
          options={{
            headerShown: true,
            title: languageDrawerDict["Printers"],
            drawerLabel: languageDrawerDict["Printers"],
            drawerIcon: ({ color }) => (
              <Ionicons name="print-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      <Drawer.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          headerShown: true,
          title: languageDrawerDict["Statistics"],
          drawerLabel: languageDrawerDict["Statistics"],
          drawerIcon: ({ color }) => (
            <Ionicons name="reader-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const AppAuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingRegister">
      <Stack.Screen
        name="OnboardingRegister"
        component={OnboardingRegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={AppStackNavigator}
        options={{ headerShown: false }}
      />
      {/*  name= המלצות להורים */}
      <Stack.Screen
        name={languageDrawerDict["Instructions"]}
        component={InstructionsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubscriptionStack"
        component={SubscriptionStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppAuthNavigator;
