import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { useSnack } from '../../providers/SnackbarProvider';
import useAxios from '../../hooks/useAxios';
import { login, googleLogin, signUp, getUsers, setUserBlockedStatus, deleteUser, editBusinessStatus } from '../services/usersApiService';
import {
    getUser,
    removeToken,
    setTokenInLocalStorage,
    updateStoredToken,
} from '../services/localStorageService';
import ROUTES from '../../routes/routesModel';
import normalizeUser from '../helpers/normalization/normalizeUser';


const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const [businessPending, setBusinessPending] = useState(false);
    const [blockingUserId, setBlockingUserId] = useState(null);
    const [googlePending, setGooglePending] = useState(false);


    const navigate = useNavigate();
    const { user, setUser, setToken, setWelcomeUser } = useUser();
    const { setSnack } = useSnack();
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

    const handleGoogleLogin = useCallback(
        async credential => {
            setGooglePending(true);
            try {
                const token = await googleLogin(credential);
                setToken(token);
                setTokenInLocalStorage(token, true);
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
                setSnack('error', error?.message || error || 'ההתחברות עם גוגל נכשלה');
            } finally {
                setGooglePending(false);
            }
        }, [navigate, requestStatus, setToken, setWelcomeUser, setSnack]
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
            setBlockingUserId(userId);
            try {
                await setUserBlockedStatus(userId, isBlocked);
                setUsers((prev) =>
                    prev.map((u) => (u._id === userId ? { ...u, isBlocked } : u))
                );
            } catch (error) {
                setError(error);
            } finally {
                setBlockingUserId(null);
            }
        }, []
    );

    const handleBecomeBusiness = useCallback(
        async () => {
            setBusinessPending(true);
            try {
                const { token } = await editBusinessStatus(user._id, true);
                updateStoredToken(token);
                setToken(token);
                setUser(getUser());
                setSnack('success', 'החשבון שלך הפך לעסקי בהצלחה! עכשיו אפשר להוסיף מתכונים.');
            } catch (error) {
                setSnack('error', error || 'לא ניתן היה לשדרג את החשבון כרגע');
            } finally {
                setBusinessPending(false);
            }
        }, [user, setToken, setUser, setSnack]
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
        handleGoogleLogin,
        handleLogout,
        handleSignup,
        handleGetUsers,
        handleBlockUser,
        handleDeleteUser,
        handleBecomeBusiness,
        businessPending,
        blockingUserId,
        googlePending,
    };
};

export default useUsers;