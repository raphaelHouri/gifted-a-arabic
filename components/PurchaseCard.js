import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSubscription } from "../useContext/SubscriptionContext";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { url } from "../constant/constants";
import { useAuth } from "../useContext/AuthContext";
import { useQuiz } from "../useContext/useQuiz";

const PurchaseCard = () => {
  const { selected } = useSubscription();
  const {currentUser} = useAuth()
  const { couponDetails } = useQuiz()
  const navigation = useNavigation();
  
  const handleWebViewNavigationStateChange = (newNavState) => {

    const { url } = newNavState;
    if (!url) return;
    // // redirect somewhere else
    // if (url.includes('blg')) {
    //   navigation.navigate("SuccessPurchase")
    // }
    if (url.includes('payments.supergifted.co.il/success')) {
      navigation.navigate("SuccessPurchase")
    }
  };

  return (
    <SafeAreaView className="flex-1 mt-9 bg-white" style={{ direction: "rtl" }}>
      <View className="justify-center items-center z-40">
        <View
          className="absolute top-10  p-2 bg-white rounded-full"
          style={{ end: 24 }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <AntDesign name="arrowleft" size={22} color={"#00ccbb"} />
          </TouchableOpacity>
        </View>
      </View>

      <WebView
        style={styles.container}
        source={{
          uri: `${url.pay}?ClientId=${currentUser.email}&PlanId=${selected.id}&app=first${!!couponDetails? `&couponId=${couponDetails.couponId}` : "" }`,
        }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
});

export default PurchaseCard;
