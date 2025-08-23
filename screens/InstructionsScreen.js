import { React } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { languageDrawerDict } from "../constant/LanguageDict";
import { useQuiz } from "../useContext/useQuiz";

export const list = [
  "- تخفيف الضغط: تأكدوا من أن التحضير للامتحان يبدأ مبكرًا (توصيتنا هي البدء قبل موعد الامتحان بحوالي 3 أشهر)، وبالتالي سيكون تركيز الجهد قبل الامتحان أقل وأكثر هدوءًا، مما يقلل التوتر في يوم الامتحان نفسه.",
  "- افعلوا أفضل ما يمكنكم: لديكم فرصة لنقل رسالة مهمة للأطفال خلال الفترة القادمة، وهي أنهم لا يستطيعون دائمًا النجاح في كل ما يرغبون فيه، ولكن بإمكانهم بذل أقصى جهدهم – وهذا ما يهم! – برأينا، هذا الدرس في الحياة لا يقل أهمية (إن لم يكن أكثر) عن برنامج الموهوبين.",
  "- أطفالكم موهوبون: لا يقيس اختبار الموهوبين جميع الجوانب التي تدلّ على الموهبة (مثل الذكاء العاطفي أو الموسيقي وما الى ذلك)، وبالتالي لا يعني عدم قبول الطفل أو الطفلة أنهم ليسوا موهوبين بما فيه الكفاية، بل أن الامتحان لم يُبنَ بطريقة تكشف الموهبة التي لديهم.",
  "- النضج النفسي: لا يمتلك جميع الأطفال النضج النفسي للتقدم للامتحان في الصف الثاني، لذا قد يكون من المتحسن التفكير في تأجيل التقدم إلى الامتحان في الصف الثالث (رغم أن مستوى الامتحان حينها سيكون أصعب قليلاً)، عندما يكون الطفل أكثر نضجًا. ومع ذلك، انتبهوا أن الأطفال قد يتمكنون من التقدم للامتحان في الصف الثاني وأيضًا في الصف الثالث (حسب سياسة وزارة التربية والتعليم في تلك الفترة).",
  "- الحصول على علامات منخفضة: قد يحصل الأطفال خلال التمارين والاختبارات على علامات منخفضة بسبب وجود أسئلة صعبة، وهذا قد يجعلهم يتنازلون عن المحاولة. تذكّروا أن القبول في برنامج الموهوبين والمتفوقين يتم بالمقارنة مع أطفال آخرين (كما هو الحال في امتحان البسيخومتري)، لذلك، لا يعني عدم النجاح في سؤال صعب فشلًا، بل المهم هو الأداء بالنجاح مقارنةً بالآخرين.",
  "- لإفراط في التحضير: لا تُبالغوا في التحضيرات للامتحان، لأنه من الصعب جدًا رفع حاصل الذكاء خلال فترة قصيرة. لذلك، التحميل الزائد بالتمارين قد لا يغيّر كثيرًا، ركّزوا على التحضير الجيد والمعقول الذي يعزز قدرة الطفل النفسية والتقنية ويقلل من المفاجآت.",
  "- طفل لا يريد: من الصعب جدًا إجبار طفل على التحضير للامتحان إذا لم يرغب في ذلك، كما أنه ليس فعّالًا. برنامج الموهوبين والمتفوقين هو برنامج مثير ومفيد، لكنه أيضًا يتطلب التزامًا واستعدادًا من قبل الطفل. لذلك، حاولوا إيجاد طريقة لربط البرنامج باهتمامات الطفل – مثلاً من خلال أصدقاء يتحضّرون للامتحان (وربما تجربة تعلّم مشترك) أو من خلال إيجاد مواضيع يهتم بها الطفل ويقدم البرنامج إثراءً فيها.",
];

export default function InstructionsScreen() {
  const { testVersion } = useQuiz();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{languageDrawerDict["Instructions"]}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={{
              ...styles.subtitle,
              textAlign: Platform.OS == "ios" ? "right" : "left",
            }}
          >
            مرحبًا بكم أولاء الأمور الكرامكم أولياء الأمور الكرام,
          </Text>
          <Text style={styles.content}>
            يسرّنا مرافقتكم خلال عملية تحضير أطفالكم استعدادًا لامتحانات القبول
            لبرنامج الموهوبين (والمتفوقين) الخاص بوزارة التربية والتعليم.
          </Text>
          <Text style={styles.content}>
            ستحدّد اختبارات التصنيف هذه أيّ من الأطفال يُعرَّفون على أنهم "ذوو
            قدرات عالية"، وهم من ترغب الدولة في الاستثمار فيهم من خلال ميزانية
            إضافية كبيرة، لكي يحققوا هذا الإمكان الكامن فيهم. يمكن القول إننا
            نتحدث عن واحدة من أولى وأهمّ نقاط التحوّل التي قد تُوجّه مجرى حياة
            الأطفال نحو مسار إيجابي وناجح في المستقبل. قد يبدو الأمر مثيرًا
            للضغط، لكن رغم التوتر والرغبة القوية لديكم في أن ينجح أطفالكم بأقصى
            ما يمكنهم في الحياة – يجب أن تتذكروا: الأطفال هم أطفال، وسيتصرفون
            كأطفال!
          </Text>
          <Text style={styles.content}>
            ان الضغط على الأطفال لتحقيق الإنجازات والنجاح لا يؤدي دائما إلى
            نتائج إيجابية. في كثير من الأحيان يؤدي الضغط إلى نتائج سلبية، ولذلك
            عليكم أن تجدوا التوازن حيث يتحضر الأطفال للامتحان ويحسّنوا فرصهم من
            جهة، ولا يشعروا بضغط يمنعهم من الوصول لأفضل أداء ممكن من الجهة
            الأخرى. لذا دعونا نقدّم لكم بعض النصائح التي قد تساعدكم في بناء
            توجّه سليم قبل الامتحان:
          </Text>
          {list.map((value, index) => (
            <Text key={index} style={styles.listItem}>
              {value}
            </Text>
          ))}
          <Text style={styles.content}>
            لقد حاولنا تلخيص النصائح والتركيز على الجوهر، لكن إذا كنتم مهتمين
            بمزيد من التحديثات والنصائح والأخبار المتعلقة بامتحان الموهوبين
            والمتفوقين، فأنتم مدعوون للانضمام إلى مجموعتنا على واتساب:
          </Text>
          {!testVersion ? (
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => {
                Linking.openURL(
                  "https://chat.whatsapp.com/DysJXGAm6OJIBV1KvwVcDw"
                );
              }}
            >
              <Text style={styles.linkText}>رابط للمجموعة على واتساب</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.content}>نتمنى لكم النجاح</Text>
          <Text style={styles.content}>فريق سمارتي</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    direction: Platform.OS === "ios" ? "ltr" : "rtl",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1a202c",
    textAlign: "center",
  },
  contentContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 16,
  },
  content: {
    fontSize: 17,
    lineHeight: 26,
    color: "#4a5568",
    marginBottom: 16,
    textAlign: Platform.OS === "ios" ? "right" : "left",
  },
  listItem: {
    fontSize: 17,
    lineHeight: 26,
    color: "#4a5568",
    marginBottom: 10,
    paddingRight: 12,
    textAlign: Platform.OS === "ios" ? "right" : "left",
  },
  linkButton: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#3182ce",
    borderRadius: 10,
    alignItems: "center",
  },
  linkText: {
    fontSize: 17,
    color: "#ffffff",
    fontWeight: "600",
  },
});
