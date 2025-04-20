import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  name: any;
  size: number;
  classname?: string;
  color: string | undefined;
};

export default function Icon(props: Props) {
  return (
    <MaterialIcons
      name={props.name}
      size={props.size}
      color={props.color}
      className={props.classname}
    />
  );
}
