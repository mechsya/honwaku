import { atom } from "jotai";

export const filterRefAtom = atom<any | null>(null);
export const genresSelectedAtom = atom<string[]>([]);
