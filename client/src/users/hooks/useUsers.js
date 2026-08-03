import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import useAxios from '../../hooks/useAxios';
import { login, signUp, getUsers, setUserBlockedStatus, deleteUser } from '../services/usersApiService';
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
    const { user, setUser, setToken, setWelcomeUser } = useUser();
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
                const { rememberMe, ...credentials } = user;
                const token = await login(credentials);
                setToken(token);
                setTokenInLocalStorage(token, rememberMe);
                const userFromLocalStorage = getUser();
                requestStatus(false, null, null, userFromLocalStorage);
                if (userFromLocalStorage?.name?.first) {
                    setWelcomeUser({
                        first: userFromLocalStorage.name.first,
                        last: userFromLocalStorage.name.last,
                    });
                }
                navigate(ROUTES.CARDS);
            } catch (error) {
                requestStatus(false, error, null);
            }
        }, [navigate, requestStatus, setToken, setWelcomeUser]
    );

    const handleLogout = useCallback(
        () => {
            removeToken();
            setUser(null);
        }, [setUser]
    );

    const handleGetUsers = useCallback(
        async () => {
            try {
                setPending(true);
                const allUsers = await getUsers();
                requestStatus(false, null, allUsers, user);
            } catch (error) {
                requestStatus(false, error, null, user);
            }
        }, [requestStatus, user]
    );

    const handleBlockUser = useCallback(
        async (userId, isBlocked) => {
            try {
                await setUserBlockedStatus(userId, isBlocked);
                setUsers((prev) =>
                    prev.map((u) => (u._id === userId ? { ...u, isBlocked } : u))
                );
            } catch (error) {
                setError(error);
            }
        }, []
    );

    const handleDeleteUser = useCallback(
        async (userId) => {
            try {
                await deleteUser(userId);
                setUsers((prev) => prev.filter((u) => u._id !== userId));
            } catch (error) {
                setError(error);
            }
        }, []
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
                    rememberMe: user.rememberMe,
                });
            } catch (error) {
                requestStatus(false, error, null);
            }
        }, [handleLogin, requestStatus]
    );

    return {
        pending,
        error,
        user,
        users,
        handleLogin,
        handleLogout,
        handleSignup,
        handleGetUsers,
        handleBlockUser,
        handleDeleteUser,
    };
};

export default useUsers;