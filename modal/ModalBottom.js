import LottieView from "lottie-react-native";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { generalDict } from "../constant/LanguageDict";
export default function ModalBottom({
  refRBSheet,
  title,
  shortText,
  image,
  actionText,
  action,
  type,
  cancelAction,
  short,
}) {
  const sheet = refRBSheet;

  React.useEffect(() => {
    if (short) {
      setTimeout(() => {
        sheet?.current?.close();
      }, short);
    }
  }, []);
  const renderImage = () => {
    if (image == "email-send") {
      if (Platform.OS === "web") {
        return (
          <Image
            resizeMode={"contain"}
            source={require("./../assets/images/mail.png")}
            style={{height:128, width: 128, alignItems: 'center', justifyContent:"center"}}
          />
        );
      } else {
        return (
          <LottieView
            autoPlay
            className="w-full h-32 p-4"
            style={{height:128, width: 128, alignItems: 'center', justifyContent:"center"}}
            source={require("./../assets/animation/email-send.json")}
          />
        );
      }
    }
    if (image == "error") {
      return (
        <Image
          resizeMode={"contain"}
          source={require("./../assets/images/error.png")}
          style={{height:128, width: 128, alignItems: 'center', justifyContent:"center"}}
        />
      );
    }
    if (image == "warning") {
      return (
        <Image
          resizeMode={"contain"}
          source={require("./../assets/images/warning.png")}
          style={{height:128, width: 128, alignItems: 'center', justifyContent:"center"}}
        />
      );
    }
    if (image == "check") {
      if (Platform.OS === "web") {
        return (
          <Image
            resizeMode={"contain"}
            source={require("./../assets/images/check.png")}
            style={{height:128, width: 128, alignItems: 'center', justifyContent:"center"}}
          />
        );
      } else {
        return (
          <LottieView
            autoPlay
            className="w-32  h-32 p-4"
            style={{height:128, width: 128, alignItems: 'center', justifyContent:"center"}}
            source={require("./../assets/animation/check.json")}
          />
        );
      }
    }
    if (image == "premium") {
      if (Platform.OS === "web") {
        return (
          <Image
            resizeMode={"contain"}
            source={require("./../assets/images/wellDone.png")}
            style={{height:128, width: 128, alignItems: 'center', justifyContent:"center"}}
          />
        );
      } else {
        return (
          <LottieView
            autoPlay
            className="w-32  h-32 p-4"
            style={{height:128, width: 128, alignItems: 'center', justifyContent:"center"}}
            source={require("./../assets/animation/openAccess.json")}
          />
        );
      }
    }
  };

  const getButtonStyle = () => {
    if (type == "warning")
      return {
        backgroundColor: "#ff9800",
        borderColor: "#ff9800",
      };
    if (type == "error")
      return {
        backgroundColor: "#ff3c2f",
        borderColor: "#ff3c2f",
      };
    if (type == "success")
      return {
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
      };
    return {
      backgroundColor: "#075eec",
      borderColor: "#075eec ",
    };
  };
  const getTextStyle = () => {
    if (type == "warning")
      return {
        color: "#fff",
      };
    if (type == "error")
      return {
        color: "#fff",
      };
    if (type == "success")
      return {
        color: "#000",
      };
    return {

      color: "#fff",
    };
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.placeholder}>
        <View style={styles.placeholderInset}>
          {/* Replace with your content */}
        </View>
      </View>

      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={image && ["premium","warning"].includes(image)?400 :300}
        openDuration={250}
        ref={sheet}
      >
        {title && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        )}

        <View style={styles.body}>
          {shortText && (
            <Text style={styles.bodyText}>
              <Text style={{ fontWeight: "600" }}> {shortText}</Text>
            </Text>
          )}

          {image && (
            <View style={{alignItems: "center", marginBottom: 10}}>
              {renderImage()}
            </View>
          )}

          {action && (
            <TouchableOpacity onPress={() => action()}>
              <View style={[styles.btn, getButtonStyle()]}>
                <Text style={[styles.btnText, getTextStyle()]}>
                  {actionText ? actionText : "Submit"}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.bodyGap} />

          {cancelAction && (
            <TouchableOpacity
              onPress={() => {
                cancelAction();
              }}
            >
              <View style={styles.btnSecondary}>
                <Text style={styles.btnSecondaryText}>{generalDict["Cancel"]}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  sheet: {
    borderTopStartRadius: 14,
    borderTopEndRadius: 14,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: "#efefef",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  body: {
    padding: 24,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: "#0e0e0e",
    marginBottom: 24,
    textAlign: "center",
  },
  bodyGap: {
    marginBottom: 12,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "#dddce0",
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000",
  },
});
