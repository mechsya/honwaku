import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Container from "@/components/container";
import Icon from "@/components/icon";
import { cn } from "@/components/cn";
import { COLOR } from "@/constants/color";
import { _fontFamily, _fontSize, _lineHeight } from "@/hooks/read";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { get, post } from "@/utils/fetch";
import { _chapter, _novel, _refreshHistory } from "@/hooks/novel";
import Loading from "@/components/loading";
import { RenderHTML } from "react-native-render-html";
import { marked } from "marked";
import { _user } from "@/hooks/user";
import Banner from "@/components/ads/banner";
import NativeAds from "@/components/ads/native";

const { width } = Dimensions.get("window");
const snapPoints = ["25%", "50%", "75%"];
const _settingPaperRef = atom<BottomSheetMethods | null>(null);
const _chapterRef = atom<BottomSheetMethods | null>(null);
const _currentSlug = atom<string | string[] | undefined>(undefined);

export default function ReadScreen() {
  const [fontSize] = useAtom(_fontSize);
  const [fontStyle] = useAtom(_fontFamily);
  const [lineHeight] = useAtom(_lineHeight);
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useAtom(_chapter);
  const [currentSlug, _] = useAtom(_currentSlug);
  const [inScreen, setInScreen] = useState(false);
  const [, setNovel] = useAtom(_novel);
  const user = useAtomValue(_user);
  const [refreshHistory, setRefreshHistory] = useAtom(_refreshHistory);

  useEffect(() => {
    get({ url: `novel/${params.novelSlug}`, setter: setNovel });

    if (user) {
      post({
        url: "history",
        header: { Authorization: `Bearer ${user?.token}` },
        body: {
          user: user?.data.id,
          chapter: chapter?.id,
        },
      });
      setRefreshHistory(!refreshHistory);
    }

    get({
      url: `chapter/${inScreen ? currentSlug : params.slug}`,
      setter: setChapter,
      loading: setLoading,
    }).then(() => setInScreen(true));
  }, [currentSlug]);

  const content = marked(
    chapter?.content?.replace(
      /http:\/\/localhost:8000/,
      "http://192.168.0.2:8000"
    ) || ""
  );

  return (
    <GestureHandlerRootView>
      <Container>
        <Navbar />

        {loading ? (
          <View className="flex-1 justify-center items-center bg-white">
            <Loading />
          </View>
        ) : (
          <ScrollView>
            <Banner />
            <View className="p-4">
              <RenderHTML
                contentWidth={width}
                tagsStyles={{
                  p: { fontFamily: fontStyle, fontSize, lineHeight },
                }}
                source={{
                  html: content.toString(),
                }}
                systemFonts={["PTSerif", "Roboto"]}
                enableExperimentalMarginCollapsing
              />
            </View>
            <View className="mb-10">
              <NativeAds />
            </View>
          </ScrollView>
        )}
        <SettingPaperSheet />
        <ChapterSheet />
        <NavigationBottom />
      </Container>
    </GestureHandlerRootView>
  );
}

function Navbar() {
  const [settingRef] = useAtom(_settingPaperRef);
  const router = useRouter();

  return (
    <View className="w-full flex-row h-16 px-4 border-b-[0.5px] border-black/10 items-center justify-between">
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="arrow-back" size={22} color={COLOR.BLACK} />
      </TouchableOpacity>
      <View className="flex-row items-center gap-6">
        <TouchableOpacity onPress={() => settingRef?.expand()}>
          <Icon name="settings" size={22} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NavigationBottom() {
  const [chapterRef] = useAtom(_chapterRef);
  const [currentChapter] = useAtom(_chapter);
  const setCurrentSlug = useSetAtom(_currentSlug);

  return (
    <View className="h-16 flex-row border-y border-black/10 bg-white">
      <TouchableOpacity
        onPress={() => chapterRef?.expand()}
        className="flex-1 flex-row items-center gap-4 px-4 py-4 border-r border-black/10"
      >
        <Icon name="list" size={22} color={COLOR.BLACK} />
        <View>
          <Text className="font-roboto text-base">{currentChapter?.title}</Text>
          <Text className="text-base text-black/50 font-roboto">
            Chapter {currentChapter?.chapter} &middot; Volume{" "}
            {currentChapter?.volume}
          </Text>
        </View>
      </TouchableOpacity>
      {currentChapter?.next != null ? (
        <TouchableOpacity
          onPress={() => setCurrentSlug(currentChapter.next.slug)}
          className="px-8 justify-center items-center"
        >
          <Icon name="arrow-forward" size={22} color={COLOR.BLACK} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function ChapterSheet() {
  const ref = useRef<BottomSheet>(null);
  const setChapterRef = useSetAtom(_chapterRef);
  const [novel] = useAtom(_novel);
  const chapter = useAtomValue(_chapter);
  const setCurrentSlug = useSetAtom(_currentSlug);

  useEffect(() => {
    setChapterRef(ref.current);
  }, [setChapterRef]);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      snapPoints={useMemo(() => ["50%", "100%"], [])}
      backgroundStyle={{ backgroundColor: "white" }}
      style={{
        zIndex: 99,
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,.1)",
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
      }}
    >
      <View className="py-3 px-4 border-b-[0.5px] border-black/10 flex-row justify-end">
        <TouchableOpacity>
          <FontAwesome name="sort" size={20} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <BottomSheetFlatList
        data={novel?.chapter}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setCurrentSlug(item.slug)}
            className="border-b-[0.5px] border-black/10 px-4 py-2"
          >
            <Text
              className={cn(
                "font-roboto text-base",
                item.id === chapter?.id ? "text-primary" : "text-black"
              )}
            >
              {item.title}
            </Text>
            <Text className="font-roboto text-black/50 text-base">
              Chapter {item.chapter} &middot; Volume {item.volume}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className="h-14" />
    </BottomSheet>
  );
}

function SettingPaperSheet() {
  const ref = useRef<BottomSheet>(null);
  const [, setRef] = useAtom(_settingPaperRef);
  const [fontSize, setFontSize] = useAtom(_fontSize);
  const [lineHeight, setLineHeight] = useAtom(_lineHeight);
  const [fontStyle, setFontStyle] = useAtom(_fontFamily);

  useEffect(() => {
    setRef(ref.current);
  }, [setRef]);

  const updateValue = (
    value: number,
    setter: (v: number) => void,
    min: number,
    max: number
  ) => {
    if (value > min && value < max) setter(value);
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      snapPoints={useMemo(() => snapPoints, [])}
      backgroundStyle={{ backgroundColor: "white" }}
      style={{
        zIndex: 99,
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,.1)",
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
      }}
    >
      <BottomSheetView className="p-4">
        <SettingControl
          label="Font Size"
          value={fontSize}
          onIncrease={() => updateValue(fontSize + 4, setFontSize, 8, 32)}
          onDecrease={() => updateValue(fontSize - 4, setFontSize, 12, 40)}
        />
        <SettingControl
          label="Line Height"
          value={lineHeight}
          onIncrease={() => updateValue(lineHeight + 4, setLineHeight, 8, 40)}
          onDecrease={() => updateValue(lineHeight - 4, setLineHeight, 12, 40)}
        />
        <View>
          <Text className="font-roboto text-black mb-2">Font Family</Text>
          <View className="flex-row mb-4 rounded overflow-hidden gap-2">
            {["Roboto", "PTSerif"].map((font) => (
              <TouchableOpacity
                key={font}
                onPress={() => setFontStyle(font)}
                className={cn(
                  "flex-1 py-2 border rounded",
                  fontStyle === font ? "border-primary" : "border-black/10"
                )}
              >
                <Text
                  className={cn(
                    "text-center text-lg",
                    font === "PTSerif" ? "font-serif" : "font-roboto",
                    fontStyle === font ? "text-primary" : "text-black"
                  )}
                >
                  {font}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

function SettingControl({
  label,
  value,
  onIncrease,
  onDecrease,
}: {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <View className="mb-4">
      <Text className="font-roboto text-black mb-2">{label}</Text>
      <View className="flex-row rounded overflow-hidden border border-black/10">
        <TouchableOpacity onPress={onDecrease} className="flex-1 py-2">
          <Text className="text-center text-lg font-robotoSemibold">-</Text>
        </TouchableOpacity>
        <View className="flex-1 border-x border-black/10 justify-center items-center">
          <Text className="text-center text-lg font-roboto text-black">
            {value}
          </Text>
        </View>
        <TouchableOpacity onPress={onIncrease} className="flex-1 py-2">
          <Text className="text-center text-lg font-robotoSemibold">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
