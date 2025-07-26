import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#252c4a",
  secondary: "#1E90FF",
  accent: "#3498db",

  success: "#00C851",
  error: "#ff4444",

  black: "#171717",
  white: "#FFFFFF",
  background: "#252C4A",
};

export const SIZES = {
  base: 10,
  width,
  height,
};

export const dictHomeScreenImage = {
  math: require("./../assets/images/math.png"),
  formal_analogies: require("./../assets/images/formal_analogies.png"),
  comprehension: require("./../assets/images/comprehension.png"),
  combined: require("./../assets/images/combined.png"),
};

export const url = {
  pay: "https://payments.supergifted.co.il/pay.php",
  success: "https://payments.supergifted.co.il/success.php",
};
// export const url ={
//   pay:"https://blog.logrocket.com/common-bugs-react-native-scrollview/",
//   success: "https://lp.logrocket.com/blg/signup"
// }

export const animalList = [
  "dog",
  "hippo",
  "horse",
  "cat",
  "dove",
  "dragon",
  "fish",
  "otter",
  "feather",
  "frog",
  "dog",
  "hippo",
  "horse",
  "cat",
  "dove",
  "dragon",
  "fish",
  "otter",
  "feather",
  "frog",
  "dog",
  "hippo",
  "horse",
  "cat",
  "dove",
  "dragon",
  "fish",
  "otter",
  "feather",
  "frog",
];

export const mmlOptions = {
  messageStyle: "none",
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      "AMSmath.js",
      "AMSsymbols.js",
      "noErrors.js",
      "noUndefined.js",
    ],
  },
};
