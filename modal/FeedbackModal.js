import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { addFeedback } from "../api/firestoreApi";
import { languageFeedbackModalDict } from "../constant/LanguageDict";

const options = [
  { name: languageFeedbackModalDict["Terrible"], icon: "😩" },
  { name: languageFeedbackModalDict["Bad"], icon: "🙁" },
  { name: languageFeedbackModalDict["OK"], icon: "😐" },
  { name: languageFeedbackModalDict["Good"], icon: "🙂" },
  { name: languageFeedbackModalDict["Great"], icon: "😃" },
];

const OPTION_SIZE = 56;

export default function FeedbackModal({refRBSheet, feedbackTitle, identifier, screen, email }) {
  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [value, setValue] = React.useState(2);
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  

  const sheet = refRBSheet;

  React.useEffect(() => {
  }, []);
  const submit = () => {
    if (title && description && value){
        // add feedback to firebase 
        setError("")
        setSuccess(languageFeedbackModalDict["The feedback has been send successfully thanks"])
        const document = {
            screen:screen,
            identifier: identifier,
            email:email,
            rate: value,
            title: title,
            description: description,
            date: new Date(),

        } 
        if(addFeedback("feedback", document)){
        setTimeout(() => {
            sheet?.current?.close();
            }, 2000);
        }else{
            setError(languageFeedbackModalDict["failed to send the feedback"])
        }
        
    }else{
        setError(languageFeedbackModalDict["please fill the all fields before submission"])
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, direction: "rtl" }}>
      <View style={styles.placeholder}>
        <View style={styles.placeholderInset}>
          {/* Replace with your content */}
        </View>
      </View>

      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={550}
        openDuration={250}
        ref={sheet}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetHeaderTitle}>
            {feedbackTitle? feedbackTitle:languageFeedbackModalDict["We are happy to get feedback"]}
          </Text>
        </View>
        <View style={styles.sheetBody}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{options[value].name}</Text>
          </View>
          <View style={styles.options}>
            {options.map((item, index) => {
              const isActive = value === index;
              return (
                <TouchableOpacity
                  key={item.name}
                  style={[
                    styles.option,
                    isActive && { borderColor: "#efc15d" },
                  ]}
                  onPress={() => {
                    setValue(index);
                  }}
                >
                  <Text style={styles.optionText}>{item.icon}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={[{ borderColor: error ? "red" : "#e8e8e8" , marginBottom:8}]}>
            <TextInput
              onChangeText={onChangeTitle}
              value={title}
              placeholder={languageFeedbackModalDict["fill the title"]}
              placeholderTextColor="#6b7280"
              style={styles.input}
            />
          </View>
          <View style={[{ borderColor: error ? "red" : "#e8e8e8" ,marginBottom:8}]}>
            <TextInput
              onChangeText={onChangeDescription}
              value={description}
              multiline={true}
              placeholder={languageFeedbackModalDict["fill the description"]}
              placeholderTextColor="#6b7280"
              style={styles.inputDescription}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error}
            </Text>
          )}

          <TouchableOpacity style={styles.btn} onPress={submit}>
            <Text style={styles.btnText}>{languageFeedbackModalDict["Confirm"]}</Text>
          </TouchableOpacity>
          {success && (
            <Text style={{ color: "green", alignSelf: "stretch" }}>
              {success}
            </Text>
          )}
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sheetHeader: {
    padding: 24,
  },
  sheetHeaderTitle: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#1f2633",
  },
  sheetBody: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  badge: {
    alignSelf: "center",
    backgroundColor: "#fbefd5",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef8838",
    textTransform: "uppercase",
  },
  options: {
    flexDirection: Platform.OS =='web'? 'row-reverse' :  'row',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  option: {
    width: OPTION_SIZE,
    height: OPTION_SIZE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbefd5",
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: "transparent",
    marginHorizontal: 4,
  },
  optionText: {
    fontSize: 32,
    fontWeight: "500",
    color: "#000",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: "#efc15d",
    marginBottom: 12,
    backgroundColor: "#efc15d",
  },
  btnText: {
    fontSize: 17,
    fontWeight: "600",
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  sheet: {
    borderTopStartRadius: 14,
    borderTopEndRadius: 14,
    backgroundColor:"#e8ecf4"
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  input: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    direction:"rtl",
    textAlign: 'right',
    
  },
  inputDescription: {
    height: 120,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    direction:"rtl",
    textAlign: 'right',
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    marginTop: 4,
  },
});
