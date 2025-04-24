import { cn } from "@/components/cn";
import Container from "@/components/container";
import Loading from "@/components/loading";
import Chapter from "@/components/view/chapter";
import Comment from "@/components/view/comment";
import Description from "@/components/view/description";
import InfoBar from "@/components/view/info-bar";
import InputComment from "@/components/view/input-comment";
import Navbar from "@/components/view/navbar";
import TabBar from "@/components/view/tab-bar";
import { _novel } from "@/hooks/novel";
import { _user } from "@/hooks/user";
import { _renderComponent } from "@/hooks/view";
import { get, post } from "@/utils/fetch";
import { useLocalSearchParams } from "expo-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, ScrollView, Text, View } from "react-native";
import { _modal } from "@/hooks/modal";
import Footer from "@/components/footer";

function colorStatus(status?: string) {
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
  const setModal = useSetAtom(_modal);
  const renderComponent = useAtomValue(_renderComponent);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const fetchNovel = useCallback(() => {
    if (!slug) return;
    get({
      url: `novel/${slug}?user=${user?.data.id}`,
      setter: setNovel,
      loading: setLoading,
    });
  }, [slug]);

  useEffect(() => {
    fetchNovel();
  }, [fetchNovel, reload]);

  const toggleBookmark = async () => {
    if (!user) {
      setModal({
        message: "Tolong login dahulu sebelum menambahkan bookmark",
        mode: "sad",
        visible: true,
      });
      return;
    }

    if (!novel) return;

    const url = novel.marked
      ? `bookmark?user=${user?.data.id}&novel=${novel.id}`
      : "bookmark";

    const body = novel.marked ? null : { user: user?.data.id, novel: novel.id };

    const result = await post({
      type: novel.marked ? "DELETE" : "POST",
      url,
      header: { Authorization: `Bearer ${user?.token}` },
      body,
    });
    if (result) setReload((prev) => !prev);
  };

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
      <Container>
        <Navbar />
        <ScrollView className="flex-1">
          <View className={cn("w-full h-2", colorStatus(novel.status))} />
          <View className="p-4 flex-row border-b-[0.5px] gap-2  border-black/10">
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

          <InfoBar
            marked={novel.marked}
            handle={toggleBookmark}
            ranting={novel.ranting}
            view={novel.view}
            slug={novel.slug}
          />

          <Description description={novel.sinopsis} />
          <TabBar />
          {renderComponent === "chapter" && (
            <Chapter chapters={novel.chapter} loading={loading} />
          )}
          {renderComponent === "komentar" && <Comment />}
          <Footer />
        </ScrollView>
      </Container>
    </GestureHandlerRootView>
  );
}
