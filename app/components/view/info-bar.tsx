import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";
import { _novel } from "@/hooks/novel";
import { _user } from "@/hooks/user";

const InfoBar = (props: {
  ranting: number | undefined;
  view: number | undefined;
  slug: string | undefined;
  handle: any;
  marked: boolean | undefined;
}) => (
  <View className="flex-row border-b-[0.5px] border-black/10">
    <View className="flex-1 flex-row gap-2 py-3 justify-center items-center">
      <Icon name="star" size={16} color={COLOR.WARNING} />
      <Text className="text-black font-roboto">{props.ranting}</Text>
    </View>
    <View className="flex-1 flex-row gap-2 py-3 justify-center items-center border-x-[0.5px] border-black/10">
      <Icon name="remove-red-eye" size={16} color={COLOR.IN_ACTIVE} />
      <Text className="text-black font-roboto">{props.view}</Text>
    </View>
    <TouchableOpacity
      onPress={props.handle}
      className="flex-1 flex-row gap-2 py-3 justify-center items-center"
    >
      <Icon
        name={props.marked ? "bookmark-remove" : "bookmark-add"}
        size={16}
        color={props.marked ? COLOR.DANGER : COLOR.PRIMARY}
      />
    </TouchableOpacity>
  </View>
);

export default InfoBar;
