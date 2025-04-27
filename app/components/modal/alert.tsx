import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";

type Props = {
  header: string;
  message: string;
  onClose: () => void;
};

export default function Alert(props: Props) {
  return (
    <View>
      <View className="flex-row z-50 justify-between">
        <Text className="font-robotoMedium text-black text-lg">
          {props.header}
        </Text>
        <TouchableOpacity className="" onPress={props.onClose}>
          <Icon name={"close"} size={20} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="font-roboto text-black/50 mt-1">{props.message}</Text>
      </View>
    </View>
  );
}
