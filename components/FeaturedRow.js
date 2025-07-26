import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { dictHomeScreenImage } from "../constant/constants";

const FeaturedRow = ({
  order,
  title,
  description,
  innerDescription,
  iconName,
  exercises,
  bgColor,
}) => {
  const navigation = useNavigation();
  const navigateTo = () => {
    navigation.navigate("Exercise", {
      title,
      innerDescription,
      exercises,
      bgColor,
      iconName,
    });
  };

  const renderImage = () => {
    const image = dictHomeScreenImage[iconName];
    return (
      <View className="m-3 items-center justify-center">
        <Image source={image} className="h-32 w-32  z-10 " />
      </View>
    );
  };

  if (!(order % 2))
    return (
      <View
        key={title}
        style={{ backgroundColor: bgColor.hard, display: "block" }}
      >
        <TouchableOpacity
          onPress={() => navigateTo(title, description, exercises)}
          className={`flex-row flex-1 item-center justify-between  space-x-2 mx-4 py-8 border-b border-gray-300 `}
          style={{ backgroundColor: bgColor.soft }}
        >
          <View className="w-7/12 pr-2 ">
            <View className="flex-row justify-start">
              <Text className="font-semibold text-2xl mb-4">{title}</Text>
            </View>
            <View className="flex-row justify-start ">
              <Text
                className="text-lg font-semibold text-gray-700"
                style={{ textAlign: Platform.OS == "web" ? "right" : "left" }}
              >
                {description}
              </Text>
            </View>
          </View>
          {renderImage(iconName)}
          <View
            className="justify-center item-center"
            style={{ left: Platform.OS == "web" ? -28 : -16 }}
          >
            <AntDesign name="left" size={20} color="#00CCBB" />
          </View>
        </TouchableOpacity>
      </View>
    );
  else {
    return (
      <View key={title} style={{ backgroundColor: bgColor.hard }}>
        <TouchableOpacity
          onPress={() => navigateTo(title, innerDescription, exercises)}
          className={`flex-row item-center justify-between  space-x-2 mx-4 py-8 border-b border-gray-300`}
          style={{ backgroundColor: bgColor.soft }}
        >
          {renderImage(iconName)}
          <View className="w-7/12 pr-2 ">
            <View className="flex-row justify-start">
              <Text className="font-semibold text-2xl mb-4">{title}</Text>
            </View>
            <View className="flex-row justify-start">
              <Text
                className="text-lg font-semibold text-gray-700"
                style={{ textAlign: Platform.OS == "web" ? "right" : "left" }}
              >
                {description}
              </Text>
            </View>
          </View>
          <View className="justify-center item-center -left-7">
            <AntDesign name="left" size={20} color="#00CCBB" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default FeaturedRow;
