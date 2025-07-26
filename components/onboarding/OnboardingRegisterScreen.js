import {
  Linking,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useQuiz } from "../../useContext/useQuiz";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../../screens";
import { languageDrawerDict } from "../../constant/LanguageDict";

const colors = ["#cef5ef", "#eaf5ce", "#FFA1F5", "#8DDFCB"];

export const pages = [
  {
    backgroundColor: "#cef5ef",
    image: "successRegister",
    title: "تم التسجيل بالنجاح",
    listContent: [
      "السلام عليكم أولياء الأمور الكرام",
      "يسرّنا مرافقتكم خلال عملية تحضير أطفالكم استعدادًا لامتحانات القبول لبرنامج الموهوبين (والمتفوقين) الخاص بوزارة التربية والتعليم.",
      "ننصح بقراءة صفحة التوجيهات والنصائح في القائمة قبل بدء التحضير لمساعدة طفلكم قدر الإمكان. لقد حاولنا تلخيص النصائح والتركيز على الجوهر، لكن إذا كنتم مهتمين بمزيد من التحديثات والنصائح والأخبار المتعلقة بامتحان الموهوبين والمتفوقين، فأنتم مدعوون للانضمام إلى مجموعتنا على واتساب:",
    ],
    link: "https://chat.whatsapp.com/DysJXGAm6OJIBV1KvwVcDw",
  },
  {
    backgroundColor: "#ceeaf5",
    image: "parents",
    title: "إرشادات لتجربة تعليمية ممتعة وجيدة",
    listContent: [
      "السلام عليكم أولياء الأمور الكرام",
      "يسرّنا مرافقتكم خلال عملية تحضير أطفالكم استعدادًا لامتحانات القبول لبرنامج الموهوبين (والمتفوقين) الخاص بوزارة التربية والتعليم.",
      "ننصح بقراءة صفحة التوجيهات والنصائح في القائمة قبل بدء التحضير لمساعدة طفلكم قدر الإمكان. لقد حاولنا تلخيص النصائح والتركيز على الجوهر، لكن إذا كنتم مهتمين بمزيد من التحديثات والنصائح والأخبار المتعلقة بامتحان الموهوبين والمتفوقين، فأنتم مدعوون للانضمام إلى مجموعتنا على واتساب:",
    ],
    link: "https://chat.whatsapp.com/DysJXGAm6OJIBV1KvwVcDw",
    linkTitle: "رابط للمجموعة  على واتساب",
    navigate: "Instructions",
    navigateTitle: "رابط لصفحة التوصيات لأولياء الأمور",
  },
];
export default function OnboardingRegisterScreen() {
  const [displayOnboarding, setDisplayOnboarding] = useState([]);
  const { testVersion, onboarding } = useQuiz();
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboardingWatchDateStr = await AsyncStorage.getItem(
          "OnboardingRegister"
        );
        // the onboarding did not recived yet
        if (!onboarding) return;
        //  not exist display all

        if (!onboardingWatchDateStr) {
          setDisplayOnboarding([...onboarding]);
          return;
        }

        const filterOnboarding = onboarding.filter((screen) => {
          return (
            screen.currentDate.seconds * 1000 +
              screen.currentDate.nanoseconds / 1000000 >
            parseInt(onboardingWatchDateStr)
          );
        });
        if (filterOnboarding.length) {
          setDisplayOnboarding([...filterOnboarding]);
          return;
        }
        navigation.navigate("Home");
      } catch (e) {
        console.log("hi");
      }
    };

    checkOnboarding();
  }, [onboarding]);

  const handleDone = async () => {
    await AsyncStorage.setItem(
      "OnboardingRegister",
      new Date().getTime().toString()
    );
    navigation.navigate("Home");
  };

  const renderImage = (image) => {
    if (image == "successRegister")
      return (
        <LottieView
          autoPlay
          // style={{ start: 0 }}
          // className="w-auto h-32 p-4 fixed top-6"
          style={
            Platform.OS == "ios"
              ? {
                  width: width,
                  height: 300,
                  padding: 16,
                  start: 6,
                  alignItems: "center",
                }
              : {
                  width: width,
                  height: 300,
                  padding: 16,
                  alignItems: "center",
                }
          }
          source={require(`../../assets/animation/successRegister.json`)}
        />
      );
    else
      return (
        <LottieView
          autoPlay
          // style={{ start: 0 }}
          // className="w-auto h-32 p-4 fixed top-6"
          style={
            Platform.OS == "ios"
              ? {
                  width: width,
                  height: 300,
                  padding: 16,
                  start: 6,
                  alignItems: "center",
                }
              : {
                  width: width,
                  height: 300,
                  padding: 16,
                  alignItems: "center",
                }
          }
          source={require(`../../assets/animation/parents.json`)}
        />
      );
  };

  if (!displayOnboarding || !displayOnboarding.length) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <Onboarding
        skipLabel="דלג"
        nextLabel="הבא"
        onDone={handleDone}
        onSkip={handleDone}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={displayOnboarding.map((page) => {
          return {
            backgroundColor: page?.backgroundColor,
            image: (
              <View className="flex-col align-middle justify-center items-center">
                {page?.image ? renderImage(page.image) : null}
                {page?.title ? (
                  <Text className="text-2xl color-gray-700 underline">
                    {page.title}
                  </Text>
                ) : null}
                {page?.content ? (
                  <Text
                    className="text-lg mt-4 color-gray-700"
                    style={{
                      textAlign: Platform.OS == "ios" ? "right" : "left",
                    }}
                  >
                    {page.content}
                  </Text>
                ) : null}
                {page?.listContent.length ? (
                  <FlatList
                    className="mt-4"
                    data={page?.listContent.map((value) => {
                      return { key: value };
                    })}
                    renderItem={({ item }) => (
                      <Text
                        className="mt-2 text-[16px] text-start color-gray-700"
                        style={{
                          textAlign: Platform.OS == "ios" ? "right" : "left",
                        }}
                      >{` ${item.key}`}</Text>
                    )}
                  />
                ) : null}

                {page?.link && page?.linkTitle && !testVersion ? (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(page?.link);
                    }}
                  >
                    <Text
                      className={`${
                        page?.navigateTitle ? "mb-4" : "mb-10"
                      } text-lg underline p-1 italic color-gray-700 bg-green-400/40 rounded-lg`}
                    >
                      {page?.linkTitle}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {page?.navigate && page?.navigateTitle && !testVersion ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(page?.navigate);
                    }}
                  >
                    <Text className="mb-10 text-lg underline p-1 italic color-gray-700 bg-blue-400/40 rounded-lg">
                      {page?.navigateTitle}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ),
          };
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
