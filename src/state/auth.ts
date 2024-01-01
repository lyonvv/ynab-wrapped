import { atom } from 'jotai';

export const accessTokenAtom = atom<string | null>(null);
export const expiresAtAtom = atom<number | null>(null);
