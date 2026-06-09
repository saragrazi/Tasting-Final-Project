import axios from 'axios';
import {useSnack} from '../providers/SnackbarProvider';
import {useUser} from '../users/providers/UserProvider';
import {useEffect} from 'react';

const useAxios = () => {
  const {setSnack} = useSnack ();
  const {token} = useUser ();

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
          setSnack ('error', error.message);
          return Promise.reject (error);
        }
      );
    },
    [token, setSnack]
  );
};

export default useAxios;
