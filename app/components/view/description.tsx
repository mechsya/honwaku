import { Text, View } from "react-native";

const Description = ({ description }: { description: string | undefined }) => (
  <View className="p-4">
    <Text className="leading-6 font-roboto text-black/50">{description}</Text>
  </View>
);

export default Description;
