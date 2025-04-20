import { StyleSheet, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { _filterRef, _genresSelected } from "@/hooks/explore";
import { useAtom, useSetAtom } from "jotai";
import { cn } from "../cn";
import Genre from "./genre";

export default function Filter() {
  const ref = useRef<BottomSheet>(null);
  const setFilterRef = useSetAtom(_filterRef);
  const [filterRender, setFilterRender] = useState("genre");

  useEffect(() => setFilterRef(ref), [setFilterRef]);

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      index={-1}
      snapPoints={useMemo(() => ["50%", "75%"], [])}
      style={style.bottomSheetContainer}
    >
      <BottomSheetView className="flex-row items-center">
        {["genre"].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setFilterRender(item)}
            className={cn(
              "flex-1 px-4 justify-between py-3 border-b-[0.5px] border-black/10"
            )}
          >
            <Text className="font-roboto capitalize">{item}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheetView>
      {filterRender === "genre" ? <Genre /> : null}
    </BottomSheet>
  );
}

export const style = StyleSheet.create({
  bottomSheetContainer: {
    zIndex: 99,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.1)",
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
});
