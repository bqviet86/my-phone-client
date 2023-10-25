import axios from 'axios'
import jwtDecode from 'jwt-decode'

import store from '~/redux/store'
import { removeUser, saveUser } from './localStorages'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL // http://localhost:8000
})

let isRefreshing = false
let refreshSubscribers = []

const onTokenRefreshed = (new_access_token) => {
    refreshSubscribers.forEach((callback) => callback(new_access_token))
    refreshSubscribers = []
}

const addSubscriber = (callback) => {
    refreshSubscribers.push(callback)
}

const isAccessTokenExpired = (access_token) => {
    const { exp } = jwtDecode(access_token)

    return Date.now() >= exp * 1000
}

// Hàm để gọi API refresh token
const callRefreshTokenAPI = async (refresh_token) => {
    try {
        const response = await axios.post(
            '/users/refresh-token',
            { refresh_token },
            { baseURL: process.env.REACT_APP_API_URL }
        )

        // Lấy access token mới và refresh token mới từ response
        const new_access_token = response.data.result.access_token
        const new_refresh_token = response.data.result.refresh_token

        // Lưu access token mới và refresh token mới vào local storage
        saveUser(new_access_token, new_refresh_token)

        // Cập nhật access token mới và refresh token mới vào redux store
        store.dispatch({
            type: 'user/login',
            payload: {
                access_token: new_access_token,
                refresh_token: new_refresh_token
            }
        })

        // Trả về access token mới
        return new_access_token
    } catch (error) {
        // Nếu gọi API refresh token mà gặp lỗi thì đăng xuất
        removeUser()
        store.dispatch({ type: 'user/logout' })

        // Trả về null (gọi refresh token thất bại)
        return null
    }
}

// Thêm interceptor cho request
api.interceptors.request.use(
    async (config) => {
        // Lấy access token từ local storage
        const user = JSON.parse(localStorage.getItem('user'))
        const access_token = user?.access_token

        if (access_token) {
            // Nếu access token hết hạn thì gọi API refresh token để lấy access token mới
            if (isAccessTokenExpired(access_token)) {
                // Nếu chưa có request nào gọi API refresh token thì gọi API refresh token
                if (!isRefreshing) {
                    isRefreshing = true

                    const refresh_token = user.refresh_token
                    const new_access_token = await callRefreshTokenAPI(refresh_token)

                    // Nếu có access token mới thì set access token mới vào header của request
                    if (new_access_token) {
                        config.headers.Authorization = `Bearer ${new_access_token}`
                    }

                    // Chạy các request trong mảng subscriber để tiếp tục gọi API với access token mới
                    onTokenRefreshed(new_access_token)

                    // Set lại biến isRefreshing về false để các request tiếp theo có thể gọi API refresh token
                    isRefreshing = false

                    return config
                }

                // Nếu đang có request nào gọi API refresh token thì đợi đến khi có access token mới thì mới tiếp tục
                return new Promise((resolve) => {
                    addSubscriber((new_access_token) => {
                        if (new_access_token) {
                            config.headers.Authorization = `Bearer ${new_access_token}`
                        }

                        resolve(config)
                    })
                })
            }

            // Nếu access token chưa hết hạn thì set access token vào header của request
            config.headers.Authorization = `Bearer ${access_token}`
        }

        return config
    },
    (error) => {
        console.log('error', error)
        return Promise.reject(error)
    }
)

export default api
