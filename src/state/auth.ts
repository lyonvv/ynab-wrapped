import { atom, useAtomValue } from 'jotai';
import {
  ACCESS_TOKEN_EXPIRATION_LOCAL_STORAGE_KEY,
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
} from '../hooks/useSetAccessToken';
import { globalStore } from './globalStore';

export const accessTokenAtom = atom<string | null>(null);

const checkAndClearExpiredToken = () => {
  const storedToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  const expirationTime = localStorage.getItem(
    ACCESS_TOKEN_EXPIRATION_LOCAL_STORAGE_KEY
  );

  const currentTime = new Date().getTime();

  if (storedToken && expirationTime && currentTime > parseInt(expirationTime)) {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRATION_LOCAL_STORAGE_KEY);
    globalStore.set(accessTokenAtom, null);
  }
};

export const useAccessToken = () => {
  checkAndClearExpiredToken();

  const storedToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

  const stateValue = useAtomValue(accessTokenAtom);

  if (stateValue !== storedToken) {
    globalStore.set(accessTokenAtom, storedToken);
  }

  return storedToken;
};

export const useIsAuthenticated = () => {
  const accessToken = useAccessToken();
  return !!accessToken;
};

export const expiresAtAtom = atom<number | null>(null);
