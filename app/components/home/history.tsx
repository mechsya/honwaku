import { _refreshHistory } from "@/hooks/novel";
import { _user } from "@/hooks/user";
import { get } from "@/utils/fetch";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function History() {
  const user = useAtomValue(_user);
  const [history, setHistory] = useState<any>({});
  const refreshHistory = useAtomValue(_refreshHistory);

  useEffect(() => {
    if (user?.data) {
      get({
        url: "history/first?user=" + user.data?.id,
        header: { Authorization: "Bearer " + user?.token },
        setter: setHistory,
      });
    }
  }, [user, refreshHistory]);

  if (!user) {
    return null;
  }

  return (
    <>
      {history === null ? null : (
        <View className="py-4 px-4">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/read",
                params: {
                  slug: history.chapter.slug,
                  novelSlug: history.chapter.novel?.slug,
                },
              })
            }
            className="border-[0.5px] rounded-lg border-black/10 p-4"
          >
            <Text
              className="font-serif text-lg text-black  leading-6"
              numberOfLines={2}
            >
              {history?.chapter?.title}
            </Text>
            <Text className="font-roboto text-black/70 py-1">
              {history?.chapter?.novel?.title}
            </Text>
            <Text className="text-base text-black/50 font-roboto">
              Dibaca {history?.updated_at}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
