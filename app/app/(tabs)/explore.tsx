import Container from "@/components/container";
import Navbar from "@/components/explore/navbar";
import { COLOR } from "@/constants/color";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@/components/icon";
import Seperator from "@/components/seperator";
import CardNovel from "@/components/ui/card-novel";
import Filter from "@/components/explore/filter";
import { atom, useAtom, useAtomValue } from "jotai";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { get } from "@/utils/fetch";
import { Novel } from "@/types/novel";
import Wrapper from "@/components/wrapper";
import { _genresSelected } from "@/hooks/explore";

const _query = atom("");

export default function ExploreScreen() {
  const [query, setQuery] = useAtom(_query);
  const [novels, setNovel] = useState<Novel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const genres = useAtomValue(_genresSelected);

  const searchNovels = useCallback(
    debounce((text: string) => {
      let genreString = genres?.join(",");

      if (text.trim() === "" && genres.length === 0) {
        setNovel([]);
        return;
      }

      get({
        url: `novel/search?q=${text}&genre=${genreString}`,
        setter: setNovel,
        loading: setLoading,
      });
    }, 500),
    [genres]
  );

  const handleChangeText = (text: string) => {
    setQuery(text);
    searchNovels(text);
  };

  useEffect(() => {
    searchNovels(query);
  }, [genres, query, searchNovels]);

  return (
    <GestureHandlerRootView className="flex-1">
      <Container>
        <Navbar />
        <View className="p-4">
          <Search onChange={handleChangeText} />
          <Seperator label="Hasil Pencarian" />
          <Wrapper loading={loading} data={novels}>
            <FlatList
              data={novels}
              nestedScrollEnabled={true}
              renderItem={({ item, index }) => (
                <CardNovel key={item.id} {...item} />
              )}
            />
          </Wrapper>
        </View>
        <Filter />
      </Container>
    </GestureHandlerRootView>
  );
}

const Search = ({ onChange }: { onChange: (value: string) => void }) => {
  const query = useAtomValue(_query);

  return (
    <View className="flex-row bg-gray-100 my-2 rounded items-center">
      <TextInput
        placeholder="Cari novel"
        onChangeText={onChange}
        value={query}
        placeholderClassName="font-roboto"
        className="flex-1 p-4 font-roboto text-lg"
      />
      <TouchableOpacity className="px-2">
        <Icon name="search" size={20} color={COLOR.BLACK} />
      </TouchableOpacity>
    </View>
  );
};
