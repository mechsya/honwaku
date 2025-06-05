import { COLOR } from "@/constants/color";
import "./../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import * as Keychain from "react-native-keychain";
import { post } from "@/utils/fetch";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { refreshAfterLogoutAtom, userAtom } from "@/hooks/user";
import { reloadAtom } from "@/hooks/view";
import { createTable } from "@/utils/database";

SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  const [user, setUser] = useAtom(userAtom);
  const refreshAfterLogout = useAtomValue(refreshAfterLogoutAtom);

  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    PTSerif: require("../assets/fonts/Source-Regular.ttf"),
  });

  const checkLogin = async () => {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials || !credentials.username || !credentials.password) {
      return;
    }

    const email = credentials.username;
    const password = credentials.password;

    const response = await post({
      url: "user/signin",
      body: { email, password },
      setter: setUser,
    });

    if (response.code !== 200) {
      await Keychain.resetGenericPassword();
    }

    if (user) {
      await Keychain.setGenericPassword(user?.data.email, password);
    }
  };

  useEffect(() => {
    createTable();
    checkLogin();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, refreshAfterLogout]);

  if (!loaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          animation: "fade",
          headerShown: false,
          navigationBarColor: COLOR.WHITE,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
