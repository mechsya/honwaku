import Container from "@/components/container";
import Icon from "@/components/icon";
import Navbar from "@/components/view/navbar";
import { COLOR } from "@/constants/color";
import { Chapter, Novel } from "@/types/novel";
import { get } from "@/utils/fetch";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { router } from "expo-router";

export default function ViewScreen() {
  const { status, slug, title, cover_url } = useLocalSearchParams();
  const [novel, setNovel] = useState<Novel | undefined>(undefined);
  const [chapters, setChapter] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chapterLoading, setChapterLoading] = useState<boolean>(true);

  useEffect(() => {
    get({
      url: `novel/${slug}`,
      setter: setNovel,
      loading: setLoading,
    }).then((response) => {
      get({
        url: "chapter?novel_id=" + response.data.id,
        setter: setChapter,
        loading: setChapterLoading,
      });
    });
  }, []);

  const Header = () => (
    <View>
      <View className="p-4 flex-row gap-4">
        <Image
          style={{ width: 120, height: 170 }}
          source={{ uri: cover_url as string }}
          className="rounded"
        />
        <View className="flex-1">
          <Text className="text-2xl text-black font-serif">{title}</Text>
          <Text className="text-black/70 mt-1">{novel?.author}</Text>
          <Text className="text-black/70 mb-4">
            <Text className="text-green-500">{status}</Text> &middot;{" "}
            {novel?.view} Kali di lihat
          </Text>
          <TouchableOpacity className="bg-primary/80 p-2 rounded self-start flex-row gap-2">
            <Icon name={"bookmark-add"} size={16} color={COLOR.WHITE} />
            <Text className="text-roboto text-white text-md">Simpan novel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="px-4 font-roboto text-black/70 leading-6">
        {loading ? "Tidak ada deskripsi" : novel?.sinopsis}
      </Text>
      <View className="flex-row gap-4 p-4">
        {novel?.genre
          .split(",")
          .map((genre, index) => <Genre genre={genre} key={index} />)}
      </View>

      <View className="flex-row justify-between p-4">
        <Text className="text-black text-lg">{chapters.length} Chapter</Text>
      </View>
    </View>
  );

  return (
    <Container>
      <Navbar />
      <FlatList
        ListHeaderComponent={Header}
        data={chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ListChapter {...item} novelId={novel?.id} />}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </Container>
  );
}

const Genre = ({ genre }: { genre: string }) => {
  return (
    <Text className="p-2 border border-black/20 text-black/80 rounded">
      {genre}
    </Text>
  );
};

const ListChapter = React.memo((chapter: Chapter) => {
  return (
    <TouchableOpacity
      className="py-3 px-4"
      onPress={() =>
        router.push({
          pathname: "/read",
          params: {
            novelId: chapter.novelId,
            slug: chapter.slug,
            title: chapter.title,
            content: chapter.content,
            volume: chapter.volume,
            chapter: chapter.chapter,
          },
        })
      }
    >
      <Text numberOfLines={1} className="text-black mb-2">
        {chapter.title}
      </Text>
      <Text className="text-black/50 text-sm">
        Volume {chapter.volume} Chapter {chapter.chapter} &middot;{" "}
        {chapter.updated_at}
      </Text>
    </TouchableOpacity>
  );
});
