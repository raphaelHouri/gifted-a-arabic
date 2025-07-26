import { View, Text, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useQuiz } from "../useContext/useQuiz";
import LottieView from "lottie-react-native";
import { Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useAuth } from "../useContext/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons/build/Icons";
import { animalList } from "../constant/constants";
import ModalBottom from "../modal/ModalBottom";
import {
  languagePremiumModalDict,
  languageStatisticDict,
} from "../constant/LanguageDict";

const ExerciseScreen = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const {
    params: { title, innerDescription, exercises, bgColor, iconName },
  } = useRoute();
  const { setExerciseId, exerciseId, setTime, testVersion } = useQuiz();
  const { currentUser } = useAuth();
  const goExercise = (id, time, isFree) => {
    if (testVersion || isFree || currentUser?.isPremium) {
      setExerciseId(id);
      setTime(time);
    } else {
      refRBSheet.current.open();
    }
  };
  useEffect(() => {
    setExerciseId(null);
  }, []);

  const renderImage = () => {
    if (Platform.OS == "web") {
      if (iconName == "math") {
        return (
          <Image
            source={require("./../assets/images/math.png")}
            className="w-full h-52 p-4"
            resizeMode="contain"
          />
        );
      }
      if (iconName == "formal_analogies") {
        return (
          <Image
            source={require("./../assets/images/formal_analogies.png")}
            className="w-full h-52 p-4"
            resizeMode="contain"
          />
        );
      }
      if (iconName == "comprehension") {
        return (
          <Image
            source={require("./../assets/images/formal_analogies.png")}
            className="w-full h-52 p-4"
            resizeMode="contain"
          />
        );
      }
    } else {
      if (iconName == "math") {
        return (
          <LottieView
            autoPlay
            className="w-full h-64 p-4"
            style={{
              backgroundColor: "#e8ecf4",
              start: -10,
            }}
            source={require("./../assets/animation/math.json")}
          />
        );
      }
      if (iconName == "formal_analogies") {
        return (
          <LottieView
            autoPlay
            className="w-full h-64 p-4"
            style={{
              backgroundColor: "#eee",
              start: -10,
            }}
            source={require("./../assets/animation/formal_analogies.json")}
          />
        );
      }
      if (iconName == "comprehension") {
        return (
          <LottieView
            autoPlay
            className="w-full h-72 p-4"
            style={{
              backgroundColor: "#eee",
              start: -10,
            }}
            source={require("./../assets/animation/comprehension.json")}
          />
        );
      }

      if (iconName == "combined") {
        return (
          <LottieView
            autoPlay
            className="w-full h-72 p-4"
            style={{
              backgroundColor: "#eee",
              start: -10,
            }}
            source={require("./../assets/animation/combined.json")}
          />
        );
      }
    }
  };

  return (
    <View className="flex-1 bg-whiteBackground" style={{ direction: "rtl" }}>
      {/* <ScrollView> */}
      <View className="relative  h-72 justify-center items-center ">
        {renderImage()}
        <View
          className="absolute top-14  p-2 bg-gray-100 rounded-full"
          style={
            Platform.OS == "web"
              ? { position: "absolute", start: 40 }
              : { position: "absolute", end: 24 }
          }
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <AntDesign name="arrowleft" size={22} color={"#00ccbb"} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View className="px-4 pt-4" style={{ alignItems: "flex-start" }}>
          <Text className="text-2xl font-bold">{title}</Text>
          <View className="space-x-2 my-1">
            <Text className="text-lg text-gray-500">{innerDescription}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, time, level, isFree }, index }) => (
          <View className="flex-row space-x-3 mt-3 items-center justify-center">
            <TouchableOpacity
              onPress={() => goExercise(id, time, isFree)}
              className=" mx-5 w-4/5 bg-white p-2  flex-row space-x-1 justify-center items-center shadow-md"
            >
              <FontAwesome5
                name={animalList[index % animalList.length]}
                size={20}
                color={"#b8bdf0"}
                style={
                  Platform.OS == "web"
                    ? { position: "absolute", end: 2 }
                    : { position: "absolute", start: 2 }
                }
              />
              <Text className="text-2xl font-semibold text-slate-600">
                {iconName != "combined"
                  ? languageStatisticDict["exercise"]
                  : languageStatisticDict["exam"]}{" "}
                {index + 1}
              </Text>
              <Text className="py-1 px-2 text-slate-800">
                {id in currentUser.solutions
                  ? currentUser.solutions[id].rightSolutions +
                    "/" +
                    currentUser.solutions[id].totalQuestion
                  : ""}
              </Text>

              {testVersion || isFree || currentUser?.isPremium ? (
                <Text
                  className="py-1 px-2 bg-[#e2e4f9] text-[#7982e3] "
                  style={
                    Platform.OS == "web"
                      ? { position: "absolute", start: 4 }
                      : { position: "absolute", end: 4 }
                  }
                >
                  {Math.floor(time / 60)}:{time % 60 == 0 ? "00" : time % 60}
                </Text>
              ) : (
                <FontAwesome5
                  name={"crown"}
                  size={20}
                  color={"#f4dd45"}
                  style={
                    Platform.OS == "web"
                      ? { position: "absolute", start: 5 }
                      : { position: "absolute", end: 5 }
                  }
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      />

      <ModalBottom
        refRBSheet={refRBSheet}
        title={languagePremiumModalDict["Access only for premium member"]}
        shortText={languagePremiumModalDict["convince me to buy your thing"]}
        image="premium"
        actionText={languagePremiumModalDict["See details"]}
        action={() => {
          refRBSheet?.current?.close();
          navigation.navigate("SubscriptionStack");
        }}
      />
    </View>
  );
};

export default ExerciseScreen;
