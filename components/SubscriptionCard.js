import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSubscription } from "../useContext/SubscriptionContext";
import { useQuiz } from "../useContext/useQuiz";
import { LoadingScreen } from "../screens";
import { languageSubscriptionDict } from "../constant/LanguageDict";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { calculateDiscountedPrice } from "../utils/generalUtil";

const dictSvg = {
  "hand-thumb-up": require("./../assets/images/hand-thumb-up.png"),
  "rocket-chat": require("./../assets/images/rocket-chat.png"),
  'rocket-chat"': require("./../assets/images/rocket-chat.png"),
  trophy: require("./../assets/images/trophy.png"),
};

const SubscriptionCard = ({ route }) => {
  const { selected, setSelected } = useSubscription();
  const { subscription, examDetails, couponDetails, setCouponDetails } =
    useQuiz();
  const navigation = useNavigation();
  const { goBack, allowBack } = route.params;
  // console.log(couponDetails, 3);
  if (
    !couponDetails ||
    (!couponDetails?.active &&
      couponDetails?.amount <= couponDetails?.used &&
      timestampToString(couponDetails.expired) > new Date())
  ) {
    setCouponDetails(null);
  }
  if (!subscription) return <LoadingScreen />;

  const renderNavigationButton = () => {
    if (allowBack) {
      return (
        <View
          className="absolute top-14 p-2 bg-white rounded-full"
          style={{ end: 24 }}
        >
          <TouchableOpacity onPress={goBack}>
            <AntDesign name="arrowleft" size={22} color={"#00ccbb"} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderImage = () => {
    if (Platform.OS === "web") {
      return (
        <Image
          source={require("./../assets/images/trophy.png")}
          resizeMode={"contain"}
          className="w-2/3 h-2/3"
        />
      );
    } else {
      return (
        <LottieView
          autoPlay
          className="w-full h-full"
          style={Platform.OS === "ios" ? { start: 0 } : { start: 0 }}
          source={require("./../assets/animation/win.json")}
        />
      );
    }
  };
  // console.log(1111, subscription);
  return (
    <SafeAreaView className="flex-1" style={{ direction: "rtl" }}>
      <View
        className="justify-center items-center"
        style={Platform.OS === "web" ? { height: 300 } : { height: "33%" }}
      >
        {renderImage()}
        {renderNavigationButton()}
      </View>

      <View className="h-full">
        <View className="bg-white" style={{ direction: "rtl" }}>
          <Text className="text-center text-xl py-4">
            {languageSubscriptionDict["select a subscription"]}
          </Text>
          <View>
            <FlatList
              data={subscription}
              keyExtractor={(item) => item.id}
              renderItem={({
                item: { id, title, price, color, image, days },
                item,
              }) => (
                <TouchableOpacity
                  onPress={() => setSelected(item)}
                  style={{
                    borderTopWidth: 1,
                    borderColor: "#e3e3e3",
                  }}
                  className={`flex-row justify-between  px-10  ${
                    id == selected?.id && "bg-gray-200"
                  }`}
                >
                  <View
                    className="h-12 w-12 justify-center items-center p-4 m-4 rounded-full"
                    style={{ start: -30 }}
                  >
                    {/* <View style={{backgroundColor:color}}  className="h-12 w-12 justify-center items-center p-4 m-4 rounded-full"> */}
                    <Image className="h-10 w-10" source={dictSvg[image]} />
                  </View>
                  <View
                    className=" justify-center items-center"
                    style={{ marginLeft: Platform.OS == "web" ? 40 : -24 }}
                  >
                    <Text className="text-lg font-semibold justify-center items-center">
                      {title}
                    </Text>
                    <Text>
                      {days} {languageSubscriptionDict["days"]}
                    </Text>
                  </View>
                  <View className="justify-center items-center">
                    {!couponDetails ? (
                      <Text className="text-lg">{price}₪</Text>
                    ) : (
                      <View className="flex-row">
                        <Text className="text-sm line-through mx-2">
                          {price}₪
                        </Text>
                        <Text className="text-lg">
                          {calculateDiscountedPrice(
                            price,
                            couponDetails.discount
                          )}
                          ₪
                        </Text>
                      </View>
                    )}
                    {/* <Text className="text-lg">{price}₪</Text> */}
                  </View>
                </TouchableOpacity>
              )}
            />

            <View
              className="items-center mx-4 mb-2"
              style={Platform.OS == "ios" ? { bottom: 10 } : {}}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Purchase")}
                disabled={!selected}
                className={`${
                  selected ? "bg-blue-700" : "bg-gray-300"
                } py-3 w-full p-15 mx-3 items-center rounded-md`}
              >
                <Text className="text-white text-xl text-center">
                  {languageSubscriptionDict["Choose"]} {selected?.title}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {!!examDetails?.examDate ? (
          <Text className="m-2 text-left color-gray-700">
            *הבחינה תתקיים בתאריך: {examDetails.examDate}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionCard;
