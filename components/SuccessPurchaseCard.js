import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useSubscription } from "../useContext/SubscriptionContext";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../useContext/AuthContext";
import { languagePurchaseDict } from "../constant/LanguageDict";
import { textToHex } from "../utils/generalUtil";
import { updateDocument } from "../api/firestoreApi";
// import { usePushNotification } from "../screens/usePushNotification";

const dictSvg = {
  "hand-thumb-up": require("./../assets/images/hand-thumb-up.png"),
  "rocket-chat": require("./../assets/images/rocket-chat.png"),
  trophy: require("./../assets/images/trophy.png"),
};

const SuccessPurchaseCard = () => {
  const { selected } = useSubscription();
  const { currentUser, authStateChanged } = useAuth();
  const navigation = useNavigation();
  // const { expoPushToken } = usePushNotification();

  // useEffect(() => {
  //   if (expoPushToken?.data) {
  //     const encrypted = textToHex(expoPushToken.data);
  //     updateDocument(
  //       `push_notification/premium`,
  //       encrypted,
  //       currentUser.email.replace(".", "$")
  //     );
  //   }
  // }, [expoPushToken]);

  useEffect(() => {
    setTimeout(() => authStateChanged(currentUser), 3000);
  }, []);

  const renderImage = () => {
    if (Platform.OS === "web") {
      return (
        <Image
          source={require("./../assets/images/check.png")}
          resizeMode={"contain"}
          className="w-2/3 h-2/3"
        />
      );
    } else {
      return (
        <LottieView
          autoPlay
          className="w-full h-full"
          style={Platform.OS === "ios" ? { start: 0 } : { start: 0 }}
          source={require("../assets/animation/check.json")}
        />
      );
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ direction: "rtl" }}>
      <View
        className="justify-center items-center"
        style={Platform.OS === "web" ? { height: 300 } : { height: "33%" }}
      >
        {renderImage()}
      </View>

      <View className="h-full">
        <View className="justify-center items-center mb-5">
          <Text className="text-xl mb-2">
            {languagePurchaseDict["Payment has been successfully completed"]}
          </Text>
          <Text className="text-xl mb-2">
            من هذه اللحظة يكون الطقم الكامل مفتوحًا لمدّة {selected.days} أيام
          </Text>
        </View>
        <View
          className="items-center mx-4 mb-2"
          style={Platform.OS == "ios" ? { bottom: 10 } : {}}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            disabled={!selected}
            className={`${
              selected ? "bg-blue-700" : "bg-gray-300"
            } py-3 w-full p-15 mx-3 items-center rounded-md`}
          >
            <Text className="text-white text-xl text-center">
              {languagePurchaseDict["back to home page"]}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessPurchaseCard;
