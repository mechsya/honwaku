import * as Keychain from "react-native-keychain";
import Container from "@/components/container";
import { _refreshAfterLogout, _user } from "@/hooks/user";
import { router } from "expo-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { cn } from "@/components/cn";
import * as WebBrowser from "expo-web-browser";

export default function Page() {
  const [user, setUser] = useAtom(_user);
  const setRefresh = useSetAtom(_refreshAfterLogout);

  const options = [
    {
      screen: "Global Chat",
      callback: () => router.navigate("/chat-global"),
    },
    {
      screen: "Follow us",
      callback: async () =>
        await WebBrowser.openBrowserAsync("https://linktr.ee/alinmeysa"),
    },
    {
      screen: "Logout",
      callback: async () => {
        setUser(undefined);
        await Keychain.resetGenericPassword();
      },
    },
  ];

  return (
    <Container>
      <Navbar />
      <View>
        {user ? (
          <View className="flex-row gap-4 px-4 py-4 border-b-[0.5px] border-black/10">
            <Image
              className="rounded-full"
              width={60}
              height={60}
              style={{ width: 60, height: 60 }}
              source={require("@/assets/images/default-profile.png")}
            />
            <View className="w-full">
              <Text className="font-robotoSemibold text-black">
                {user?.data?.name}
              </Text>
              <Text className="font-roboto text-black/50">
                {user?.data?.email}
              </Text>
            </View>
          </View>
        ) : (
          <View className="px-4 pb-2 border-b-[0.5px] border-black/10">
            <TouchableOpacity onPress={() => router.navigate("/auth")}>
              <Text className="bg-primary px-4 py-4 text-center text-white rounded font-robotoMedium mt-2">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={
            !user ? options.filter((item) => item.screen !== "Logout") : options
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={item.callback}
              className="py-3 px-4 border-b-[0.5px] border-black/10"
            >
              <Text
                className={cn(
                  "font-roboto text-black text-md",
                  item.screen === "Logout" ? "text-red-400" : "text-black"
                )}
              >
                {item.screen}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Text className="text-center font-roboto text-black/50 p-4">
          App Version V1.0.0
        </Text>
      </View>
    </Container>
  );
}

function Navbar() {
  return (
    <View className="w-full flex-row h-16 px-4 items-center justify-between border-b-[0.5px] border-black/10">
      <Text className="flex flex-1 text-xl  font-roboto">Profile</Text>
    </View>
  );
}
