import { useCallback, useState } from "react"
import { editUser, getUser } from "../../users/services/usersApiService"
import normalizeUser from "../../users/helpers/normalization/normalizeUser"
import { useSnack } from "../../providers/SnackbarProvider"
import { useNavigate } from "react-router-dom"

export const useUserProfile = () => {
    const [userData, setUserData] = useState(null)
    const [open, setOpen] = useState(false)
    const [userId, setUserId] = useState(null)
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const { setSnack } = useSnack();
    const navigate = useNavigate()

    const getUserProfile = async(userId) => {
        const userData = await getUser(userId)
        setUserData(userData);
        return userData;
    }

    const handleEditUser = useCallback(async(card) => {
        const normalized = normalizeUser(card)
        try {
            setPending(true)
            await editUser(userId, normalized)
            setSnack("success", "User Detail Updated")
            navigate("/")
            setOpen(false)
            setPending(false)
        } catch (err) {
            setError(err)
            setSnack("error", `${err}`)
        }
    }, [navigate, setSnack, userId])

    return {
        getUserProfile,
        handleEditUser,
        setUserId,
        setOpen,
        userData,
        open,
        pending,
        error,
    }
}