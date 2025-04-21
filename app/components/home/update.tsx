import { Text, TouchableOpacity, View } from "react-native";
import Seperator from "../seperator";
import { useEffect, useState } from "react";
import { get } from "@/utils/fetch";
import { Chapter } from "@/types/novel";
import { router } from "expo-router";
import Wrapper from "../wrapper";

export default function Update() {
  const [chapters, setChapter] = useState<Chapter[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    get({ url: "chapter/update", setter: setChapter, loading: setLoading });
  }, []);

  return (
    <View className="p-4">
      <Seperator label="Bab Terbaru telah rilis!!" button={false} />
      <Wrapper loading={loading} data={chapters}>
        <View>
          {chapters.map((item, index) => (
            <ItemUpdate {...item} key={index} />
          ))}
        </View>
      </Wrapper>
    </View>
  );
}

function ItemUpdate(props: any) {
  return (
    <TouchableOpacity
      className="py-3 border-b-[0.5px] border-black/10"
      onPress={() =>
        router.push({
          pathname: "/read",
          params: { slug: props.slug, novelSlug: props.novel.slug },
        })
      }
    >
      <Text className="font-serif text-lg text-black">{props.title}</Text>
      <Text className="font-robotoSemibold leading-6 pb-1 text-black/70">
        {props.novel.title}
      </Text>
      <Text className="font-roboto text-black/50 text-sm">
        <Text className="text-red-400">Baru</Text> &bull; Volume {props.volume}{" "}
        &bull; Chapter {props.chapter} &bull; {props.content.length} Karakter
        &bull; Diupload {props.updated_at}
      </Text>
    </TouchableOpacity>
  );
}
