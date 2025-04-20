import { Image, View } from "react-native";
import { cn } from "./cn";

export default function LoginAlert() {
  return (
    <View className={cn("h-60 justify-center items-center")}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("@/assets/images/marah.png")}
      />
    </View>
  );
}
