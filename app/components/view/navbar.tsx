import { TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";
import { useRouter } from "expo-router";

export default function Navbar() {
  const router = useRouter();

  return (
    <View className="navbar-container">
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="arrow-back" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="share" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
    </View>
  );
}
