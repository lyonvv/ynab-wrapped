// src/App.tsx
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { accessTokenAtom } from './state/auth';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { globalStore } from './state/globalStore';
import queryString from 'query-string';

const App: React.FC = () => {
  const [accessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    const parsedHash = queryString.parse(window.location.hash);

    console.log(parsedHash);

    if (
      parsedHash.access_token &&
      typeof parsedHash.access_token === 'string'
    ) {
      globalStore.set(accessTokenAtom, parsedHash.access_token);

      window.location.hash = '';
    }
  }, []);

  return <div>{accessToken ? <Main /> : <Login />}</div>;
};

export default App;
