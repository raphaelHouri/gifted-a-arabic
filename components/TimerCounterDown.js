import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import StopwatchTimer from "react-native-animated-stopwatch-timer";
import { IconButton, Provider as PaperProvider } from "react-native-paper";

global.__reanimatedWorkletInit = () => {};

export default function TimerCounterDown({
  stopwatchRef,
  time,
  finishFunction,
}) {
  // () => stopwatchRef.current?.play()
  // () => stopwatchRef.current?.pause()
  // () => stopwatchRef.current?.reset()

  React.useEffect(() => {
    stopwatchRef.current?.play();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StopwatchTimer
          ref={stopwatchRef}
          containerStyle={styles.stopWatchContainer}
          digitStyle={Platform.select({
            ios: {
              width: 32,
            },
            android: undefined,
          })}
          separatorStyle={Platform.select({
            ios: {
              width: 14,
            },
            android: undefined,
          })}
          textCharStyle={styles.stopWatchChar}
          trailingZeros={0}
          initialTimeInMs={time}
          onFinish={finishFunction}
          mode={"timer"}
          // Uncomment the below line to use it in timer mode
          // initialTimeInMs={30 * 1000}
        />
      </View>
      {/* <View style={styles.buttonsContainer}>
          <IconButton
            icon="play"
            mode="contained"
            size={32}
            onPress={() => stopwatchRef.current?.play()}
          />
          <IconButton
            icon="pause"
            mode="contained"
            size={32}
            onPress={() => stopwatchRef.current?.pause()}
          />
          <IconButton
            icon="refresh"
            mode="contained"
            size={32}
            onPress={() => stopwatchRef.current?.reset()}
          />
        </View> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  stopWatchContainer: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "#fff",
    flexDirection: "row-reverse",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 240,
    paddingTop: 48,
  },
  stopWatchChar: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#00ccbb",
  },
});
