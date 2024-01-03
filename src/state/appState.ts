import { atom, useAtomValue } from 'jotai';

export const selectedYearAtom = atom<number>(0);

export const useSelectedYear = () => {
  return useAtomValue(selectedYearAtom);
};
