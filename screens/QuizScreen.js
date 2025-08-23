import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import { COLORS } from "./../constant";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useQuiz } from "../useContext/useQuiz";
import { useAuth } from "../useContext/AuthContext";
import { getUrlStoragePath } from "../firebaseConfig";
import LottieView from "lottie-react-native";
import { displayQuestionMath, isMathQuestion } from "../utils/UtilQuiz";
import LoadingScreen from "./LoadingScreen";
import FeedbackModal from "../modal/FeedbackModal";
import ModalBottom from "../modal/ModalBottom";
import TimerCounterDown from "../components/TimerCounterDown";
import {
  languageExerciseModalDict,
  languageFeedbackModalDict,
  languageLeaveExerciseModelDict,
  languageScoreModalDict,
} from "../constant/LanguageDict";

const CORRECT_OPTION = 0;
const Quiz = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [quizSolutions, setQuizSolutions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  // const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [summaryMode, setSummaryMode] = useState(false);
  const [expandArticle, setExpandArticle] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [showResult, setShowResult] = useState(false);
  const refRBSheet = useRef();
  const refRBSheetLeaveModel = useRef();
  const stopwatchRef = useRef();
  const navigation = useNavigation();
  const { exerciseId, setExerciseId, exercises, time } = useQuiz();
  const { currentUser, setNewScore } = useAuth();
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    return () => setExerciseId(null);
  }, []);
  useEffect(() => {
    if (allQuestions.length) {
      setCurrentQuestion(allQuestions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, allQuestions]);

  // until react navigation will fix android handler gesture

  useEffect(() => {
    // if the user finish some exercise at the first time
    if (showScoreModal && !currentUser.solutions?.exerciseId && !summaryMode) {
      firstFinishExercise();
    }
  }, [showScoreModal]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useLayoutEffect(() => {
    initExercise();
    initPracticeAgain();
  }, [exerciseId]);

  const initExercise = () => {
    if (exerciseId in exercises) {
      setAllQuestions(exercises[exerciseId]);
      setQuizSolutions(
        exercises[exerciseId].reduce(
          (acc, cur) => ({ ...acc, [cur.id]: null }),
          {}
        )
      );
    }
    setShowResult(currentUser.settings.showResult);
  };

  const firstFinishExercise = () => {
    const summarySolutionDB = {
      rightSolutions: score,
      totalQuestion: allQuestions.length,
      answerHistory: { ...quizSolutions },
    };
    setNewScore(summarySolutionDB, exerciseId);
  };

  // if the user already answer this exercise before
  const initPracticeAgain = () => {
    if (
      exerciseId in currentUser.solutions &&
      currentUser.solutions[exerciseId].answerHistory
    ) {
      const quizSolutions = currentUser.solutions[exerciseId].answerHistory;
      setQuizSolutions(quizSolutions);
      setScore(currentUser.solutions[exerciseId].rightSolutions);
      setCurrentOptionSelected(quizSolutions[Object.keys(quizSolutions)[0]]);
      seeResultQuiz();
    }
  };

  const leaveExercise = (navigation) => {
    setExerciseId(null);
    navigation.goBack(null);
  };

  const validateAnswer = (selectedOption) => {
    setQuizSolutions((prevState) => ({
      ...prevState,
      [currentQuestion.id]: selectedOption,
    }));
    setCurrentOptionSelected(selectedOption);
    // setCorrectOption(CORRECT_OPTION);
    // setIsOptionsDisabled(true);
    if (selectedOption == CORRECT_OPTION) {
      const newScore = Object.entries(quizSolutions).reduce(
        (sum, [key, value]) => {
          debugger;
          if (value == 0 && key !== currentQuestion.id) return sum + 1;
          return sum;
        },
        0
      );
      // Set Score
      setScore(newScore + 1);
    }
  };

  const handleMove = (direction) => {
    const targetQuestion = allQuestions[currentQuestionIndex + direction];
    if (
      targetQuestion.id in quizSolutions &&
      quizSolutions[targetQuestion.id] != null
    ) {
      setCurrentOptionSelected(quizSolutions[targetQuestion.id]);
      // setCorrectOption(CORRECT_OPTION);
    } else {
      setCurrentOptionSelected(null);
      // setCorrectOption(null)
    }
    summaryMode ? setIsOptionsDisabled(true) : setIsOptionsDisabled(false);
    // if (targetQuestion.id in quizSolutions && quizSolutions[targetQuestion.id]!=null) {
    //   setCurrentOptionSelected(quizSolutions[targetQuestion.id]);
    //   setCorrectOption(CORRECT_OPTION);
    //   setIsOptionsDisabled(true);
    // } else {
    //   setCurrentOptionSelected(null);
    //   setCorrectOption(null);
    //   summaryMode ? setIsOptionsDisabled(true) : setIsOptionsDisabled(false);
    // }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setCurrentQuestionIndex(currentQuestionIndex + direction);
  };

  const seeResultQuiz = () => {
    setSummaryMode(true);
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    if (allQuestions.length)
      setCurrentOptionSelected(quizSolutions[Object.keys(quizSolutions)[0]]);
    // setCorrectOption(CORRECT_OPTION);
    setIsOptionsDisabled(true);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    // stopwatchRef.current?.reset();
    // stopwatchRef.current?.play();
    setTimerKey((prev) => prev + 1);
    setSummaryMode(false);
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setIsOptionsDisabled(false);
    setQuizSolutions({});

    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderDisplayTitle = () => {
    if (currentUser.settings.timer && !summaryMode) {
      return (
        <TimerCounterDown
          key={timerKey}
          stopwatchRef={stopwatchRef}
          time={time * 1000}
          finishFunction={() => setShowScoreModal(true)}
        />
      );
    } else if (summaryMode) {
      return (
        <View className="flex-1 flex-row items-center justify-center ">
          <Image
            className="w-10 h-10"
            source={require("./../assets/images/results.png")}
          />
          <Text className="text-2xl">
            {" "}
            {languageExerciseModalDict["Practice Summary"]}
          </Text>
        </View>
      );
    }
  };

  const renderArticleDisplay = () => {
    const arraySplit = currentQuestion?.article.split("<br>");
    const title = arraySplit[0];
    const article = arraySplit.slice(1, arraySplit.length);
    return (
      <View
        className="flex-1 p-2 mb-4 bg-[#cee0f5]"
        style={{ height: expandArticle ? "auto" : 400, direction: "rtl" }}
      >
        <TouchableOpacity
          style={{
            alignItems: Platform.OS == "web" ? "flex-end" : "flex-end",
          }}
          onPress={() => setExpandArticle((prev) => !prev)}
        >
          {expandArticle ? (
            <AntDesign name="up" size={24} color="black" />
          ) : (
            <AntDesign name="down" size={24} color="black" />
          )}
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled>
          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Text
              className="text-xl font-bold"
              style={{ textAlign: Platform.OS == "web" ? "right" : "left" }}
            >
              {title}
            </Text>
            <Text
              className="text-xl"
              style={{
                lineHeight: 30,
                textAlign: Platform.OS == "web" ? "right" : "left",
              }}
            >
              {article.join("")}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderQuestion = () => {
    return (
      <View className="mb-2">
        {/* Question Counter */}
        <View style={{ flexDirection: "row-reverse" }}>
          <Text
            className="text-black text-xl opacity-60 mr-0.5"
            style={{ direction: Platform.OS === "android" ? "ltr" : "rtl" }}
          >
            {`${currentQuestionIndex + 1} / ${allQuestions.length}`}
          </Text>
        </View>
        {currentQuestion?.questionImage && (
          <View className="flex flex-wrap">
            <Image
              className="object-cover w-full sm:w-auto h-32 sm:h-64"
              resizeMode="contain"
              alt="Question image"
              source={{
                uri: getUrlStoragePath(currentQuestion?.questionImage),
              }}
            />
          </View>
        )}
        {currentQuestion?.article && renderArticleDisplay()}
        {/* Question */}
        <View>
          {isMathQuestion(currentQuestion?.question) ? (
            displayQuestionMath(currentQuestion?.question, "question")
          ) : (
            <Text
              className="text-black text-xl"
              style={
                Platform.OS == "web"
                  ? { textAlign: "right" }
                  : { textAlign: "left" }
              }
            >
              {currentQuestion?.question}
            </Text>
          )}
        </View>
      </View>
    );
  };
  const renderOptions = () => {
    /* Show Check Or Cross Icon based on correct answer*/
    const displayCorrectIcon = (option) => {
      if (
        option.order == CORRECT_OPTION &&
        currentOptionSelected == CORRECT_OPTION
      ) {
        return (
          <View
            className="w-7 h-7 justify-center items-center"
            style={
              option.type == "image"
                ? {
                    borderRadius: 28 / 2,
                    margin: 4,
                    backgroundColor: COLORS.success,
                  }
                : {
                    borderRadius: 28 / 2,
                    backgroundColor: COLORS.success,
                  }
            }
          >
            <AntDesign name="check" color={"#fff"} />
          </View>
        );
      } else if (option.order == currentOptionSelected) {
        return (
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 30 / 2,
              backgroundColor: COLORS.error,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="close" color={"#fff"} />
          </View>
        );
      }
      return null;
    };

    const optionStyle = (order) => {
      const styleObj = {};
      styleObj.borderColor = COLORS.secondary + "40";
      styleObj.backgroundColor = "#fff";
      if (!summaryMode && !showResult) {
        if (order == currentOptionSelected) {
          styleObj.borderColor = COLORS.secondary;
          styleObj.backgroundColor = "#d2e9ff";
        }
        return styleObj;
      } else if (showResult) {
        if (currentOptionSelected != null && order == CORRECT_OPTION) {
          styleObj.borderColor = COLORS.success;
          // if the user did not answer the question and this the correct answer
        } else if (
          currentOptionSelected != null &&
          order == currentOptionSelected
        ) {
          styleObj.borderColor = COLORS.error;
        } else if (
          summaryMode &&
          currentOptionSelected == null &&
          order == CORRECT_OPTION
        ) {
          styleObj.borderColor = COLORS.secondary;
        }
      } else {
        if (currentOptionSelected == null && order == CORRECT_OPTION) {
          styleObj.borderColor = COLORS.secondary;
          styleObj.backgroundColor = "#d2e9ff";
        } else if (order == CORRECT_OPTION) {
          styleObj.borderColor = COLORS.success;
          // if the user did not answer the question and this the correct answer
        } else if (order == currentOptionSelected) {
          styleObj.borderColor = COLORS.error;
        }
      }
      // if the user did not answer the question and this the correct answer

      return styleObj;
    };
    const isImageType =
      currentQuestion?.options.length &&
      currentQuestion.options[0].type == "image";
    let outerCardsStyle = "";
    let cardStyle = `border-2 h-auto rounded-3xl flex-row${
      Platform.OS == "web" ? "-reverse" : ""
    } items-center justify-between px-5 mx-2.5 mt-5`;
    if (isImageType) {
      outerCardsStyle = "flex flex-wrap flex-row w-full justify-center";
      cardStyle =
        "w-5/12 sm:w-5/12  md:w-1/5 xl:w-1/6  overflow-hidden m-1 border-2 rounded-3xl shadow-lg cursor-pointer";
    }
    return (
      <View className={outerCardsStyle}>
        {currentQuestion?.options.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option.order)}
            disabled={isOptionsDisabled}
            key={option.order}
            style={optionStyle(option.order)}
            className={cardStyle}
          >
            {isImageType ? (
              <Image
                className="object-cover w-full h-36 sm:h-40 md:h-48  lg:h-56 mb-2 rounded-3xl"
                alt="option to choose"
                source={{ uri: getUrlStoragePath(option.option) }}
              />
            ) : (
              <Text
                className="text-lg my-2 text-black"
                style={{ textAlign: Platform.OS == "web" ? "right" : "left" }}
              >
                {option.option}
              </Text>
            )}
            {summaryMode && displayCorrectIcon(option)}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const turnFeedbackModal = () => {
    refRBSheet.current.open();
  };

  const leaveExerciseAction = () => {
    if (!summaryMode) {
      refRBSheetLeaveModel.current.open();
    } else {
      leaveExercise(navigation);
    }
  };
  const renderFeedbackButton = () => {
    return (
      <>
        <View
          className="absolute  p-2 rounded-full z-50 bg-white"
          style={
            Platform.OS == "web" ? { end: 24, top: 20 } : { start: 24, top: 20 }
          }
        >
          <TouchableOpacity onPress={turnFeedbackModal}>
            <FontAwesome name="pencil-square-o" size={20} color={"#00ccbb"} />
          </TouchableOpacity>
        </View>
        <View
          className="absolute top-4 p-2 rounded-full z-50 bg-white"
          style={
            Platform.OS == "web" ? { start: 24, top: 20 } : { end: 24, top: 20 }
          }
        >
          <TouchableOpacity onPress={leaveExerciseAction}>
            <AntDesign name="left" size={20} color={"#00ccbb"} />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const progressAnim = progress.interpolate({
    inputRange: [
      0,
      allQuestions.length ? allQuestions.length - 1 : allQuestions.length,
    ],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={
          currentUser?.settings?.timer && !summaryMode
            ? {
                width: "100%",
                height: 20,
                borderRadius: 20,
                backgroundColor: "#00000020",
                marginBottom: 8,
                marginTop: 10,
              }
            : {
                width: "100%",
                height: 20,
                borderRadius: 20,
                backgroundColor: "#00000020",
                marginBottom: 8,
                marginTop: 40,
              }
        }
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.accent,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  const moveButton = (direction) => {
    const condition = Platform.OS == "web" ? direction < 0 : direction > 0;
    const directionStyle = condition
      ? {
          position: "absolute",
          end: 12,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: "#075eec",
          backgroundColor: "#fff",
        }
      : {
          position: "absolute",
          start: 1,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: "#075eec",
          backgroundColor: "#fff",
        };

    const content =
      direction > 0
        ? languageExerciseModalDict["next question"]
        : languageExerciseModalDict["previous question"];
    return (
      <TouchableOpacity
        style={directionStyle}
        onPress={() => handleMove(direction)}
      >
        <View className="text-black items-center justify-center">
          <Text className="text-[#075eec] px-2 text-base mb-1">{content}</Text>
          {direction > 0 ? (
            <AntDesign name="arrowleft" size={22} color={"#075eec"} />
          ) : (
            <AntDesign name="arrowright" size={22} color={"#075eec"} />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const finishQuizButton = () => (
    <TouchableOpacity
      style={styles.btnFinishCenter}
      className="text-black items-center justify-center"
      onPress={() => setShowScoreModal(true)}
    >
      <View className="text-black items-center justify-center">
        <Text className="text-white px-2 text-base mb-1">
          {" "}
          {summaryMode
            ? languageExerciseModalDict["back summary"]
            : languageExerciseModalDict["finish exercise"]}
        </Text>
        <AntDesign name="filetext1" size={22} color="#fff" />
      </View>
    </TouchableOpacity>
  );

  const renderNavigateButton = () => {
    return (
      <View>
        <View className="w-full relative my-8  justify-between">
          {/* previous Question */}
          {currentQuestionIndex < allQuestions.length - 1 && moveButton(1)}
          {currentQuestionIndex > 0 && moveButton(-1)}
          {(currentQuestionIndex === allQuestions.length - 1 || summaryMode) &&
            finishQuizButton()}
        </View>
        <View className="w-full  mb-8 " />
      </View>
    );
  };

  const renderExplanation = () => {
    const displayExplanationText = () => {
      let explanationArray = currentQuestion?.explanation.split(/!!(.*?)!!/);
      return (
        <View className="flex-row flex-wrap ">
          {explanationArray.map((text, index) => {
            if (index % 2 == 0) {
              return (
                <Text key={index} className="text-black text-lg text-left">
                  {text}{" "}
                </Text>
              );
            } else {
              return (
                <Text className="text-black text-lg font-semibold text-left">
                  {text}
                </Text>
              );
            }
          })}
        </View>
      );
    };

    return (
      <View
        className="bg-white/30"
        style={{
          opacity:
            summaryMode ||
            (showResult &&
              currentOptionSelected != null &&
              !currentUser?.settings?.timer)
              ? 100
              : 0,
        }}
      >
        {/* Question Counter */}
        <View className="flex-row items-start" style={{ direction: "rtl" }}>
          <Text className="text-black text-lg font-semibold mr-0.5">شرح:</Text>
        </View>
        {/* Question */}
        {currentQuestion?.explanationImage && (
          <View className="flex flex-wrap mb-2">
            <Image
              className="object-cover w-full h-24 md:h-32 lg:h-46"
              resizeMode="contain"
              alt="Question image"
              source={{
                uri: getUrlStoragePath(currentQuestion?.explanationImage),
              }}
            />
          </View>
        )}
        <View style={{ direction: "rtl" }}>
          {currentQuestion?.explanation &&
            (isMathQuestion(currentQuestion?.explanation)
              ? displayQuestionMath(
                  currentQuestion?.explanation,
                  "text-black text-lg"
                )
              : displayExplanationText())}
        </View>
      </View>
    );
  };

  const renderImage = (isHigh) => {
    if (Platform.OS === "web") {
      if (isHigh) {
        return (
          <Image
            source={require("./../assets/images/trophy.png")}
            className="w-32 h-32  z-10 "
          />
        );
      }
      return (
        <Image
          source={require("./../assets/images/wellDone.png")}
          className="w-32 h-32  z-10 "
        />
      );
    } else {
      if (isHigh) {
        return (
          <LottieView
            autoPlay
            className="w-full h-40 p-4 items-center justify-center"
            source={require("./../assets/animation/trophy.json")}
          />
        );
      }

      return (
        <LottieView
          autoPlay
          className="w-full h-32 p-4 items-center justify-center"
          source={require("../assets/animation/thumbs-up.json")}
        />
      );
    }
  };

  const renderScoreModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={showScoreModal}>
        <View className="flex-1 items-center justify-center bg-whiteBackground">
          <View
            className="bg-white w-11/12 rounded-3xl p-5 items-center justify-center"
            style={{ backgroundColor: COLORS.white }}
          >
            {renderImage(score > allQuestions.length / 2)}
            <Text className="text-3xl font-bold text-center">
              {score > allQuestions.length / 2
                ? languageScoreModalDict["Congratulations!"]
                : languageScoreModalDict["Well done for your work!"]}
            </Text>
            <View
              className="justify-start items-center my-5"
              style={
                Platform.OS == "web"
                  ? { flexDirection: "row" }
                  : { flexDirection: "row-reverse" }
              }
            >
              <Text
                className="text-3xl"
                style={{
                  color:
                    score > allQuestions.length / 2
                      ? COLORS.success
                      : COLORS.error,
                }}
              >
                {score}
              </Text>
              {Platform.OS == "android" ? (
                <Text className="text-xl text-black">
                  {` ${allQuestions.length} /`}
                </Text>
              ) : (
                <Text className="text-xl text-black">
                  / {allQuestions.length}
                </Text>
              )}
            </View>
            {/* Retry Quiz button */}
            <TouchableOpacity
              onPress={seeResultQuiz}
              className="justify-center p-5 w-full rounded-3xl mb-3 bg-[#0066ff]"
              style={
                Platform.OS == "web"
                  ? { flexDirection: "row-reverse" }
                  : { flexDirection: "row" }
              }
            >
              <AntDesign name="eyeo" size={20} color="white" />
              <Text className="text-center text-xl font-semibold text-white">
                {"  "}
                {languageScoreModalDict["See result"]}
              </Text>
            </TouchableOpacity>

            {/* Retry Quiz button */}
            <TouchableOpacity
              onPress={restartQuiz}
              className="justify-center  p-5 w-full rounded-3xl mb-3 bg-[#0066ff]"
              style={
                Platform.OS == "web"
                  ? { flexDirection: "row-reverse" }
                  : { flexDirection: "row" }
              }
            >
              <Entypo name="cycle" size={20} color="white" />
              <Text className="text-center text-xl font-semibold text-white">
                {"  "}
                {languageScoreModalDict["Restart quiz"]}
              </Text>
            </TouchableOpacity>

            {/* Retry Quiz button */}
            <TouchableOpacity
              onPress={() => leaveExercise(navigation)}
              className="justify-center p-5 w-full rounded-3xl mb-3 bg-[#0066ff]"
              style={
                Platform.OS == "web"
                  ? { flexDirection: "row-reverse" }
                  : { flexDirection: "row" }
              }
            >
              <AntDesign name="back" size={20} color="white" />
              <Text className="text-center text-xl font-semibold text-white">
                {"  "}
                {languageScoreModalDict["Back to exercise"]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderFeedbackModel = () => (
    <FeedbackModal
      refRBSheet={refRBSheet}
      feedbackTitle={languageFeedbackModalDict["give us feedback"]}
      identifier={currentQuestion}
      screen={"Quiz"}
      email={currentUser?.email}
    />
  );

  const renderLeaveExerciseModel = () => (
    <ModalBottom
      refRBSheet={refRBSheetLeaveModel}
      type="warning"
      title={languageLeaveExerciseModelDict["Leave page"]}
      shortText={
        languageLeaveExerciseModelDict[
          "your exercise will not save if  you will decide to leave"
        ]
      }
      image="warning"
      actionText={languageLeaveExerciseModelDict["I agree leave"]}
      action={() => {
        leaveExercise(navigation);
        refRBSheetLeaveModel?.current?.close();
      }}
      cancelAction={() => refRBSheetLeaveModel?.current?.close()}
    />
  );

  if (allQuestions.length) {
    return (
      <SafeAreaView
        className="bg-whiteBackground"
        style={{
          flex: 1,
          direction: "rtl",
        }}
      >
        <ScrollView>
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.primary}
          />
          <View
            className="bg-[#cee0f5] rounded-b-2xl"
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
              position: "relative",
            }}
          >
            {/* ProgressBar */}
            {renderDisplayTitle()}
            {renderFeedbackButton()}
            {/* ProgressBar */}
            {renderProgressBar()}

            {/* Question */}
            {renderQuestion()}
          </View>
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 16,
              position: "relative",
            }}
          >
            {/* Options */}
            {renderOptions()}

            {renderNavigateButton()}

            {renderExplanation()}

            {/* Score Modal */}
            {renderScoreModal()}
          </View>
        </ScrollView>
        {renderFeedbackModel()}
        {renderLeaveExerciseModel()}
      </SafeAreaView>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default Quiz;

const styles = StyleSheet.create({
  btnMD: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
  },
  btnMDText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#374151",
  },
  btnFinishCenter: {
    position: "absolute",
    alignSelf: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#979595",
    backgroundColor: "#0066ff",
  },
});
