import Container from "@/components/container";
import Icon from "@/components/icon";
import Navbar from "@/components/view/navbar";
import { COLOR } from "@/constants/color";
import { Chapter, Novel } from "@/types/novel";
import { get, post } from "@/utils/fetch";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { router } from "expo-router";
import Banner from "@/components/ads/banner";
import { useAtom } from "jotai";
import { userAtom } from "@/hooks/user";
import Modal from "@/components/modal";
import Alert from "@/components/modal/alert";
import { cn } from "@/components/cn";

export default function ViewScreen() {
  const { status, slug, title } = useLocalSearchParams();
  const [novel, setNovel] = useState<Novel | undefined>(undefined);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loadingNovel, setLoadingNovel] = useState(true);
  const [loadingChapter, setLoadingChapter] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [pageChapter, setPageChapter] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useAtom(userAtom);
  const [markedNovel, setMarkedNovel] = useState(false);
  const [sort, setSort] = useState(true);
  const [modal, setModal] = useState({
    visible: false,
    message: "",
    header: "",
  });

  useEffect(() => {
    fetchNovel();
  }, []);

  useEffect(() => {
    if (novel?.id) {
      setChapters([]);
      setPageChapter(1);
      setHasMore(true);
      fetchChapter(novel.id, 1);
    }
  }, [sort]);

  const fetchNovel = async () => {
    setLoadingNovel(true);
    const response = await get({
      url: `novel/${slug}?user=${user?.data.id}`,
    });
    if (response?.data) {
      setNovel(response.data);
      setMarkedNovel(response.data.marked);
      fetchChapter(response.data.id, 1); // Mulai dari page 1
    }
    setLoadingNovel(false);
  };

  const fetchChapter = async (novelId: number | string, page: number) => {
    if (loadingChapter || !hasMore) return;
    setLoadingChapter(true);
    try {
      const chapterResponse = await get({
        url: `chapter?novel_id=${novelId}&page=${page}&sort=${sort ? "DESC" : "ASC"}`,
      });

      const data = chapterResponse?.data;
      if (Array.isArray(data?.data)) {
        setChapters((prev) => [...prev, ...data.data]);

        if (data.current_page >= data.last_page) {
          setHasMore(false);
        } else {
          setPageChapter(data.current_page + 1);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching chapter:", error);
      setHasMore(false);
    } finally {
      setLoadingChapter(false);
    }
  };

  const handleEndReached = () => {
    if (novel?.id && hasMore && !loadingChapter) {
      fetchChapter(novel.id, pageChapter);
    }
  };

  const handleBookmarkNovel = async (marked: boolean) => {
    if (!novel?.id) return;

    if (!user) {
      setModal({
        visible: true,
        message:
          "Kamu harus login terlebih dahulu sebelum menambahkan novel ke dalam bookmark",
        header: "Upss gagal menyimpan novel",
      });
      return;
    }

    setLoadingBookmark(true);

    try {
      const response = await post({
        url: markedNovel
          ? `bookmark?user=${user.data.id}&novel=${novel.id}`
          : "bookmark",
        type: markedNovel ? "DELETE" : "POST",
        header: {
          Authorization: "Bearer " + user?.token,
        },
        body: {
          user: user?.data.id,
          novel: novel?.id,
        },
      });

      if (response.code === 200) {
        markedNovel ? setMarkedNovel(false) : setMarkedNovel(true);
      }
    } catch (error) {
      console.log(error);
      setLoadingBookmark(false);
    } finally {
      setLoadingBookmark(false);
    }
  };

  const Header = () => (
    <View>
      <View className="p-4 flex-row gap-4">
        <View className="flex-1 border-b-small border-black/10 pb-4">
          <Text className="text-2xl text-black font-serif">{title}</Text>
          <Text className="text-black/70 mt-1 mb-3">
            {novel?.author} &middot;{" "}
            <Text className="text-green-500">{status}</Text> &middot;{" "}
            {novel?.view} Kali di lihat
          </Text>
          <TouchableOpacity
            onPress={() => handleBookmarkNovel(markedNovel)}
            className={cn(
              "p-2 rounded self-start flex-row gap-2",
              markedNovel ? "bg-red-400" : "bg-primary/80"
            )}
          >
            {loadingBookmark ? (
              <ActivityIndicator size={"small"} color={COLOR.WHITE} />
            ) : (
              <Icon
                name={markedNovel ? "bookmark-remove" : "bookmark-add"}
                size={20}
                color={COLOR.WHITE}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text className="px-4 font-roboto text-black/70 leading-6">
        {loadingNovel ? "Memuat deskripsi..." : novel?.sinopsis}
      </Text>
      <View className="flex-row gap-4 p-4 flex-wrap">
        {novel?.genre
          ?.split(",")
          .map((genre, index) => <Genre genre={genre} key={index} />)}
      </View>

      <View className="flex-row justify-between p-4">
        <Text className="text-black text-lg">Daftar Chapter</Text>
        <TouchableOpacity
          className={cn("duration-300", sort ? "rotate-180" : "")}
          onPress={() => setSort(!sort)}
        >
          <Icon name={"sort"} size={20} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const Footer = () => (
    <View className="items-center my-4">
      {loadingChapter ? (
        <ActivityIndicator size="small" color={COLOR.PRIMARY} />
      ) : hasMore ? (
        <Text className="text-black/70 font-roboto">
          Scroll untuk memuat chapter berikutnya
        </Text>
      ) : (
        <Text className="text-black/70 font-roboto">Chapter terakhir</Text>
      )}
    </View>
  );

  return (
    <Container>
      <Modal visible={modal.visible}>
        <Alert
          onClose={() => setModal({ ...modal, visible: false })}
          message={modal.message}
          header={modal.header}
        />
      </Modal>
      <Navbar />
      <FlatList
        ListHeaderComponent={Header}
        data={chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ListChapter {...item} novelId={novel?.id} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={Footer}
      />
      <Banner id="ca-app-pub-9927932498877675/7008126393" />
    </Container>
  );
}

const Genre = ({ genre }: { genre: string }) => {
  return (
    <Text className="p-2 border-small border-black/20 text-black/80 rounded">
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
        {chapter.chapter} &middot; {chapter.updated_at}
      </Text>
    </TouchableOpacity>
  );
});
