import { Platform, Text } from "react-native";
import { mmlOptions } from "../constant/constants";
import MathJax from "react-native-mathjax";
import { View } from "react-native";

export const isMathQuestion = (text) => text && text.includes("$");

const dictStyle = {
  "text-black text-xl": { fontSize: 20, lineHeight: 28, color: "#000000" },
  "text-black text-lg": { fontSize: 18, lineHeight: 28, color: "#000000" },
};

const defaultStyle = {
  fontSize: 20,
  lineHeight: 28,
  color: "#000000",
  alignContent: "center",
  justifyContent: "center",
};
// style={styleText in dictStyle ? dictStyle[styleText] : defaultStyle}

export const displayQuestionMath = (text, styleText) => {
  if (true || Platform.OS in ["web", "android", "ios"]) {
    return (
      <Text
        className="bg-white text-xxl"
        style={{
          ...(Platform.OS === "android" ? { direction: "ltr" } : {}),
          flex: 1,
          fontSize: 24,
          lineHeight: 40,
          color: "#000000",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        {text.replaceAll("$", "")}
      </Text>
    );
  } else {
    return <MathJax mathJaxOptions={mmlOptions} html={text} />;
  }
};
