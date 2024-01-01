const AUTH_URL = `https://app.ynab.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=token`;

export const handleLogin = () => {
  window.location.href = AUTH_URL;
};
