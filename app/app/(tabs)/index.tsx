import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Container from "@/components/container";
import Announcement from "@/components/home/announcement";
import History from "@/components/home/history";
import Jumbotron from "@/components/home/jumbotron";
import Navbar from "@/components/home/navbar";
import Recomendation from "@/components/home/recomendation";
import Update from "@/components/home/update";
import Icon from "@/components/icon";
import { COLOR } from "@/constants/color";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAtomValue } from "jotai";
import { _user } from "@/hooks/user";
import NativeAds from "@/components/ads/native";

export default function HomeScreen() {
  return (
    <Container>
      <Navbar />
      <ScrollView>
        <Jumbotron />
        <PopupLogin />
        <Update />
        <History />
        <Recomendation />
        <Announcement />
        <NativeAds />
        <Footer />
      </ScrollView>
    </Container>
  );
}

function PopupLogin() {
  const user = useAtomValue(_user);

  return (
    <>
      {!user ? (
        <TouchableOpacity
          onPress={() => router.navigate("/auth")}
          className="p-4"
        >
          <View className="mt-3 p-4 px-5 rounded-full border-[0.5px] border-black/10 flex-row items-center justify-between">
            <Text className="rounded font-robotoMedium text-primary">
              Nikmati semua fitur dengan login akun
            </Text>
            <Icon name={"arrow-forward"} size={12} color={COLOR.PRIMARY} />
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
}

function Footer() {
  return (
    <>
      <View className="w-full px-6 py-6">
        <TouchableOpacity
          onPress={() => router.navigate("/explore")}
          className="w-full p-4 border-[0.5px] flex-row justify-between items-center border-black/10 rounded-full"
        >
          <Text className="font-roboto tracking-wide text-black">
            Cari Novel
          </Text>
          <Icon name={"arrow-forward"} size={20} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <View className="w-full h-36 justify-center items-center">
        <Text className="mb-3 font-robotoMedium text-black">
          Ikuti kami di:
        </Text>
        <View className="flex-row gap-2">
          <TouchableOpacity className="bg-black w-10 h-10 justify-center items-center">
            <FontAwesome6 name="instagram" size={20} color={COLOR.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-black w-10 h-10 justify-center items-center">
            <FontAwesome6 name="discord" size={20} color={COLOR.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-black w-10 h-10 justify-center items-center">
            <FontAwesome6 name="facebook-f" size={20} color={COLOR.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
