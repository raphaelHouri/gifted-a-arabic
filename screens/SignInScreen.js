import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  Platform,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import CustomButton from "../components/customComponents/CustomButton";
import CustomInput from "../components/customComponents/CustomInput";
import { requireEmail, requireText } from "../constant/commonRules";
import { useForm } from "react-hook-form";
import { languageSignInDict } from "../constant/LanguageDict";
const auth = FIREBASE_AUTH;

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }
    const { password, email } = data;
    setLoading(true);
    const auth = FIREBASE_AUTH;
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      errorMessage && setErrorMessage("");
      // navigate to home-page
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setErrorMessage(languageSignInDict["Password isn't correct"]);
      }
      if (error.code === "auth/user-not-found") {
        setErrorMessage(languageSignInDict["Email doesn't exist"]);
      }
      if (error.code === "auth/invalid-login-credentials") {
        setErrorMessage(languageSignInDict["Email or password doesn't exist"]);
      }
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#e8ecf4", direction: "rtl" }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="icon"
            resizeMode="contain"
            style={styles.headerImg}
            source={require("./../assets/icon/512.png")}
          />

          <Text style={styles.title}>
            {languageSignInDict["Sign in to"]}{" "}
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
            rules={requireEmail(languageSignInDict["email-address"])}
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
          <Text className="text-red-500">{errorMessage}</Text>

          <CustomButton
            text={
              loading
                ? languageSignInDict["Loading..."]
                : languageSignInDict["Sign In"]
            }
            onPress={handleSubmit(onSignInPressed)}
          />

          <CustomButton
            text={languageSignInDict["Forgot password?"]}
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
            link={true}
          />

          <CustomButton
            text={languageSignInDict["back to signUp"]}
            onPress={onSignUpPress}
            type="TERTIARY"
            link={true}
          />
        </View>
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
