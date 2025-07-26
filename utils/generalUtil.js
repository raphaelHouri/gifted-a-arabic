import { Platform, Share } from "react-native";

// if  the current version less then  the version this is not a test version
const CURRENT_IOS_VERSION = 0;
const CURRENT_ANDROID_VERSION = 0;

export const isTestVersion = (versions) => {
  if (Platform.OS === "ios") {
    return versions["ios"] <= CURRENT_IOS_VERSION;
  }
  if (Platform.OS === "android") {
    return versions["android"] <= CURRENT_ANDROID_VERSION;
  }
  return false;
};

export const onShare = async () => {
  const message =
    Platform.OS === "ios"
      ? {
          message: "https://supergifted.co.il/",
        }
      : {
          message: "https://supergifted.co.il/",
        };
  try {
    const result = await Share.share(message);

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    }
  } catch (error) {}
};

export function textToHex(text) {
  let hex = "";
  for (let i = 0; i < text.length; i++) {
    hex += text.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return hex;
}

export const timestampToDate = (timestamp) => {
  const seconds = timestamp?.seconds || 1;
  const nanoseconds = timestamp?.seconds || 1;
  // Convert to milliseconds
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;

  // Create a Date object
  return new Date(milliseconds);
};

export const timestampToString = (timestamp) => {
  const date = timestampToDate(timestamp);
  // Format the date into the desired format
  return date.toUTCString();
};

export const dateToIsraelDate = (dateStr) => {
  // Parse the date string
  const date = new Date(dateStr);

  // Convert to Israel time zone (GMT+3)
  date.setHours(date.getHours() + 3);

  // Format the date
  const formattedDate = `${pad(date.getDate())}/${pad(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;

  function pad(number) {
    return number < 10 ? "0" + number : number;
  }
  return formattedDate;
};

export const calculateDiscountedPrice = (originalPrice, discountPercent) => {
  return Math.floor(originalPrice - (originalPrice * discountPercent) / 100);
};
