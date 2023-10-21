import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { userSlice } from '~/redux/slice'
import api from '~/utils/api'
import handleError from '~/utils/error'
import { saveUser } from '~/utils/localStorages'

function useRegister() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const register = async (data) => {
        setLoading(true)

        try {
            const response = await api.post('/users/register', data)
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

    return { register, loading }
}

export default useRegister
