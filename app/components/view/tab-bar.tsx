import { _renderComponent } from "@/hooks/view";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "../cn";
import { useAtom } from "jotai";

const TabBar = () => {
  const [renderComponent, setRenderComponent] = useAtom(_renderComponent);

  return (
    <View className="border-b-[0.5px] flex-row border-black/10">
      {["chapter", "komentar"].map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setRenderComponent(item)}
          className={cn(
            "p-4 flex-1",
            item == renderComponent
              ? "border-b-2 border-primary"
              : "border-b-2 border-transparent"
          )}
        >
          <Text className="text-center font-roboto capitalize">{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;
