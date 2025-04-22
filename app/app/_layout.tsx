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
import { _refreshAfterLogout, _user } from "@/hooks/user";
import CustomModal from "@/components/modal";
import { _reload } from "@/hooks/view";
import { initDatabase } from "@/utils/databse";

SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  const [user, setUser] = useAtom(_user);
  const refreshAfterLogout = useAtomValue(_refreshAfterLogout);

  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    PTSerif: require("../assets/fonts/PTSerif-Regular.ttf"),
  });

  useEffect(() => {
    initDatabase();

    const checkLogin = async () => {
      const credentials = await Keychain.getGenericPassword();

      if (!credentials || !credentials.username || !credentials.password) {
        return;
      }

      const email = credentials.username;
      const password = credentials.password;

      post({
        url: "user/signin",
        body: { email, password },
        setter: setUser,
      });

      if (user) {
        await Keychain.setGenericPassword(user?.data.email, password);
      }
    };

    checkLogin();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, refreshAfterLogout]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <CustomModal />
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
