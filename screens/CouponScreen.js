import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import ModalBottom from "../modal/ModalBottom";
import {
  languageSettingsDict,
  languageSignInDict,
} from "../constant/LanguageDict";
import {
  dateToIsraelDate,
  timestampToDate,
  timestampToString,
} from "../utils/generalUtil";
import LottieView from "lottie-react-native";
import CustomInput from "../components/customComponents/CustomInput";
import { requireText } from "../constant/commonRules";
import { useForm } from "react-hook-form";
import CustomButton from "../components/customComponents/CustomButton";
import { useQuiz } from "../useContext/useQuiz";
import { useNavigation } from "@react-navigation/native";

import { getDocument } from "../api/firestoreApi";
import { FontAwesome5 } from "@expo/vector-icons";

const SECTIONS = [
  {
    header: "تفاصيل القسيمة",
    items: [
      {
        id: "discount",
        icon: "percentage",
        label: "نسبة الخصم",
        type: "detail",
      },
      {
        id: "expired",
        icon: "clock",
        label: "تاريخ انتهاء صلاحية القسيمة",
        type: "detail",
      },
    ],
  },
];

export default function CouponScreen() {
  const { couponDetails, setCouponDetails } = useQuiz();
  const { width } = Dimensions.get("window");
  const refRBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalCoupon, setModalCoupon] = useState(null);
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm();

  useEffect(() => {
    if (modalCoupon) refRBSheet.current.open();
  }, [modalCoupon]);

  const validateCoupon = async (coupon) => {
    try {
      coupon = coupon.toLowerCase().trim();

      const data = await getDocument(`coupons/${coupon}`);

      if (
        data?.active &&
        data?.amount > data?.used &&
        new Date(
          data?.expired?.seconds * 1000 + data?.expired?.nanoseconds / 1000000
        ) > new Date()
      ) {
        // check date and limit
        setCouponDetails({ ...data, couponId: coupon });
        return { success: true, message: "القسيمة فعّالة للاستخدام" };
      }
      setCouponDetails(null);
      return { success: false, message: "القسيمة منتهية الصلاحية" };
    } catch (e) {
      return { success: false, message: "القسيمة منتهية الصلاحية" };
    }
  };
  const onSubmit = async (data) => {
    if (loading) {
      return;
    }
    const { coupon } = data;
    setLoading(true);

    try {
      setModalCoupon(null);
      //check if coupon valid
      const result = await validateCoupon(coupon);
      if (result.success) {
        setModalCoupon({
          refRBSheet: refRBSheet,
          title: languageSettingsDict["Modified successfully"],
          image: "check",
          actionText: "וلاستخدام القسيمة",
          action: () => navigation.navigate("SubscriptionStack"),
          type: "success",
          short: 3000,
        });
      } else {
        setModalCoupon({
          refRBSheet: refRBSheet,
          title: "القسيمة غير فعّالة",
          image: "error",
          type: "error",
          short: 3000,
        });
      }
      refRBSheet.current.open();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage(languageSignInDict["Email doesn't exist"]);
      }
    }
    setLoading(false);
  };

  const renderImage = () => {
    return (
      <View className=" flex items-center ">
        <LottieView
          autoPlay
          // style={{ start: 0 }}
          // className="w-auto h-32 p-4 fixed top-6"
          style={
            Platform.OS == "ios"
              ? {
                  height: 100,
                  width: width,
                  padding: 16,
                  start: 6,
                  alignItems: "center",
                }
              : {
                  height: 100,
                  width: width,
                  padding: 16,
                  alignItems: "center",
                }
          }
          source={require(`../assets/animation/coupon.json`)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#f6f6f6", direction: "rtl", flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* <View className="flex-row justify-start" style={styles.header}>
          <Text style={styles.title}>{languageSettingsDict["Coupon"]}</Text>
        </View> */}

        {/* {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View
              style={styles.sectionHeader}
              className="flex-row justify-start"
            >
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}
                  >
                    <View style={styles.row}>
                      <FontAwesome5
                        color="#616161"
                        name={icon}
                        style={styles.rowIcon}
                        size={22}
                      />

                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />

                      {id === "status" && (
                        <Text>
                          {currentUser.isPremium ? "ערכה מלאה" : "ערכה חינמית"}
                        </Text>
                      )}
                      {id === "startTime" && (
                        <Text>
                          {currentUser?.premiumStartTime
                            ? dateToIsraelDate(currentUser?.premiumStartTime)
                            : ""}
                        </Text>
                      )}
                      {id === "endTime" && (
                        <Text>
                          {currentUser?.premiumEndTime
                            ? dateToIsraelDate(currentUser?.premiumEndTime)
                            : ""}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))} */}
        {/* {SECTIONS1.map(({ header, items }) => ( */}
        {/* <View style={styles.sectionHeader} className="flex-row justify-start">
            <Text style={styles.sectionHeaderText}>קופון</Text>
          </View> */}
        <View>{renderImage()}</View>
        <View style={styles.form}>
          <CustomInput
            name="coupon"
            control={control}
            placeholder={"أدخل القسيمة"}
            rules={requireText("القسيمة", 4)}
            subtitle={"قسيمة الخصم"}
          />

          <Text className="text-red-500">{errorMessage}</Text>
          <CustomButton
            text={loading ? "جاري تحميل القسيمة" : "لفحص القسيمة"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        {/* ))} */}
      </ScrollView>
      {!!couponDetails
        ? SECTIONS.map(({ header, items }) => (
            <View style={styles.section} key={header}>
              <View
                style={styles.sectionHeader}
                className="flex-row justify-start"
              >
                <Text style={styles.sectionHeaderText}>{header}</Text>
              </View>
              <View style={styles.sectionBody}>
                {items.map(({ id, label, icon, type, value }, index) => {
                  return (
                    <View
                      key={id}
                      style={[
                        styles.rowWrapper,
                        index === 0 && { borderTopWidth: 0 },
                      ]}
                    >
                      <View style={styles.row}>
                        <FontAwesome5
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22}
                        />

                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={styles.rowSpacer} />

                        {id === "discount" && (
                          <Text>{couponDetails?.discount}%</Text>
                        )}
                        {id === "expired" && (
                          <Text>
                            {dateToIsraelDate(
                              timestampToString(couponDetails?.expired)
                            )}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ))
        : null}

      {/* <View>
        <TouchableOpacity
          onPress={submitSettings}
          className={`bg-gray-600 py-3 `}
        >
          <Text className="text-white text-xl text-center">
            {languageSettingsDict["Save"]}
          </Text>
        </TouchableOpacity>
      </View> */}
      <ModalBottom {...modalCoupon} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  form: {
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    padding: 10,
  },
  header: {
    direction: "rtl",
    paddingStart: 24,
    paddingEnd: 24,
    marginBottom: 12,
  },
  title: {
    direction: "rtl",
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  profile: {
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12,
  },
  profileActionText: {
    marginEnd: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingEnd: 5,
    paddingStart: 5,
    height: 50,
  },
  rowWrapper: {
    paddingEnd: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowIcon: {
    marginEnd: 12,
    marginStart: Platform.OS == "web" ? 12 : 0,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowValue: {
    fontSize: 17,
    color: "#616161",
    marginEnd: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  avatarMD: {
    width: 70,
    height: 70,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarMDWrapper: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});
