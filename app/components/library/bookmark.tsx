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
  const [bookmarks, setBookmark] = useState<{ code: number; data: any[] }>({
    code: 0,
    data: [],
  });
  const user = useAtomValue(_user);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  if (!user) return <LoginAlert />;

  useEffect(() => {
    get({
      url: "bookmark?user=" + user?.user.id,
      header: {
        Authorization: "Bearer " + user?.token,
      },
      loading: setLoading,
      setter: setBookmark,
    });
  }, [refresh]);

  const handleBookmarkRemove = async (novelID: number) => {
    const result = await post({
      type: "DELETE",
      url: "bookmark?user=" + user?.user.id + "&novel=" + novelID,
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
    <Wrapper data={bookmarks.data} loading={loading}>
      <SwipeListView
        className="px-4"
        showsVerticalScrollIndicator={false}
        data={bookmarks.data}
        renderHiddenItem={(item) => renderHiddenItem(item.item.novel.id)}
        rightOpenValue={-75}
        renderItem={(item) => <CardNovel {...item.item.novel} />}
      />
    </Wrapper>
  );
}
