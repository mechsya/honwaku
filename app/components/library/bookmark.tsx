import { SwipeListView } from "react-native-swipe-list-view";
import CardNovel from "../ui/card-novel";
import { TouchableOpacity, View } from "react-native";
import Icon from "../icon";
import { useEffect, useState } from "react";
import { get, post } from "@/utils/fetch";
import { _user } from "@/hooks/user";
import { useAtomValue } from "jotai";
import Wrapper from "../wrapper";
import LoginAlert from "../login-alert";

export default function Bookmark() {
  const [bookmarks, setBookmark] = useState<any>([]);
  const user = useAtomValue(_user);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  if (!user) return <LoginAlert />;

  useEffect(() => {
    if (user.data) {
      get({
        url: "bookmark?user=" + user?.data.id,
        header: {
          Authorization: "Bearer " + user?.token,
        },
        loading: setLoading,
        setter: setBookmark,
      });
    }
  }, [refresh]);

  const handleBookmarkRemove = async (novelID: number) => {
    const result = await post({
      type: "DELETE",
      url: "bookmark?user=" + user?.data.id + "&novel=" + novelID,
      header: {
        Authorization: "Bearer " + user?.token,
      },
    });
    if (result) setRefresh(!refresh);
  };

  const renderHiddenItem = (novelID: number) => (
    <View className="flex-1 justify-end flex-row items-center px-[18px]">
      <TouchableOpacity onPress={() => handleBookmarkRemove(novelID)}>
        <Icon name={"delete"} size={20} color={"#f87171"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Wrapper data={bookmarks} loading={loading}>
      <SwipeListView
        className="px-4"
        showsVerticalScrollIndicator={false}
        data={bookmarks}
        renderHiddenItem={({ item }: { item: any }) =>
          renderHiddenItem(item.novel.id)
        }
        rightOpenValue={-75}
        renderItem={({ item }: { item: any }) => <CardNovel {...item.novel} />}
      />
    </Wrapper>
  );
}
