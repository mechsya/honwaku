import { atom } from "jotai";

export const _fontFamily = atom<string>("PTSerif");
export const _fontSize = atom<number>(16);
export const _lineHeight = atom<number>(28);

export const _chapterRef = atom<any>(null);
export const _settingRef = atom<any>(null);
