import { COLOR } from "@/constants/color";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Text } from "react-native";
import { TouchableOpacity, View } from "react-native";

export default function Footer() {
  return (
    <>
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
