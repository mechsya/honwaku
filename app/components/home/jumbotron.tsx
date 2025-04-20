import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { cn } from "../cn";
import { get } from "@/utils/fetch";

const { width } = Dimensions.get("window");

export default function Jumbotron() {
  const flatListRef = useRef<FlatList<[]>>(null);
  const [jumbotronItem, setJumbotronItem] = useState<[] | any>([]);
  const [indexNow, setIndexNow] = useState(0);

  useEffect(() => {
    get({ url: "event", setter: setJumbotronItem });
  }, []);

  const scrollToIndex = (index: any) => {
    setIndexNow(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <>
      <FlatList
        ref={flatListRef}
        className="w-full"
        data={jumbotronItem.data}
        horizontal
        pagingEnabled
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: { item: any }) => (
          <ItemJumbotron cover={item.banner_url} id={item.id} />
        )}
      />
      <View className="px-4">
        <FlatList
          data={jumbotronItem.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View className="w-2"></View>}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className={cn(
                index == indexNow
                  ? "border-2 border-black"
                  : "border-2 border-transparent"
              )}
              onPress={() => scrollToIndex(index)}
            >
              <Image
                source={{ uri: item.banner_url, width: 80, height: 40 }}
                height={40}
                width={80}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

function ItemJumbotron(props: any) {
  return (
    <Image
      style={{ width }}
      source={{
        uri: props.cover,
      }}
      className="h-52 mb-2 bg-cover bg-gray-200"
    />
  );
}
