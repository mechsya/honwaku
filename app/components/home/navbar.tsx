import { Image, TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";

export default function Navbar() {
  return (
    <>
      <View className="navbar-container">
        <Image
          style={{ width: 70, height: 70 }}
          source={require("@/assets/images/logo.png")}
        />
        <View className="flex-row gap-6 items-center">
          <TouchableOpacity>
            <Icon name={"search"} size={20} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
