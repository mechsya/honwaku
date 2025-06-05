import { TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { novelAtom } from "@/hooks/novel";
import { BASE_URL } from "@/utils/fetch";
import * as Clipboard from "expo-clipboard";

export default function Navbar() {
  const router = useRouter();
  const novel = useAtomValue(novelAtom);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(BASE_URL + "/novel/" + novel?.slug);
  };

  return (
    <View className="bg-white w-full  z-50 flex-row justify-between">
      <TouchableOpacity className="p-3" onPress={() => router.back()}>
        <Icon name="arrow-back" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
      <TouchableOpacity className="p-3" onPress={copyToClipboard}>
        <Icon name="share" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
    </View>
  );
}
