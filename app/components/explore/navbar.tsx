import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";
import { useAtomValue } from "jotai";
import { _filterRef } from "@/hooks/explore";

export default function Navbar() {
  const filterRef = useAtomValue(_filterRef);

  return (
    <View className="navbar-container">
      <Text className="font-roboto text-xl">Pencarian</Text>
      <TouchableOpacity onPress={() => filterRef.current?.expand()}>
        <Icon name={"more-vert"} size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
    </View>
  );
}
