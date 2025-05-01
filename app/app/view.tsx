import { cn } from "@/components/cn";
import Container from "@/components/container";
import Loading from "@/components/loading";
import Chapter from "@/components/view/chapter";
import Comment from "@/components/view/comment";
import Description from "@/components/view/description";
import InfoBar from "@/components/view/info-bar";
import Navbar from "@/components/view/navbar";
import TabBar from "@/components/view/tab-bar";
import Footer from "@/components/footer";
import Alert from "@/components/modal/alert";
import Modal from "@/components/modal";
import { _novel } from "@/hooks/novel";
import { _user } from "@/hooks/user";
import { _renderComponent } from "@/hooks/view";
import { get, post } from "@/utils/fetch";
import { useLocalSearchParams } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState, useCallback, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, ScrollView, Text, View } from "react-native";

function getStatusColor(status?: string) {
  switch (status) {
    case "complete":
      return "bg-red-400";
    case "ongoing":
      return "bg-green-500";
    default:
      return "bg-blue-400";
  }
}

export default function ViewScreen() {
  const { slug } = useLocalSearchParams();
  const [novel, setNovel] = useAtom(_novel);
  const user = useAtomValue(_user);
  const renderComponent = useAtomValue(_renderComponent);

  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    visible: false,
    message: "",
    header: "",
  });

  const fetchNovel = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    await get({
      url: `novel/${slug}?user=${user?.data?.id || ""}`,
      setter: setNovel,
    });
    setLoading(false);
  }, [slug, user?.data?.id, setNovel]);

  useEffect(() => {
    fetchNovel();
  }, [fetchNovel]);

  const handleBookmarkToggle = async () => {
    if (!user) {
      return setModal({
        visible: true,
        message: "Kamu harus login dahulu untuk menambahkan bookmark",
        header: "Ayo login!",
      });
    }

    if (!novel) return;

    const isBookmarked = novel.marked;
    const url = isBookmarked
      ? `bookmark?user=${user.data.id}&novel=${novel.id}`
      : "bookmark";

    const body = isBookmarked ? null : { user: user.data.id, novel: novel.id };

    const result = await post({
      type: isBookmarked ? "DELETE" : "POST",
      url,
      header: { Authorization: `Bearer ${user.token}` },
      body,
    });

    if (result) {
      setNovel((prev: any) => ({ ...prev, marked: !prev.marked }));
    }
  };

  const MemoizedComponent = useMemo(() => {
    if (renderComponent === "chapter") return <Chapter novelId={novel?.id} />;
    if (renderComponent === "komentar") return <Comment />;
    return null;
  }, [renderComponent, novel?.id]);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Loading />
      </View>
    );
  }

  if (!novel) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-400">Novel tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <Modal visible={modal.visible} withKeyboard>
        <Alert
          header={modal.header}
          message={modal.message}
          onClose={() => setModal({ ...modal, visible: false })}
        />
      </Modal>

      <Container>
        <Navbar />
        <ScrollView className="flex-1">
          {/* Status Indicator */}
          <View className={cn("w-full h-2", getStatusColor(novel.status))} />

          {/* Header Info */}
          <View className="p-4 flex-row border-b-[0.5px] gap-2 border-black/10">
            <View className="flex-1">
              <Text className="font-serif text-lg text-black leading-6">
                {novel.title}
              </Text>
              <Text className="text-black/50 font-roboto leading-6">
                Author: {novel.author}
              </Text>
              <Text className="text-black/50 font-roboto leading-6">
                {novel.genre.replace(/,/g, " • ")}
              </Text>
            </View>
            <Image
              source={{ uri: novel.cover_url }}
              style={{ width: 65, height: 90 }}
              className="border border-black"
            />
          </View>

          {/* Info Bar */}
          <InfoBar
            marked={novel.marked}
            handle={handleBookmarkToggle}
            ranting={novel.ranting}
            view={novel.view}
            slug={novel.slug}
          />

          {/* Description & Content */}
          <Description description={novel.sinopsis} />
          <TabBar />
          {MemoizedComponent}
          <Footer />
        </ScrollView>
      </Container>
    </GestureHandlerRootView>
  );
}
