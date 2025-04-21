import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

type User = {
  data: {
    id: string;
    name: string | any;
    email: string | any;
    password: string | any;
  };
  token: string;
  expires_in: number;
};

export const _user = atom<User | undefined>(undefined);
export const _refreshAfterLogout = atom<boolean>(false);
