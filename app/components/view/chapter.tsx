import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { View, Text, TouchableOpacity } from "react-native";
import Wrapper from "../wrapper";
import { _novel } from "@/hooks/novel";
import { useMemo } from "react";
import { chapterAtomFamily } from "@/atom/chapter";

type ChapterType = {
  title: string;
  slug: string;
  volume: number;
  chapter: number;
  updated_at: string;
};

type ChapterListProps = {
  novelId: number | string | undefined;
};

export default function Chapter({ novelId }: ChapterListProps) {
  const chapterAtom = useMemo(() => chapterAtomFamily(novelId!), [novelId]);
  const chapters = useAtomValue(chapterAtom);

  return (
    <Wrapper data={chapters} loading={!chapters.length}>
      {chapters.map((item, index) => (
        <ChapterItem chapter={item} key={index} />
      ))}
    </Wrapper>
  );
}

function ChapterItem({ chapter }: { chapter: ChapterType }) {
  const router = useRouter();
  const novel = useAtomValue(_novel);

  const handlePress = () => {
    router.push({
      pathname: "/read",
      params: {
        slug: chapter.slug,
        novelSlug: novel?.slug,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="px-4 py-3 flex-row items-center border-b-[0.5px] border-black/10 "
    >
      <View className="flex-1">
        <Text className="font-roboto text-black" numberOfLines={1}>
          {chapter.title}
        </Text>
        <Text className="font-roboto text-black/50 mt-1 text-sm">
          Volume {chapter.volume} &bull; Chapter {chapter.chapter} &bull;{" "}
          {chapter.updated_at}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
