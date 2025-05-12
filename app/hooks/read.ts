import { atom } from "jotai";

export const fontFamilyAtom = atom<string>("PTSerif");
export const fontSizeAtom = atom<number>(16);
export const lineHeightATom = atom<number>(28);

export const chapterRefAtom = atom<any>(null);
export const settingRefAtom = atom<any>(null);
