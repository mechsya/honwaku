import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Novel } from "@/types/novel";
import { useRouter } from "expo-router";
import { cn } from "../cn";
import React, { useCallback } from "react";

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

const CardNovel = function CardNovel({
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

  const handlePress = useCallback(() => {
    router.push({
      pathname: "/view",
      params: {
        slug,
        title,
        status,
      },
    });
  }, [router, slug, title, status]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View className="flex-row bg-white justify-between py-4 gap-4 border-b-[0.5px] border-black/10">
        <View className="flex-1">
          <Text className="font-serif text-lg text-black">{title}</Text>
          <Text
            className="font-roboto py-2 text-black/70 leading-6"
            numberOfLines={3}
          >
            {sinopsis}
          </Text>

          <Text className="font-roboto capitalize text-black/50 text-sm">
            <Text className={cn("capitalize", getStatusColor(status))}>
              {status}
            </Text>{" "}
            &bull; {genre.replace(/,/g, " • ")} &bull; {ranting} &bull; {view}{" "}
            kali dibaca &bull; {created_at}
          </Text>
        </View>

        <Image
          className="w-24 h-36 border border-black"
          source={{ uri: cover_url }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(CardNovel);
