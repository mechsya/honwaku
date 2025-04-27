import { GENRE } from "@/constants/genre";
import { FlatList } from "react-native-gesture-handler";
import Checkbox from "../ui/checkbox";
import { useAtom } from "jotai";
import { _genresSelected } from "@/hooks/explore";

export default function Genre() {
  const [genres, setGenres] = useAtom(_genresSelected);

  const genrePicker = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g: any) => g !== genre)); // Hapus
    } else {
      setGenres([...genres, genre]); // Tambah
    }
  };

  return (
    <FlatList
      data={GENRE}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <Checkbox
          onclick={genrePicker}
          label={item}
          index={index}
          isActive={genres.includes(item)}
        />
      )}
    />
  );
}
