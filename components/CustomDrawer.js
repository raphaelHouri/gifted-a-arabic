// import React from "react";
// import {
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
//   Platform,
//   Linking,
// } from "react-native";
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from "@react-navigation/drawer";
// import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { FIREBASE_AUTH } from "../firebaseConfig";
// import { signOut, deleteUser } from "firebase/auth";
// import { useAuth } from "../useContext/AuthContext";
// import { languageDrawerDict } from "../constant/LanguageDict";
// import { COLORS } from "../constant";
// import { onShare } from "../utils/generalUtil";
// import { useQuiz } from "../useContext/useQuiz";
// import { deleteDocument } from "../api/firestoreApi";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const dictAvatar = {
//   none: require("../assets/images/none.png"),
//   boy: require("../assets/images/boy.png"),
//   girl: require("../assets/images/girl.png"),
// };

// const CustomDrawer = (props) => {
//   const { currentUser } = useAuth();
//   const { testVersion } = useQuiz();

//   const handleSignOut = async () => {
//     try {
//       const auth = FIREBASE_AUTH;
//       await AsyncStorage.removeItem("OnboardingRegister");
//       const result = await signOut(auth);
//       // console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       const auth = FIREBASE_AUTH;
//       const user = auth.currentUser;
//       await deleteDocument(`users/${currentUser.email}`);
//       const result = await deleteUser(user);
//       // console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   handleDeleteUser;
//   return (
//     <View style={{ flex: 1, direction: "rtl" }}>
//       <DrawerContentScrollView
//         {...props}
//         contentContainerStyle={{ backgroundColor: "#8200d6" }}
//       >
//         <ImageBackground
//           source={require("../assets/images/menu-bg.jpeg")}
//           style={{ padding: 20 }}
//         >
//           <Image
//             source={dictAvatar[currentUser?.settings?.avatar || "none"]}
//             style={{
//               height: 80,
//               width: 80,
//               borderRadius: 40,
//               marginBottom: 10,
//             }}
//             className="bg-whiteBackground "
//           />
//           <View className="flex-row justify-start">
//             <Text
//               style={{
//                 color: "#eee",
//                 fontSize: 14,
//                 // fontFamily: 'Roboto-Medium',
//                 marginBottom: 5,
//               }}
//             >
//               {currentUser?.email}
//             </Text>
//           </View>

//           {/* <Text
//             style={{
//               color: "#fff",
//               fontSize: 18,
//               // fontFamily: 'Roboto-Medium',
//               marginBottom: 5,
//             }}
//           >
//             John Doe
//           </Text>
//           <View style={{ flexDirection: "row" }}>
//             <Text
//               style={{
//                 color: "#fff",
//                 // fontFamily: 'Roboto-Regular',
//                 marginEnd: 5,
//               }}
//             >
//               280 Coins
//             </Text>
//             <FontAwesome5 name="coins" size={14} color="#fff" />
//           </View> */}
//         </ImageBackground>
//         <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
//           <DrawerItemList {...props} />
//         </View>
//       </DrawerContentScrollView>
//       <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
//         {testVersion ? null : (
//           <TouchableOpacity onPress={onShare} style={{ paddingVertical: 0 }}>
//             <View className="flex-row items-start">
//               <Ionicons
//                 name="share-social-outline"
//                 size={22}
//                 color={COLORS.primary}
//               />
//               <Text
//                 style={{
//                   fontSize: 15,
//                   // fontFamily: 'Roboto-Medium',
//                   marginStart: 5,
//                 }}
//               >
//                 {languageDrawerDict["Tell a Friend"]}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity
//           onPress={handleSignOut}
//           style={{ paddingVertical: 15 }}
//         >
//           <View
//             className="items-start"
//             style={
//               Platform.OS == "web"
//                 ? { flexDirection: "row-reverse" }
//                 : { flexDirection: "row" }
//             }
//           >
//             {/* <ArrowLeftOnRectangleIcon size={22} color={COLORS.primary} /> */}
//             <AntDesign name="logout" size={20} color={COLORS.primary} />
//             <Text
//               style={{
//                 fontSize: 15,
//                 // fontFamily: 'Roboto-Medium',
//                 marginStart: 5,
//               }}
//             >
//               {languageDrawerDict["Sign Out"]}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         {Platform.OS === "ios" && testVersion && (
//           <TouchableOpacity
//             onPress={handleDeleteUser}
//             style={{ paddingVertical: 15 }}
//           >
//             <View
//               className="items-start"
//               style={
//                 Platform.OS == "web"
//                   ? { flexDirection: "row-reverse" }
//                   : { flexDirection: "row" }
//               }
//             >
//               {/* <ArrowLeftOnRectangleIcon size={22} color={COLORS.primary} /> */}
//               <AntDesign name="logout" size={20} color={COLORS.error} />
//               <Text
//                 style={{
//                   fontSize: 15,
//                   // fontFamily: 'Roboto-Medium',
//                   marginStart: 5,
//                   color: "red",
//                 }}
//               >
//                 {"מחיקת משתמש"}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         <View
//           style={{ padding: 10, borderTopWidth: 1, borderTopColor: "#ccc" }}
//         ></View>
//         <TouchableOpacity
//           onPress={() => {
//             testVersion ? null : Linking.openURL("https://wa.me/972586519423");
//           }}
//         >
//           <View
//             style={{
//               flexDirection: Platform.OS == "web" ? "row-reverse" : "row",
//               alignItems: "center",
//             }}
//           >
//             <FontAwesome5 name="whatsapp" size={22} color={COLORS.success} />

//             <Text
//               style={{
//                 fontSize: 15,
//                 // fontFamily: 'Roboto-Medium',
//                 marginLeft: 5,
//               }}
//             >
//               {languageDrawerDict["Available on Whatsapp"]}
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: Platform.OS == "web" ? "row-reverse" : "row",
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 15,
//                 fontWeight: 600,
//                 // fontFamily: 'Roboto-Medium',
//                 marginStart: 35,
//               }}
//             >
//               0586519423
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CustomDrawer;

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  StatusBar,
} from "react-native";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signOut, deleteUser } from "firebase/auth";
import { useAuth } from "../useContext/AuthContext";
import { languageDrawerDict } from "../constant/LanguageDict";
import { COLORS } from "../constant";
import { onShare } from "../utils/generalUtil";
import { useQuiz } from "../useContext/useQuiz";
import { deleteDocument } from "../api/firestoreApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ScrollView } from "react-native";
const dictAvatar = {
  none: require("../assets/images/none.png"),
  boy: require("../assets/images/boy.png"),
  girl: require("../assets/images/girl.png"),
};

const CustomDrawer = (props) => {
  const { currentUser } = useAuth();
  const { testVersion } = useQuiz();

  const handleSignOut = async () => {
    try {
      const auth = FIREBASE_AUTH;
      await AsyncStorage.removeItem("OnboardingRegister");
      const result = await signOut(auth);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const auth = FIREBASE_AUTH;
      const user = auth.currentUser;
      await deleteDocument(`users/${currentUser.email}`);
      const result = await deleteUser(user);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser;
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: "#8200d6",
        direction: "rtl",
        paddingTop:
          Platform.OS === "android"
            ? StatusBar.currentHeight
            : useSafeAreaInsets().top,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#8200d6",
          flex: 1,
          direction: "rtl",
        }}
        style={{
          flex: 1,
          direction: "rtl",
        }}
      >
        <ImageBackground
          source={require("../assets/images/menu-bg.jpeg")}
          style={{
            padding: 20,
          }}
        >
          <Image
            source={dictAvatar[currentUser?.settings?.avatar || "none"]}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
            className="bg-whiteBackground"
          />
          <View className="flex-row justify-start">
            <Text
              style={{
                color: "#eee",
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              {currentUser?.email}
            </Text>
          </View>
        </ImageBackground>
        <ScrollView
          style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}
        >
          {/* <DrawerItemList {...props} /> BC the DrawerItemList does not support custom styles for IOS for the borderRadius , so we map through the routes and create DrawerItem components manually.  */}
          {props.state.routes.map((route, index) => {
            const isFocused = props.state.index === index;

            const { options } = props.descriptors[route.key];
            const label =
              options.drawerLabel !== undefined
                ? options.drawerLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return (
              <DrawerItem
                key={index}
                label={({ color }) => (
                  <Text
                    style={{
                      color: isFocused ? "#fff" : "#333",
                      fontSize: 15,
                      fontWeight: "500",
                      marginStart: -5,
                      textAlign: Platform.OS === "web" ? "right" : "left",
                    }}
                  >
                    {label}
                  </Text>
                )}
                icon={({ color, size }) =>
                  options.drawerIcon
                    ? options.drawerIcon({
                        color: isFocused ? "#fff" : "#333",
                        size,
                      })
                    : null
                }
                focused={isFocused}
                onPress={() => props.navigation.navigate(route.name)}
                style={{
                  borderRadius: 8,
                  backgroundColor: isFocused ? "#8200d6" : "transparent",
                  marginHorizontal: 8,
                  marginVertical: 4,
                }}
                labelStyle={{
                  color: isFocused ? "#fff" : "#333",
                }}
              />
            );
          })}
        </ScrollView>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: "#ccc",
          }}
        >
          {testVersion ? null : (
            <TouchableOpacity onPress={onShare} style={{ paddingVertical: 15 }}>
              <View className="flex-row items-start">
                <Ionicons
                  name="share-social-outline"
                  size={22}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginStart: 5,
                  }}
                >
                  {languageDrawerDict["Tell a Friend"]}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleSignOut}
            style={{ paddingVertical: 15 }}
          >
            <View
              className="items-start"
              style={
                Platform.OS == "web"
                  ? { flexDirection: "row-reverse" }
                  : { flexDirection: "row" }
              }
            >
              <AntDesign name="logout" size={20} color={COLORS.primary} />
              <Text
                style={{
                  fontSize: 15,
                  marginStart: 5,
                }}
              >
                {languageDrawerDict["Sign Out"]}
              </Text>
            </View>
          </TouchableOpacity>
          {Platform.OS === "ios" && testVersion && (
            <TouchableOpacity
              onPress={handleDeleteUser}
              style={{ paddingVertical: 15 }}
            >
              <View
                className="items-start"
                style={
                  Platform.OS == "web"
                    ? { flexDirection: "row-reverse" }
                    : { flexDirection: "row" }
                }
              >
                <AntDesign name="logout" size={20} color={COLORS.error} />
                <Text
                  style={{
                    fontSize: 15,
                    marginStart: 5,
                    color: "red",
                  }}
                >
                  {"حذف المستخدم"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <View
            style={{ padding: 10, borderTopWidth: 1, borderTopColor: "#ccc" }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              testVersion
                ? null
                : Linking.openURL("https://wa.me/972586519423");
            }}
          >
            <View
              style={{
                flexDirection: Platform.OS == "web" ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="whatsapp" size={22} color={COLORS.success} />
              <Text
                style={{
                  fontSize: 15,
                  marginStart: 5,
                }}
              >
                {languageDrawerDict["Available on Whatsapp"]}
              </Text>
            </View>
            <View
              style={{
                flexDirection: Platform.OS == "web" ? "row-reverse" : "row",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  marginStart: 35,
                }}
              >
                0586519423
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;
