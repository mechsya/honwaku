import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "./cn";

interface IProps {
  label: string;
  TextclassName?: string;
  button?: boolean | false;
  onPress?: () => void;
}

export default function Seperator(props: IProps) {
  return (
    <View
      className={cn(
        "flex-row justify-between py-2 border-b-[0.5px] border-black/10"
      )}
    >
      <Text
        className={cn("font-roboto text-lg text-black", props.TextclassName)}
      >
        {props.label}
      </Text>
      {props.button ? (
        <TouchableOpacity onPress={props.onPress}>
          <Text className="font-roboto text-primary">Lihat Semua</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
