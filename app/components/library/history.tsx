import { _user } from "@/hooks/user";
import { get } from "@/utils/fetch";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { FlatList } from "react-native";
import Wrapper from "../wrapper";
import { router } from "expo-router";
import LoginAlert from "../login-alert";

export default function History() {
  const user = useAtomValue(_user);
  const [chapters, setChapter] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  if (!user) return <LoginAlert />;

  useEffect(() => {
    if (user) {
      get({
        url: "history?user=" + user?.data.id,
        header: { Authorization: `Bearer ${user?.token}` },
        setter: setChapter,
        loading: setLoading,
      });
    }
  }, []);

  return (
    <Wrapper data={chapters} loading={loading}>
      <FlatList
        className="px-4"
        data={chapters}
        renderItem={({ item }) => <ItemHistory {...item} />}
      />
    </Wrapper>
  );
}

function ItemHistory(props: any) {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/read",
          params: {
            slug: props.chapter.slug,
            novelSlug: props.chapter.novel?.slug,
          },
        })
      }
      className="py-3 border-b-[0.5px] border-black/10"
    >
      <Text className="font-serif text-lg text-black">
        {props.chapter.title}
      </Text>
      <Text className="font-robotoSemibold text-black py-1 text-md">
        {props.chapter.novel.title}
      </Text>
      <Text className="font-roboto text-black/60 text-sm">
        {props.chapter.novel.genre.replace(/,/g, " • ")} &bull;{" "}
        {props.chapter.content.length} Karakter &bull; Dibaca {props.updated_at}
      </Text>
    </TouchableOpacity>
  );
}
