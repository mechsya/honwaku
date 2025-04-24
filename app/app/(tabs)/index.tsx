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
import Footer from "@/components/footer";

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
