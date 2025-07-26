import { View, Text, Platform, Image, Dimensions } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const LoadingScreen = () => {
  const { width } = Dimensions.get("window");
  const renderLoader = () => {
    if (Platform.OS == "web") {
      return (
        <Image
          source={require("./../assets/images/loading.png")}
          style={{ width: "100%", height: 208, padding: 16 }}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <LottieView
          autoPlay
          style={
            Platform.OS == "ios"
              ? {
                  width: width,
                  height: "80%",
                  padding: 16,
                  start: 20,
                  alignItems: "center",
                }
              : {
                  width: width,
                  height: "80%",
                  padding: 16,
                  alignItems: "center",
                }
          }
          source={require("../assets/animation/loading.json")}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e8ecf4", direction: "rtl" }}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderLoader()}
        <View style={Platform.OS == "web" ? { marginTop: 10 } : { top: -150 }}>
          <Image
            source={require("./../assets/logo/logo.png")}
            style={{ height: 80 }}
            resizeMode="contain"
          />
        </View>
        {Platform.OS != "web" && (
          <LottieView
            autoPlay
            style={{
              width: "80%",
              height: 120,
              padding: 16,
              top: -50,
              alignItems: "center",
            }}
            source={require("../assets/animation/loaderRow.json")}
          />
        )}
      </View>
    </View>
  );
};

export default LoadingScreen;
