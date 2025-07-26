import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  link,
}) => {
  const containerStyle = {
    width: "100%",
    padding: link ? 0 : 15,
    marginVertical: link ? 0 : 5,
    alignItems: "center",
    borderRadius: 5,
  };
  return (
    <View style={styles.formAction}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          containerStyle,
          styles.container,
          styles[`container_${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        <Text
          style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? { color: fgColor } : {},
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container_PRIMARY: {
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },

  container_SECONDARY: {
    backgroundColor: "#075eec",
    borderColor: "#075eec",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },

  text_SECONDARY: {
    color: "#3B71F3",
  },

  text_TERTIARY: {
    fontSize: 17,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  formAction: {
    marginVertical: 12,
  },
});

export default CustomButton;
