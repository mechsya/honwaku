import { atomFamily } from "jotai/utils";
import { atom } from "jotai";
import { get } from "@/utils/fetch";
import { Chapter as ChapterType } from "@/types/novel";

export const chapterAtomFamily = atomFamily((novelId: number | string) =>
  atom(async () => {
    if (!novelId) return [];
    const res = await get({ url: `chapter?novel_id=${novelId}` });
    return res.data as ChapterType[];
  })
);
