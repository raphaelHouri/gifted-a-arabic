import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import { EvilIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../useContext/AuthContext";
import ModalBottom from "../modal/ModalBottom";
import { languageSettingsDict } from "../constant/LanguageDict";
import { dateToIsraelDate, isTestVersion } from "../utils/generalUtil";
import { useQuiz } from "../useContext/useQuiz";

// https://withfra.me/components/settings#settings-2
const SECTIONS = {
  header0: languageSettingsDict["Preferences"],
  id0: "Avatar",
  icon0: "avatar",
  label0: languageSettingsDict["Choose Avatar"],
};

const SECTIONS1 = [
  {
    header: languageSettingsDict["Quiz"],
    items: [
      {
        id: "timer",
        icon: "clock",
        label: languageSettingsDict["Use timer"],
        type: "toggle",
      },
      {
        id: "showResult",
        icon: "poll",
        label: languageSettingsDict["Show result during exercise"],
        type: "toggle",
      },
    ],
  },
];
const SECTIONS2 = [
  {
    header: languageSettingsDict["premium"],
    items: [
      {
        id: "status",
        icon: "crown",
        label: languageSettingsDict["status"],
        type: "detail",
      },
      {
        id: "startTime",
        icon: "clock",
        label: languageSettingsDict["start time premium"],
        type: "detail",
      },
      {
        id: "endTime",
        icon: "clock",
        label: languageSettingsDict["end time premium"],
        type: "detail",
      },
    ],
  },
];
export default function SettingsScreen() {
  const { currentUser, updateField } = useAuth();
  const { testVersion } = useQuiz();
  const refRBSheet = useRef();
  const [modalFeedback, setModalFeedback] = useState(null);
  const [form, setForm] = useState({
    timer: true,
    showResult: false,
    avatar: null,
  });
  useLayoutEffect(() => {
    if (currentUser) {
      setForm({ ...currentUser?.settings });
    }
  }, [currentUser]);

  useEffect(() => {
    if (modalFeedback) refRBSheet.current.open();
  }, [modalFeedback]);

  const submitSettings = async () => {
    setModalFeedback(null);
    const result = await updateField(form, "settings");
    if (result) {
      setModalFeedback({
        refRBSheet: refRBSheet,
        title: languageSettingsDict["Modified successfully"],
        image: "check",
        type: "success",
        short: 3000,
      });
    } else {
      setModalFeedback({
        refRBSheet: refRBSheet,
        title: languageSettingsDict["Modified failed"],
        image: "error",
        type: "error",
        short: 3000,
      });
    }
    refRBSheet.current.open();
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#f6f6f6", direction: "rtl", flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View className="flex-row justify-start" style={styles.header}>
          <Text style={styles.title}>{languageSettingsDict["Settings"]}</Text>
        </View>
        <View
          style={{ paddingStart: 24, paddingEnd: 24 }}
          className="flex-row justify-start"
        >
          <Text style={styles.subtitle}>{currentUser?.email}</Text>
        </View>
        <View style={styles.section} key={SECTIONS.header0}>
          <View style={styles.sectionHeader} className="flex-row justify-start">
            <Text style={styles.sectionHeaderText}>{SECTIONS.header0}</Text>
          </View>
          <View style={styles.sectionBody}>
            <View
              key={SECTIONS.id0}
              style={[styles.rowWrapper, { borderTopWidth: 0 }]}
            >
              <View style={styles.row}>
                <FontAwesome
                  name="user-circle-o"
                  size={22}
                  color="#616161"
                  style={{ marginHorizontal: 5 }}
                />
                <Text style={styles.rowLabel}>{SECTIONS.label0}</Text>
              </View>
            </View>
            <View style={styles.avatarMDWrapper}>
              <TouchableOpacity
                style={[styles.avatarMD]}
                onPress={() => {
                  setForm({ ...form, avatar: null });
                }}
              >
                <Image
                  alt=""
                  source={require("./../assets/images/none.png")}
                  style={[
                    styles.avatarMD,
                    !form.avatar && {
                      borderColor: "#616161",
                      borderWidth: 3,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.avatarMD]}
                onPress={() => {
                  setForm({ ...form, avatar: "boy" });
                }}
              >
                <Image
                  alt=""
                  source={require("./../assets/images/boy.png")}
                  style={[
                    styles.avatarMD,
                    form.avatar == "boy" && {
                      borderColor: "#616161",
                      borderWidth: 3,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.avatarMD]}
                onPress={() => {
                  setForm({ ...form, avatar: "girl" });
                }}
              >
                <Image
                  alt=""
                  source={require("./../assets/images/girl.png")}
                  style={[
                    styles.avatarMD,
                    form.avatar == "girl" && {
                      borderColor: "#616161",
                      borderWidth: 3,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {SECTIONS1.map(({ header, items }) => (
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

                      {type === "toggle" && (
                        <Switch
                          style={{ direction: "ltr" }}
                          onValueChange={() => {
                            setForm({ ...form, [id]: !form[id] });
                          }}
                          value={form[id]}
                        />
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
        {!testVersion
          ? SECTIONS2.map(({ header, items }) => (
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
                              {currentUser.isPremium
                                ? "ערכה מלאה"
                                : "ערכה חינמית"}
                            </Text>
                          )}
                          {id === "startTime" && (
                            <Text>
                              {currentUser?.premiumStartTime
                                ? dateToIsraelDate(
                                    currentUser?.premiumStartTime
                                  )
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
            ))
          : null}
      </ScrollView>
      <View>
        <TouchableOpacity
          onPress={submitSettings}
          className={`bg-gray-600 py-3 `}
        >
          <Text className="text-white text-xl text-center">
            {languageSettingsDict["Save"]}
          </Text>
        </TouchableOpacity>
      </View>
      <ModalBottom {...modalFeedback} />
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
    paddingEnd: 24,
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
