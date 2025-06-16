import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Container from "@/components/container";
import { router, useLocalSearchParams } from "expo-router";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { marked } from "marked";
import { Chapter } from "@/types/novel";
import { get } from "@/utils/fetch";
import Icon from "@/components/icon";
import { COLOR } from "@/constants/color";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Banner from "@/components/ads/banner";
import { useAtom } from "jotai";
import { fontFamilyAtom, fontSizeAtom } from "@/hooks/read";
import { cn } from "@/components/cn";

export default function ReadScreen() {
  const { slug } = useLocalSearchParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [nextSlug, setNextSlug] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const { width } = Dimensions.get("window");
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);

  const fetchChapter = useCallback(
    async (chapterSlug: string | null) => {
      if (!chapterSlug || loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await get({ url: `chapter/${chapterSlug}` });

        if (!response?.data) {
          setHasMore(false);
          return;
        }

        setChapters((prev) => [...prev, response.data]);

        if (response.data.next?.slug) {
          setNextSlug(response.data.next.slug);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log("Error fetching chapter:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (slug) {
      setChapters([]);
      setHasMore(true);
      setNextSlug(slug as string);
      fetchChapter(slug as string);
    }
  }, [slug]);

  const handleEndReached = () => {
    if (!loading && hasMore) {
      fetchChapter(nextSlug);
    }
  };

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const MemorizedHtml = ({ content }: { content: string }) => {
    const html = marked(content || "").toString();
    return (
      <View className="border-b-small border-black/10">
        <RenderHtml
          baseStyle={{ padding: 16, fontFamily, fontSize, color: COLOR.BLACK }}
          contentWidth={width}
          source={{ html }}
          systemFonts={["PTSerif", "Roboto"]}
        />
      </View>
    );
  };

  const Navigation = () => (
    <View className="bg-white w-full border-b-small z-50 border-black/10 flex-row justify-between">
      <TouchableOpacity className="p-3" onPress={() => router.back()}>
        <Icon name="arrow-back" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
      <View className="flex-row">
        <TouchableOpacity className="p-3" onPress={openBottomSheet}>
          <MaterialCommunityIcons
            name="format-letter-case"
            size={20}
            color={COLOR.BLACK}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const footerComponent = () => (
    <View className="w-full p-4 bg-gray-100 items-center">
      {loading ? (
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
    <GestureHandlerRootView>
      <Container>
        <Navigation />
        <FlatList
          data={chapters}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => <MemorizedHtml content={item.content} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          ListFooterComponent={footerComponent}
        />
        <PaperSettingSheet ref={bottomSheetRef} />
        <Banner id="ca-app-pub-9927932498877675/9730492658" />
      </Container>
    </GestureHandlerRootView>
  );
}

const PaperSettingSheet = forwardRef<BottomSheet, {}>((_, ref) => {
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.2}
        style={[{ backgroundColor: "black" }, StyleSheet.absoluteFillObject]}
      />
    ),
    []
  );

  const SettingFontFamily = () => (
    <BottomSheetView className="px-4 py-2">
      <Text>Font Family</Text>
      <View className="flex-row my-2">
        <TouchableOpacity
          onPress={() => setFontFamily("Roboto")}
          className="flex-1 p-3 justify-center items-center border-small border-r-0 border-black/10"
        >
          <Text
            className={cn(
              "font-roboto",
              fontFamily == "Roboto" ? "text-primary" : " text-black"
            )}
          >
            Non-Serif
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFontFamily("PTSerif")}
          className="flex-1 p-3 justify-center items-center border-small border-black/10"
        >
          <Text
            className={cn(
              "font-serif text-black",
              fontFamily == "PTSerif" ? "text-primary" : " text-black"
            )}
          >
            Serif
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );

  const SettingFontSize = () => (
    <BottomSheetView className="px-4 py-2">
      <Text>Font Size</Text>
      <View className="flex-row my-2">
        <TouchableOpacity
          onPress={() => setFontSize((prev) => (prev <= 16 ? prev : prev - 2))}
          className="flex-1 p-3 justify-center items-center border-small border-black/10"
        >
          <Text className="text-xl">-</Text>
        </TouchableOpacity>
        <Text className="p-3 px-6 border-y-small border-black/10">
          {fontSize}
        </Text>
        <TouchableOpacity
          onPress={() => setFontSize((prev) => (prev >= 40 ? prev : prev + 2))}
          className="flex-1 p-3 justify-center items-center border-small border-black/10"
        >
          <Text className="text-xl">+</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      snapPoints={useMemo(() => ["50%"], [])}
      handleIndicatorStyle={{
        marginVertical: 12,
        width: 40,
        backgroundColor: "rgba(0,0,0,.7)",
      }}
      backdropComponent={renderBackdrop}
    >
      <SettingFontSize />
      <SettingFontFamily />
    </BottomSheet>
  );
});
