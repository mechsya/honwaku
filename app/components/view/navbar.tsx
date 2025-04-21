import { TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { _novel } from "@/hooks/novel";
import { BASE_URL } from "@/utils/fetch";
import * as Clipboard from "expo-clipboard";

export default function Navbar() {
  const router = useRouter();
  const novel = useAtomValue(_novel);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(BASE_URL + "/novel/" + novel?.slug);
  };

  return (
    <View className="navbar-container">
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="arrow-back" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
      <TouchableOpacity onPress={copyToClipboard}>
        <Icon name="share" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
    </View>
  );
}
