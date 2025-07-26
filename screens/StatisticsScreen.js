import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Platform,
  Dimensions,
} from "react-native";

import {
  languageDrawerDict,
  languageStatisticDict,
} from "../constant/LanguageDict";
import { useQuiz } from "../useContext/useQuiz";
import LoadingScreen from "./LoadingScreen";
import { useAuth } from "../useContext/AuthContext";
import { BarChart } from "react-native-chart-kit";

// https://withfra.me/components/settings#settings-2

const chartStyle = {
  backgroundColor: "#8CABFF",
  backgroundGradientFrom: "#8CABFF",
  backgroundGradientTo: "#4477CE",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  barPercentage: 0.2,
  propsForDots: {
    r: "6",
    strokeWidth: "3",
    stroke: "#4477CE",
  },
};

export const StatisticsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);
  const { categories } = useQuiz();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (categories) {
      const statisticsPerExercise = {};
      categories.forEach((category) => {
        statisticsPerExercise[category.name] = generateStatistic(category.id);
      });
      setIsLoading(false);
      setStatistics(statisticsPerExercise);
    }
  }, [categories, currentUser]);

  const generateStatistic = (exerciseId) => {
    const orderArray = [];
    const gradesArray = [];
    for (const key of Object.keys(currentUser?.solutions).sort()) {
      const summary = currentUser?.solutions[key];
      const tempArray = key.split("-");
      if (tempArray[0] == exerciseId) {
        orderArray.push(tempArray[1]);
        const right = summary.rightSolutions ? summary.rightSolutions : 0;
        gradesArray.push((right / summary.totalQuestion) * 100);
      }
    }
    return { order: orderArray, grades: gradesArray };
  };

  const MyBarChart = (key, summary) => {
    let order = summary.order;
    if (summary.order.length < 5) {
      order = order.map((num) => `${languageStatisticDict["exercise"]} ${num}`);
    }
    return (
      <View style={styles.section} key={key}>
        <View style={styles.sectionHeader} className="flex-row justify-start">
          <Text style={styles.sectionHeaderText}>{key}</Text>
        </View>
        <View style={styles.sectionBody}>
          {summary.order.length ? (
            <BarChart
              data={{
                labels: order,
                datasets: [
                  {
                    data: summary.grades,
                  },
                ],
              }}
              width={Dimensions.get("window").width - 16}
              height={220}
              yAxisLabel={"%"}
              chartConfig={chartStyle}
              style={{
                direction: "ltr",
                marginVertical: 0,
                borderRadius: 16,
              }}
            />
          ) : (
            <Text className="text-lg">
              {languageStatisticDict["the user had not exercise this topic"]}
            </Text>
          )}
        </View>
      </View>
    );
  };
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: "#f6f6f6", direction: "rtl", flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View className="flex-row justify-start" style={styles.header}>
          <Text style={styles.title}>{languageDrawerDict["Statistics"]}</Text>
        </View>
        <View
          style={{ paddingStart: 24, paddingEnd: 24 }}
          className="flex-row justify-start"
        >
          <Text style={styles.subtitle}>
            {languageStatisticDict["explain on statistics"]}
          </Text>
        </View>

        {Object.keys(statistics).map((key) => MyBarChart(key, statistics[key]))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    marginTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    letterSpacing: 1.2,
  },
  sectionBody: {
    marginHorizontal: 5,
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
    textAlign: "left",
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
