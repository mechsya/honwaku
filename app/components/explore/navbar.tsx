import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";
import { useAtomValue } from "jotai";
import { filterRefAtom } from "@/hooks/explore";

export default function Navbar() {
  const filterRef = useAtomValue(filterRefAtom);

  return (
    <View className="navbar-container border-0">
      <Text className="font-roboto text-xl">Pencarian</Text>
    </View>
  );
}
