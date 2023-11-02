import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { userSlice } from '~/redux/slice'
import api from '~/utils/api'
import handleError from '~/utils/error'
import { saveUser } from '~/utils/localStorages'

function useLogin(isAdmin = false) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const login = async (data) => {
        setLoading(true)

        try {
            const response = await api.post(`/users${isAdmin ? '/admin' : ''}/login`, data)
            const { access_token, refresh_token } = response.data.result

            saveUser(access_token, refresh_token)
            dispatch(userSlice.actions.login(response.data.result))

            return {
                success: true,
                message: response.data.message
            }
        } catch (err) {
            const errorObj = handleError(err)

            return {
                success: false,
                message: err.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    return { login, loading }
}

export default useLogin
