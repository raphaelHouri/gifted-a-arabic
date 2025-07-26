import React, { createContext, useContext, useState } from "react";
import { SafeAreaView, View, Text, Image, Platform } from "react-native";
import SubscriptionCard from "../components/SubscriptionCard";
import PurchaseCard from "../components/PurchaseCard";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SuccessPurchaseCard from "../components/SuccessPurchaseCard";
import { SubscriptionContext } from "../useContext/SubscriptionContext";
// import LottieView from "lottie-react-native";
// import { AntDesign } from "@expo/vector-icons";

const SubscriptionScreen = ({ allowBack }) => {
  const [selected, setSelected] = useState(null);
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  // const renderNavigationButton = () => {
  //   if (allowBack) {
  //     return (
  //       <View
  //         className="absolute top-14 p-2 bg-gray-100 rounded-full"
  //         style={{ start: 24 }}
  //       >
  //         <TouchableOpacity onPress={navigation.goBack}>
  //           <AntDesign name="arrowleft" size={20} color={"#00ccbb"} />
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }
  // };

  // const renderImage = () => {
  //   if (Platform.OS === "web") {
  //     return (
  //       <Image
  //         source={require("./../assets/images/trophy.png")}
  //         resizeMode={"contain"}
  //         className="w-2/3 h-2/3"
  //       />
  //     );
  //   } else {
  //     return (
  //       <LottieView
  //         autoPlay
  //         className="w-full h-full"
  //         style={Platform.OS === "ios" ? { start: 0 } : { start: 0 }}
  //         source={require("./../assets/animation/win.json")}
  //       />
  //     );
  //   }
  // };

  return (
    <SubscriptionContext.Provider value={{ selected, setSelected }}>
      {/* <SafeAreaView  className="flex-1" style={{ direction: "rtl" }}> */}

          {/* <View
            className="justify-center items-center"
            style={Platform.OS === "web" ? { height: 300 } : { height: "33%" }}
          >
            {renderImage()}
            {renderNavigationButton()}
          </View> */}

          {/* <View className="h-full"> */}
            <Stack.Navigator>
              <Stack.Screen
                name="Subscription"
                component={SubscriptionCard}
                options={{ headerShown: false }}
                initialParams={{goBack: navigation.goBack, allowBack:allowBack}}
              />
              <Stack.Screen
                name="Purchase"
                component={PurchaseCard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SuccessPurchase"
                component={SuccessPurchaseCard}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          {/* </View> */}
      {/* </SafeAreaView> */}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionScreen;
