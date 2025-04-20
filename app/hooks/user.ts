import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

interface IUser {
  user: {
    id: string;
    name: string | any;
    email: string | any;
    password: string | any;
  };
  token: string;
  expires_in: number;
}

export const _user = atom<IUser | undefined>(undefined);
