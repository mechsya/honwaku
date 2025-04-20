import Container from "@/components/container";
import { _user } from "@/hooks/user";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

export default function Page() {
  const user = useAtomValue(_user);

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
                {user?.user.name}
              </Text>
              <Text className="font-roboto text-black/50">
                {user?.user.email}
              </Text>
              <View className="flex-row items-center gap-2">
                <TouchableOpacity
                  style={{ alignSelf: "flex-start" }}
                  className="bg-red-500 px-2 mt-2 py-1 rounded"
                >
                  <Text className="text-white text-sm font-robotoMedium">
                    Free
                  </Text>
                </TouchableOpacity>
              </View>
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
          data={[
            { screen: "Global Chat", path: "/chat-global" },
            { screen: "Upgrade to Premium", path: "/premium" },
            { screen: "Follow us", path: "follow" },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.navigate("/chat-global")}
              className="py-3 px-4 border-b-[0.5px] border-black/10"
            >
              <Text className="font-roboto text-black text-md">
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
