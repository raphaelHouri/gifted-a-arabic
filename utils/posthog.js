import PostHog from "posthog-react-native";

export let posthog = undefined;

// export const posthogAsync= PostHog.initAsync(process.env.EXPO_PUBLIC_API_KEY_POSTHOG, {
//   host: 'https://app.posthog.com'
// })
export const posthogAsync = new PostHog(
  process.env.EXPO_PUBLIC_API_KEY_POSTHOG,
  {
    host: "https://app.posthog.com",
  }
);
// posthogAsync.then(client => {
//   posthog = client
// })
