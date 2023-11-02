import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const userSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem('user')),
    reducers: {
        login(state, action) {
            const { payload } = action
            const { user_id, role } = jwtDecode(payload.access_token)

            return {
                ...state,
                user_id,
                role,
                ...payload
            }
        },

        logout() {
            return null
        }
    }
})

export default userSlice
