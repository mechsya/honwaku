import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";

import Container from "@/components/container";
import Navbar from "@/components/explore/navbar";
import Filter from "@/components/explore/filter";
import Icon from "@/components/icon";
import CardNovel from "@/components/ui/card-novel";
import { COLOR } from "@/constants/color";
import { GENRE } from "@/constants/genre";
import { get } from "@/utils/fetch";
import { Novel } from "@/types/novel";
import { cn } from "@/components/cn";

export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [novels, setNovels] = useState<Novel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchNovels = async (newPage = 1, reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      const response = await get({
        url: `novel/search?q=${query}&genre=${genres.join(",")}&page=${newPage}`,
      });
      const data = await response?.data;

      if (Array.isArray(data?.data)) {
        setNovels((prev) => (reset ? data.data : [...prev, ...data.data]));
        setHasMore(data.current_page < data.last_page);
        setPage(data.current_page + 1);
      }
    } catch (err) {
      console.error("fetch error:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch saat user mengetik (dengan debounce)
  useEffect(() => {
    if (!hasInteracted) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchNovels(1, true);
    }, 500);
  }, [query]);

  // Fetch saat genre dipilih (hanya jika user sudah interaksi)
  useEffect(() => {
    if (!hasInteracted) return;
    fetchNovels(1, true);
  }, [genres]);

  const handleEndReached = () => {
    if (!loading && hasMore) {
      fetchNovels(page);
    }
  };

  const toggleGenre = (genre: string) => {
    setHasInteracted(true);
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const GenreFilter = () => (
    <FlatList
      data={GENRE}
      horizontal
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="w-2" />}
      className="mt-4"
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => toggleGenre(item)}
          className={cn(
            "border px-4 justify-center items-center rounded-full h-10",
            genres.includes(item) ? "border-primary" : "border-black/10"
          )}
        >
          <Text className="text-black/80 uppercase font-medium">{item}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const Footer = () => (
    <View className="items-center my-4">
      {loading ? (
        <ActivityIndicator size="small" color={COLOR.PRIMARY} />
      ) : hasMore ? (
        <Text className="text-black/70 font-roboto">
          Scroll untuk memuat lebih banyak
        </Text>
      ) : null}
    </View>
  );

  return (
    <GestureHandlerRootView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <Container>
          <Navbar />

          {/* Search + Filter */}
          <View className="p-4">
            <View className="flex-row rounded border border-black/10 items-center">
              <TextInput
                placeholder="Cari nama novel"
                value={query}
                onChangeText={(text) => {
                  setQuery(text);
                  setHasInteracted(true);
                }}
                className="flex-1 p-4 font-roboto text-lg"
              />
              <TouchableOpacity className="px-2">
                <Icon name="search" size={20} color={COLOR.BLACK} />
              </TouchableOpacity>
            </View>
            <GenreFilter />
          </View>

          {/* Novel List */}
          <FlatList
            data={novels}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <CardNovel {...item} />}
            showsVerticalScrollIndicator={false}
            onEndReached={handleEndReached}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
            onEndReachedThreshold={0.3}
            ListFooterComponent={Footer}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            keyboardShouldPersistTaps="handled"
          />
        </Container>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
