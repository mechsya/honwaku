import { Text, TouchableOpacity } from "react-native";
import Icon from "../icon";
import { COLOR } from "@/constants/color";

type CheckboxProps = {
  label: string;
  index: number;
  onclick: (genre: string) => void;
  isActive: boolean; // <<< Tambah props ini
};

export default function Checkbox(props: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => props.onclick(props.label)}
      className="flex-row w-full items-center gap-2 py-2 px-4 border-b-[0.5px] border-black/10"
    >
      <Icon
        name={props.isActive ? "check-box" : "check-box-outline-blank"}
        size={16}
        color={props.isActive ? COLOR.PRIMARY : COLOR.IN_ACTIVE}
      />
      <Text className="font-roboto capitalize">{props.label}</Text>
    </TouchableOpacity>
  );
}
