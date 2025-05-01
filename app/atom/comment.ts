import { atomFamily } from "jotai/utils";
import { atom } from "jotai";
import { get } from "@/utils/fetch";
import { Chapter } from "@/types/novel";

export const commentAtomFamily = atomFamily(
  (novelId: number | string | undefined) =>
    atom(async () => {
      if (!novelId) return [];
      const res = await get({ url: `comment?novel=${novelId}` });
      return res.data as Chapter[];
    })
);
