import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import useAxios from '../../hooks/useAxios';
import { login, signUp } from '../services/usersApiService';
import {
    getUser,
    removeToken,
    setTokenInLocalStorage,
} from '../services/localStorageService';
import ROUTES from '../../routes/routesModel';
import normalizeUser from '../helpers/normalization/normalizeUser';


const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);


    const navigate = useNavigate();
    const { user, setUser, setToken } = useUser();
    useAxios();

    const requestStatus = useCallback(
        (pending, error, users, user = null) => {
            setPending(pending);
            setUsers(users);
            setUser(user);
            setError(error);
        }, [setUser]
    );

    const handleLogin = useCallback(
        async user => {
            try {
                const token = await login(user);
                setToken(token);
                setTokenInLocalStorage(token);
                const userFromLocalStorage = getUser();
                requestStatus(false, null, null, userFromLocalStorage);
                navigate(ROUTES.CARDS);
            } catch (error) {
                requestStatus(false, error, null);
            }
        }, [navigate, requestStatus, setToken]
    );

    const handleLogout = useCallback(
        () => {
            removeToken();
            setUser(null);
        }, [setUser]
    );

    const handleSignup = useCallback(
        async user => {
            try {
                setPending(true);
                const normalizedUser = normalizeUser(user);
                await signUp(normalizedUser);
                await handleLogin({
                    email: user.email,
                    password: user.password,
                });
            } catch (error) {
                requestStatus(false, error, null);
            }
        }, [handleLogin, requestStatus]
    );

    return { pending, error, user, users, handleLogin, handleLogout, handleSignup };
};

export default useUsers;