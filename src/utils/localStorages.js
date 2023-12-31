import jwtDecode from 'jwt-decode'

export const saveUser = (access_token, refresh_token) => {
    const { user_id, role } = jwtDecode(access_token)

    localStorage.setItem(
        'user',
        JSON.stringify({
            user_id,
            role,
            access_token,
            refresh_token
        })
    )
}

export const removeUser = () => {
    localStorage.removeItem('user')
}
