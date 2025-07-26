import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { termsText } from "../constant/constantsTerms";
import { useNavigation } from "@react-navigation/native";

export default function Terms() {
  const navigation = useNavigation();

  const renderBackButton = () => {
    return (
      <View
        className="absolute top-4 p-2 rounded-full z-50 bg-white"
        style={
          Platform.OS == "web" ? { start: 24, top: 40 } : { end: 24, top: 40 }
        }
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="left" size={20} color="#00ccbb" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#e8ecf4", direction: "rtl" }}
    >
      <View style={styles.container}>
        {renderBackButton()}
        <ScrollView>
          <View className="px-3">
            <Text
              style={{
                textAlign: Platform.OS == "web" ? "right" : "left",
              }}
            >
              {termsText.split("<br>").join("\n")}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
});
