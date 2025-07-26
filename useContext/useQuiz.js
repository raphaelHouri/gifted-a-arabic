import { createContext, useContext, useEffect, useState } from "react";
import { getDocument } from "../api/firestoreApi";
import { useNavigation } from "@react-navigation/native";
import { isTestVersion } from "../utils/generalUtil";

const DICTIONARY_MODE = {
  0: "",
  1: "SUMMARY",
  2: "SHOW_EXPLANATION",
};

const QuizContext = createContext();

const useQuiz = () => {
  return useContext(QuizContext);
};

const shuffleOrderOption = (questions) => {
  return questions.map((question) => {
    question.options.sort(() => Math.random() - 0.5);
    return question;
  });
};
const QuizProvider = ({ children }) => {
  const [exerciseId, setExerciseId] = useState(null);
  const [exercises, setExercises] = useState({});
  const [categories, setCategories] = useState(null);
  const [onboarding, setOnboarding] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [testVersion, setTestVersion] = useState(null);
  const [time, setTime] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    const getExercise = async () => {
      const data = await getDocument(`exercise/${exerciseId}`);
      if (data?.questions) {
        const shuffleData = shuffleOrderOption(data.questions);
        setExercises((prev) => ({ ...prev, [exerciseId]: shuffleData }));
        navigation.navigate("Quiz");
      }
    };
    if (exerciseId && !(exerciseId in exercises)) {
      getExercise();
    } else if (exerciseId in exercises) {
      navigation.navigate("Quiz");
    }
  }, [exerciseId]);

  useEffect(() => {
    getOnboardingRegisterData();
  }, []);

  const getGenericData = async () => {
    const data = await getDocument(`categories/categories`);
    if (data?.categories) setCategories(data.categories);
  };

  const getOnboardingRegisterData = async () => {
    const data = await getDocument(`subscription/subscription`);
    if (data?.plans) {
      setSubscription(data.plans);
      setTestVersion(isTestVersion(data.versions));
      setExamDetails(data.examDetails);
      setOnboarding(data.onboarding);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        exerciseId,
        setExerciseId,
        exercises,
        getGenericData,
        onboarding,
        categories,
        subscription,
        time,
        setTime,
        testVersion,
        examDetails,
        couponDetails,
        setCouponDetails,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizProvider, useQuiz };
