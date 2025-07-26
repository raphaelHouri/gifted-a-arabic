import {
  Button,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
const { width } = Dimensions.get("window");

export const pages = [
  {
    backgroundColor: "#eaf5ce",
    image: "welcomeChildren",
    title: "تجربة تعليمية مثالية",
    content:
      "نظام تعليمي مخصص للأطفال مع امكانيات للتدريب عبر الهواتف المحمولة والحواسيب. مما يشمله النظام :",
    listContent: [
      "أسئلة مخصصة للامتحان",
      "حلول تتضمن طريقة حل الأسئلة",
      "تمرّن بحسب المواضيع",
      "التدريب على امتحانات تشمل عدة مواضيع في الوقت نفسه",
      "تحديد أوقات أو إلغاء تحديد الأوقات",
      "طباعة بعض المواد لمحاكاة الواقع",
    ],
    phrase:
      "التحضير هو كل شيء، لم يبدأ نوح ببناء السفينة عندما بدأ المطر – وارن  بافيت",
  },
  {
    backgroundColor: "#cef5ef",
    image: "welcome",
    title: "أهلًا بكم في التحضير للموهوبين (أ)",
    content:
      "التحضير مسبقًا لامتحانات القبول في برنامج الموهوبين يخفف المفاجآت ويساعد الأطفال على:",
    listContent: [
      "الاستعداد النفسي لمستوى الأسئلة",
      "التعرف على أنواع جديدة من الأسئلة التي لم يسبق لهم التعامل معها،",
      "معرفة هيكل الامتحان (أمريكي)",
      "العمل ضمن قيود الوقت والضغط",
      "تحديد المواضيع الضعيفة والعمل على تحسينها",
    ],
    phrase:
      "مفتاح النجاح المهم هو الثقة بالنفس، ومفتاح الثقة بالنفس هو التحضير - ارتور آش",
  },
  {
    backgroundColor: "#ceeaf5",
    image: "news",
    title: `تحديثات حول امتحان السنة  ${new Date().getFullYear()}-${
      new Date().getFullYear() + 1
    }`,

    listContent: [
      " ستُنشر إشعارات وتوجيهات رسمية من وزارة التربية والتعليم عن الاكتشاف وامتحانات القبول في شهر أكتوبر",
      "المواضيع المتوقعة لامتحان المرحلة (أ):",
      "مجال الحساب: عمليات الحساب (جمع، طرح، ضرب، قسمة)، متغيرات، مسائل كلامية،",
      "فهم المقروء: قصص تتضمن أسئلة فهم، تفسير كلمات، استخلاص الاستنتاجات والمزيد.",
    ],
    phrase: "رحلة الألف كيلومتر تبدأ بخطوة واحدة",
  },
];
export default function OnboardingScreens() {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate("SignUp");
  };

  const renderImage = (image) => {
    if (image == "welcomeChildren")
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
          source={require(`../../assets/animation/welcome.json`)}
        />
      );
    if (image == "news")
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
          source={require(`../../assets/animation/news.json`)}
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
                  flexDirection: "row-reverse",
                }
              : {
                  width: width,
                  height: 300,
                  padding: 16,
                  alignItems: "center",
                  flexDirection: "row-reverse",
                }
          }
          source={require(`../../assets/animation/welcomeChildren.json`)}
        />
      );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        skipLabel="דלג"
        nextLabel="הבא"
        onDone={handleDone}
        onSkip={handleDone}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={pages.map((page) => {
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
                        className="mt-2 text-sm text-start color-gray-700"
                        style={{
                          textAlign: Platform.OS == "ios" ? "right" : "left",
                        }}
                      >{`\u2022 ${item.key}`}</Text>
                    )}
                  />
                ) : null}
                {page?.phrase ? (
                  <Text
                    style={{
                      textAlign: Platform.OS == "ios" ? "right" : "left",
                    }}
                    className="mb-10 text-[16px] p-1 italic color-gray-700 bg-slate-50/30 rounded-lg"
                  >{`\u201D ${page?.phrase} \u201D`}</Text>
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
