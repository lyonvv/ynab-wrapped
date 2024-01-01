// src/App.tsx
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { accessTokenAtom } from './state/auth';
import { Login } from './components/Login';
import { Main } from './components/Main';
import queryString from 'query-string';

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    const parsedHash = queryString.parse(window.location.hash);

    if (
      parsedHash.access_token &&
      typeof parsedHash.access_token === 'string'
    ) {
      setAccessToken(parsedHash.access_token);

      window.location.hash = '';
    }
  }, [setAccessToken]);

  return <div className="App">{!accessToken ? <Login /> : <Main />}</div>;
};

export default App;
