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
  "- הפחתת הלחץ: תדאגו שההכנה למבחן תתחיל מוקדם (ההמלצה שלנו להתחיל כ-3 חודשים לפני הבחינה), כך ריכוז המאמץ רגע לפני המבחן יהיה נמוך ורגוע יותר דבר שיפחית את הלחץ ביום הבחינה עצמו.",
  "- לעשות את הטוב ביותר: יש לכם הזדמנות להעביר מסר משמעותי לילדים במהלך התקופה הקרובה והוא שהם לא תמיד יכולים להצליח במה שהם רוצים להשיג אבל הם יכולים לתת את הכי טוב שלהם וזה מה שחשוב! – לפי דעתנו שיעור זה לחיים חשוב באותה מידה (אם לא יותר) לתוכנית המחוננים.",
  "- הילדים שלכם מוכשרים: מבחן המחוננים איננו מודד את כל המרכיבים שמצביעים על מחוננות (בינאישי, מוזיקאלי וכדו') ועצם זה שהילד או הילדה לא התקבלו איננו אומר שהם לא מוכשרים מספיק אלא שהבחינה לא נבנתה באופן שיזהה את מחוננות ילדיכם.",
  "- בשלות נפשית: לא לכל הילדים יש את הבגרות הנפשית לגשת לבחינה במהלך כיתה ב' ולכן ייתכן ששווה לשקול לדחות את הבחינה מכיתה ב' לכיתה ג' (רמת המבחן קצת יותר קשה) כאשר הילדים בשלים. אבל למרות טיפ זה, שימו לב כי ייתכן שהילדים יוכלו לגשת גם בכיתה ב' וגם בכיתה ג' (תלוי במדיניות משרד החינוך לאותה תקופה).",
  "- קבלת ציונים נמוכים: ייתכן כי במהלך התרגולים והמבחנים, הילדים יקבלו ציונים נמוכים כי היו להם שאלות קשות ואז הם גם מוותרים לעצמם. אז עליכם לזכור כי הקבלה לתוכנית המחוננים והמצטיינים היא ביחס לילדים אחרים (בדומה לפסיכומטרי). לכן, אם יש שאלות קשות שלא מצליחים זה לא נורא כי עליהם להצליח ביחס לילד שיושב לידם.",
  "- הכנה מוגזמת: אל תגזימו עם ההכנות לקראת הבחינה מכיוון שקשה מאוד לגרום ל-IQ לעלות בטווח כל כך קצר ולכן העמסת הכנות כנראה תשפיע מעט, התמקדו בהכנה טובה וסבירה שבעיקר תעלה את המסוגלות הרגשית והטכנית של ילדכם ותקטין הפתעות.",
  "- ילד שאיננו רוצה: קשה מאוד להכריח ילד להתכונן לבחינה כאשר הוא לא רוצה וגם לא כל כך אפקטיבי. תוכנית המחוננים והמצטיינים היא אומנם תוכנית מרתקת ומעניינת אך גם מאתגרת ודורשת התמדה ורצון של הילד ולכן עליכם למצוא את הדרך בה הקבלה לתוכנית כן תעניין אותו דרך חברים אחרים שמתכוננים לקראת המבחן (אולי לנסות לימוד משותף) או דרך איתור תחומי עניין של הילד שתוכנית המחוננים מספק העשרה לגביהם.",
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
            שלום הורים יקרים,
          </Text>
          <Text style={styles.content}>
            אנחנו שמחים ללווות אתכם במהלך תהליך ההכנה של הילדים (הפנייה לבנים
            ובנות) לקראת מבחני המיון לתוכנית מחוננים ומצטיינים של משרד החינוך.
            מבחני מיון אלו יקבעו אילו ילדים יוגדרו כ"בעלי פוטנציאל גבוה" שהמדינה
            רוצה להשקיע בהם תוספת תקציב משמעותית על מנת שיגשימו פוטנציאל זה.
          </Text>
          <Text style={styles.content}>
            ניתן לומר שמדובר באחת הצמתים המשמעותיות והמוקדמות ביותר אשר יכולה
            לנווט את מהלך החיים של הילדים לאפיק חיובי ומוצלח בעתיד. קצת מלחיץ,
            אך למרות הלחץ והרצון הרב שלכם שהילדים יצליחו כמה שיותר במהלך החיים
            עליכם לזכור כי – ילדים הם ילדים והם יתנהגו כמו ילדים!
          </Text>
          <Text style={styles.content}>
            לא תמיד הלחצת הילדים להישגיות והצלחה מניבה תוצאות חיוביות. לעיתים
            קרובות, הלחץ מוביל לתוצאות שליליות ולכן עליכם ההורים למצוא את דרך
            המלך בה מצד אחד הילדים מתכוננים למבחן ומשפרים את הסיכויים ומצד שני
            הם לא נלחצים מהמבחן ומשיגים את התוצאות הטובות ביותר. אז הרשו לנו
            לספק לכם כמה טיפים שאולי יעזרו לכם לבנות גישה נכונה לקראת המבחן:
          </Text>
          {list.map((value, index) => (
            <Text key={index} style={styles.listItem}>
              {value}
            </Text>
          ))}
          <Text style={styles.content}>
            השתדלנו לתמצת בטיפים ולקלוע לעניין אך אם אתם מעוניינים בעוד עדכונים,
            טיפים וחדשות בנוגע למבחן מחוננים ומצטיינים אז אתם מוזמנים להצטרף
            לקבוצת ה-WhatsApp שלנו:
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
              <Text style={styles.linkText}>קישור לקבוצה הווצאפ</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.content}>מאחלים בהצלחה,</Text>
          <Text style={styles.content}>צוות בית ספר לחיים</Text>
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
