import JwtDecode from 'jwt-decode';
const TOKEN = 'token';

export const setTokenInLocalStorage = (token, rememberMe = true) => {
  if (rememberMe) {
    localStorage.setItem (TOKEN, token);
    sessionStorage.removeItem (TOKEN);
  } else {
    sessionStorage.setItem (TOKEN, token);
    localStorage.removeItem (TOKEN);
  }
};

export const getToken = () => {
  return localStorage.getItem (TOKEN) || sessionStorage.getItem (TOKEN);
};

export const getUser = () => {
  try {
    const token = getToken ();
    return JwtDecode (token);
  } catch (err) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem (TOKEN);
  sessionStorage.removeItem (TOKEN);
};
