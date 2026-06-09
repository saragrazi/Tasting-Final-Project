import JwtDecode from 'jwt-decode';
const TOKEN = 'token';

export const setTokenInLocalStorage = token => {
  localStorage.setItem (TOKEN, token);
};

export const getUser = () => {
  try {
    const user = localStorage.getItem (TOKEN);
    return JwtDecode (user);
  } catch (err) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem (TOKEN);
};

export const getToken = () => {
  localStorage.getItem (TOKEN);
};
