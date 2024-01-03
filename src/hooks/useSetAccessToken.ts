import queryString from 'query-string';
import { useEffect } from 'react';
import { accessTokenAtom } from '../state/auth';
import { globalStore } from '../state/globalStore';
import { calculateExpirationTime } from '../utils/utils';

export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'ynabWrappedAccessToken';
export const ACCESS_TOKEN_EXPIRATION_LOCAL_STORAGE_KEY =
  'ynabWrappedAccessTokenExpiration';

export function useSetAccessToken() {
  useEffect(() => {
    const parsedHash = queryString.parse(window.location.hash);

    if (
      parsedHash.access_token &&
      typeof parsedHash.access_token === 'string' &&
      parsedHash.expires_in &&
      typeof parsedHash.expires_in === 'string'
    ) {
      const expiresIn = parseInt(parsedHash.expires_in);
      const expirationTime = calculateExpirationTime(expiresIn);

      localStorage.setItem(
        ACCESS_TOKEN_LOCAL_STORAGE_KEY,
        parsedHash.access_token
      );
      localStorage.setItem(
        ACCESS_TOKEN_EXPIRATION_LOCAL_STORAGE_KEY,
        expirationTime.toString()
      );

      globalStore.set(accessTokenAtom, parsedHash.access_token);

      window.location.hash = '';
    }
  }, []);
}
