import { View, Text, TouchableOpacity } from "react-native";
import { cn } from "../cn";
import { useAtom } from "jotai";
import { _renderComponent } from "@/hooks/library";

export default function Navbar() {
  const [renderComponent, setRenderComponent] = useAtom(_renderComponent);

  return (
    <>
      <View className="navbar-container border-b-0">
        <Text className="font-roboto text-xl">Perpustakaan</Text>
      </View>
      <View className="flex-row border-b-[0.5px] border-black/10">
        {["riwayat bacaan", "bookmark"].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setRenderComponent(item)}
            className={cn(
              "p-4 flex-1",
              item === renderComponent
                ? "border-b-2  border-primary"
                : "border-0"
            )}
          >
            <Text className="capitalize">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
