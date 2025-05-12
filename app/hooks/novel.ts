import { Chapter, Novel } from "@/types/novel";
import { atom } from "jotai";

export const novelAtom = atom<Novel | undefined>(undefined);
export const chapterAtom = atom<Chapter | undefined>(undefined);
export const refreshHistoryAtom = atom<boolean>(false);
