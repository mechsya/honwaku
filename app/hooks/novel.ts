import { Chapter, Novel } from "@/types/novel";
import { atom } from "jotai";

export const _novel = atom<Novel | undefined>(undefined);
export const _chapter = atom<Chapter | undefined>(undefined);
export const _refreshHistory = atom<boolean>(false);
