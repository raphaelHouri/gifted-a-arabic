import React, { useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { getUrlStoragePath } from "../firebaseConfig";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  languagePremiumModalDict,
  languagePrintPaperDict,
} from "../constant/LanguageDict";
import ModalBottom from "../modal/ModalBottom";
import { useAuth } from "../useContext/AuthContext";

const SECTIONS = [
  {
    header: languagePrintPaperDict["comprehension"],
    items: [
      {
        icon: "download",
        label: languagePrintPaperDict["article 1-20"],
        filePath: "articles%2Farticle%201-20.pdf",
        filename: `${languagePrintPaperDict["article 1-20"]}.pdf`,
      },
      {
        icon: "download",
        label: languagePrintPaperDict["article 21-40"],
        filePath: "articles%2Farticle%2021-40.pdf",
        filename: `${languagePrintPaperDict["article 21-40"]}.pdf`,
      },
    ],
  },
];

const SECTIONS1 = [
  {
    header: languagePrintPaperDict["testsExample"],
    items: [
      {
        icon: "download",
        label: languagePrintPaperDict["test1free"],
        filePath: "exam%2Ftest1free.pdf",
        filename: `מבחן1.pdf`,
      },
      {
        icon: "download",
        label: languagePrintPaperDict["test2free"],
        filePath: "exam%2Ftest2free.pdf",
        filename: `${languagePrintPaperDict["test2free"]}.pdf`,
      },
    ],
  },
];
const SECTIONS2 = [
  {
    header: languagePrintPaperDict["tests"],
    items: [
      {
        icon: "download",
        label: languagePrintPaperDict["test1"],
        filePath: "exam%2Ftest1.pdf",
        filename: `${languagePrintPaperDict["test1"]}.pdf`,
      },
      {
        icon: "download",
        label: languagePrintPaperDict["test2"],
        filePath: "exam%2Ftest2.pdf",
        filename: `${languagePrintPaperDict["test2"]}.pdf`,
      },
      {
        icon: "download",
        label: languagePrintPaperDict["test3"],
        filePath: "exam%2Ftest3.pdf",
        filename: `${languagePrintPaperDict["test3"]}.pdf`,
      },
    ],
  },
];

export const PrintPaperScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const refRBSheet = useRef();
  const downloadFile = async (fileUrl, name, free) => {
    if (!currentUser?.isPremium && !free) {
      refRBSheet.current.open();
      return;
    }
    try {
      const downloadDest = FileSystem.documentDirectory + name; // Replace 'example.pdf' with the desired file name
      const { uri } = await FileSystem.downloadAsync(
        getUrlStoragePath(fileUrl),
        downloadDest
      );
      save(uri);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const save = (uri) => {
    shareAsync(uri);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#f6f6f6", direction: "rtl", flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View className="flex-row justify-start" style={styles.header}>
          <Text style={styles.title}>
            {languagePrintPaperDict["Print Papers"]}
          </Text>
        </View>
        <View
          style={{ paddingStart: 24, paddingEnd: 24 }}
          className="flex-row justify-start"
        >
          <Text style={styles.subtitle}>
            {
              languagePrintPaperDict[
                "here you can download material and print it"
              ]
            }
          </Text>
        </View>
        {/* {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View
              style={styles.sectionHeader}
              className="flex-row justify-start"
            >
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ label, icon, filePath, filename }, index) => {
                return (
                  <View
                    key={label}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => downloadFile(filePath, filename)}
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
                        <AntDesign name="left" size={22} color="#00CCBB" />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))} */}

        {currentUser?.isPremium
          ? null
          : SECTIONS1.map(({ header, items }) => (
              <View style={styles.section} key={header}>
                <View
                  style={styles.sectionHeader}
                  className="flex-row justify-start"
                >
                  <Text style={styles.sectionHeaderText}>{header}</Text>
                </View>
                <View style={styles.sectionBody}>
                  {items.map(({ label, icon, filePath, filename }, index) => {
                    return (
                      <View
                        key={label}
                        style={[
                          styles.rowWrapper,
                          index === 0 && { borderTopWidth: 0 },
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() => downloadFile(filePath, filename, true)}
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
                            <AntDesign name="left" size={22} color="#00CCBB" />
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
        {SECTIONS2.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View
              style={styles.sectionHeader}
              className="flex-row justify-start"
            >
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ label, icon, filePath, filename }, index) => {
                return (
                  <View
                    key={label}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => downloadFile(filePath, filename, false)}
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
                        <AntDesign name="left" size={22} color="#00CCBB" />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
      <ModalBottom
        refRBSheet={refRBSheet}
        title={languagePremiumModalDict["Access only for premium member"]}
        shortText={languagePremiumModalDict["convince me to buy your thing"]}
        image="premium"
        actionText={languagePremiumModalDict["See details"]}
        action={() => {
          navigation.navigate("SubscriptionStack");
          refRBSheet?.current?.close();
        }}
      />
    </SafeAreaView>
  );
};
export default PrintPaperScreen;

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
    paddingStart: 24,
    paddingEnd: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: Platform.OS == "ios" ? "right" : "left",
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
    height: 50,
  },
  rowWrapper: {
    paddingStart: 24,
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
});
