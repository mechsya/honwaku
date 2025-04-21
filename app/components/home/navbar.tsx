import { Image, TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";
import { Link } from "expo-router";

export default function Navbar() {
  return (
    <>
      {/* <Link href={"/profile"}>Login Debug</Link> */}
      <View className="navbar-container">
        <Image
          style={{ width: 40, height: 40 }}
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
