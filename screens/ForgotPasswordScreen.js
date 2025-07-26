import React, { useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import CustomButton from "../components/customComponents/CustomButton";
import CustomInput from "../components/customComponents/CustomInput";
import { requireEmail, requireText } from "../constant/commonRules";
import { useForm } from "react-hook-form";
import ModalBottom from "../modal/ModalBottom";
import { languageSignInDict } from "../constant/LanguageDict";
const auth = FIREBASE_AUTH;

export default function ForgotPasswordScreen() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm();

  const onResetPassword = async (data) => {
    if (loading) {
      return;
    }
    const { email } = data;
    setLoading(true);
    const auth = FIREBASE_AUTH;
    try {
      const userCredential = await sendPasswordResetEmail(auth, email);
      errorMessage && setErrorMessage("");
      refRBSheet.current.open();

      // navigation.navigate("Home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage(languageSignInDict["Email doesn't exist"]);
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
      <View style={styles.container}>
        <View style={styles.header}>
        <Image
            alt="icon"
            resizeMode="contain"
            style={styles.headerImg}
            source={require("./../assets/icon/512blue.png")}
          />

          <Text style={styles.title}>
            {languageSignInDict["Regenerate new password"]}{" "}
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

          <Text className="text-red-500">{errorMessage}</Text>
          <CustomButton
            text={
              loading
                ? languageSignInDict["Loading check the email..."]
                : languageSignInDict["reset password"]
            }
            onPress={handleSubmit(onResetPassword)}
          />

          <CustomButton
            text={languageSignInDict["Back to signIn"]}
            onPress={onPressBack}
            type="TERTIARY"
            link={true}
          />
          <ModalBottom
            {...{
              refRBSheet: refRBSheet,
              title: languageSignInDict["reset email send successfully"],
              image: "email-send",
              type: "success",
              short: 10000,
            }}
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
