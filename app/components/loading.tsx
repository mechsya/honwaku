import { COLOR } from "@/constants/color";
import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View className="w-full h-60 bg-white justify-center items-center">
      <ActivityIndicator color={COLOR.PRIMARY} size={"large"} />
    </View>
  );
}
