import { Image, Text, TouchableOpacity, View } from "react-native";
import { cn } from "../cn";
import { Novel } from "@/types/novel";
import { useRouter } from "expo-router";

export default function CardNovel({
  title,
  slug,
  sinopsis,
  status,
  genre,
  ranting,
  view,
  created_at,
  cover_url,
}: Novel) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/view",
      params: { slug: slug },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-red-500";
      case "ongoing":
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row bg-white justify-between py-4 gap-4 border-b-[0.5px] border-black/10"
    >
      <View className="flex-1">
        <Text className="font-serif text-lg text-black">{title}</Text>

        <Text
          className="font-roboto py-2 text-black/70 line-clamp-3 leading-6"
          numberOfLines={3}
        >
          {sinopsis}
        </Text>

        <Text className="font-roboto capitalize text-black/50 text-sm">
          <Text className={cn("capitalize", getStatusColor(status))}>
            {status}
          </Text>{" "}
          &bull; {genre.replace(/,/g, " • ")} &bull; {ranting} &bull; 160
          Chapter &bull; {view} kali dibaca &bull; {created_at}
        </Text>
      </View>

      <Image
        className="w-24 h-36 border border-black"
        source={{ uri: cover_url }}
      />
    </TouchableOpacity>
  );
}
