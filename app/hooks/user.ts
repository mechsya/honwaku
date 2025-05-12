import { atom } from "jotai";

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

export const userAtom = atom<User | undefined>(undefined);
export const refreshAfterLogoutAtom = atom<boolean>(false);
