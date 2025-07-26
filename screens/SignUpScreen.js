import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import CustomButton from "../components/customComponents/CustomButton";
import CustomInput from "../components/customComponents/CustomInput";
import { requireEmail, requireText } from "../constant/commonRules";
import { useForm } from "react-hook-form";
import { languageSignInDict } from "../constant/LanguageDict";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { usePushNotification } from "./usePushNotification";
import { updateDocument } from "../api/firestoreApi";
import { textToHex } from "../utils/generalUtil";

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  // const { expoPushToken } = usePushNotification();
  // useEffect(() => {
  //   if (expoPushToken?.data) {
  //     const encrypted = textToHex(expoPushToken.data);
  //     updateDocument(`push_notification/all_devices`, true, encrypted);
  //   }
  // }, [expoPushToken]);

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

  const auth = FIREBASE_AUTH;
  const onSignUpPressed = async (data) => {
    if (loading) {
      return;
    }
    const { password, email } = data;
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      errorMessage && setErrorMessage("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(languageSignInDict["Email already exist"]);
      }
    }
    setLoading(false);
  };

  const onPressBack = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#e8ecf4", direction: "rtl" }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="icon"
            resizeMode="contain"
            style={styles.headerImg}
            source={require("./../assets/icon/512blue.png")}
          />

          <Text style={styles.title}>
            {languageSignInDict["Sign up to"]}{" "}
            <Text style={{ color: "#075eec" }}>
              {languageSignInDict["MyApp"]}
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            {languageSignInDict["Get access to your portfolio and more"]}
          </Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            name="email"
            keyboardType="email-address"
            control={control}
            placeholder={languageSignInDict["email-address"]}
            rules={requireEmail()}
            subtitle={languageSignInDict["email-address"]}
          />
          <CustomInput
            name="password"
            placeholder={languageSignInDict["Password"]}
            control={control}
            secureTextEntry
            subtitle={languageSignInDict["Password"]}
            rules={requireText(languageSignInDict["Password"])}
          />

          <CustomInput
            name="password-repeat"
            control={control}
            placeholder={languageSignInDict["Enter your password again"]}
            secureTextEntry
            subtitle={languageSignInDict["Validate password"]}
            rules={{
              validate: (value) =>
                value === pwd || languageSignInDict["Password do not match"],
            }}
          />
          <Text className="text-red-500">{errorMessage}</Text>
          <CustomButton
            text={
              loading
                ? languageSignInDict["Loading..."]
                : languageSignInDict["Sign Up"]
            }
            onPress={handleSubmit(onSignUpPressed)}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",

              flexDirection: Platform.OS == "web" ? "row-reverse" : "row",
            }}
            onPress={() => navigation.navigate("Terms")}
          >
            <Text className="text-gray-500">
              {" "}
              {languageSignInDict["by sign up I agree to the"]}{" "}
              <Text className="text-gray-500 underline">
                {languageSignInDict["terms"]}{" "}
              </Text>
            </Text>
          </TouchableOpacity>

          <CustomButton
            link={true}
            text={languageSignInDict["I already have user, go to signIn"]}
            onPress={onPressBack}
            type="TERTIARY"
          />
          {/* {Platform.OS == "android" && (
            <View className=" flex-row flex items-center bg-blue-400 space-x-2 px-1 py-3">
              <Text className="text-white text-sm font-bold w-10/12">
                {languageSignInDict["rtlAndroid"]}
              </Text>
              <Ionicons
                name="information-circle-outline"
                size={32}
                color="white"
              />
            </View>
          )} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    flex: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  formActionSpacer: {
    marginVertical: 32,
    fontSize: 14,
    fontWeight: "600",
    color: "#4b4858",
    textAlign: "center",
  },
});
