import axios from 'axios';
import {useSnack} from '../providers/SnackbarProvider';
import {useUser} from '../users/providers/UserProvider';
import {removeToken} from '../users/services/localStorageService';
import {useEffect} from 'react';

const useAxios = () => {
  const {setSnack} = useSnack ();
  const {token, setUser, setToken} = useUser ();

  useEffect (
    () => {
      axios.defaults.headers.common['x-auth-token'] = token;
      axios.interceptors.request.use (data => {
        return Promise.resolve (data);
      }, null);

      axios.interceptors.response.use (
        data => {
          return Promise.resolve (data);
        },
        error => {
          if (token && error.response?.status === 401) {
            removeToken ();
            setUser (null);
            setToken (null);
          }
          const serverMessage =
            typeof error.response?.data === 'string'
              ? error.response.data
              : error.response?.data?.message;
          setSnack ('error', serverMessage || 'משהו השתבש');
          return Promise.reject (error);
        }
      );
    },
    [token, setSnack, setUser, setToken]
  );
};

export default useAxios;
