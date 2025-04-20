import { Image, View } from "react-native";

export default function Loading() {
  return (
    <View className="w-full h-60 bg-white justify-center items-center">
      <Image
        style={{ width: 50, height: 50 }}
        className="animate-spin"
        source={require("@/assets/images/loading.png")}
      />
    </View>
  );
}
