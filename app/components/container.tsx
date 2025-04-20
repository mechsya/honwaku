import { COLOR } from "@/constants/color";
import { ReactNode } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function Container(props: Props) {
  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle={"dark-content"} backgroundColor={COLOR.WHITE} />
      {props.children}
    </SafeAreaView>
  );
}
