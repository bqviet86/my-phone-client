import { useState } from 'react'

import api from '~/utils/api'

function useAccount() {
    const [loading, setLoading] = useState(false)

    const changeInformation = async (data) => {
        setLoading(true)

        try {
            const response = await api.patch('/users/me', data)

            return {
                success: true,
                message: response.data.message
            }
        } catch (err) {
            const errorObj = {}
            const { errors: errorsResponse } = err.response.data

            for (const key in errorsResponse) {
                if (Object.hasOwnProperty.call(errorsResponse, key)) {
                    const element = errorsResponse[key]
                    errorObj[key] = element.msg
                }
            }

            return {
                success: false,
                message: err.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    const getInformation = async () => {
        setLoading(true)

        try {
            const response = await api.get('/users/me')

            return {
                success: true,
                message: response.data.message,
                result: response.data.result
            }
        } catch (err) {
            const errorObj = {}
            const { errors: errorsResponse } = err.response.data

            for (const key in errorsResponse) {
                if (Object.hasOwnProperty.call(errorsResponse, key)) {
                    const element = errorsResponse[key]
                    errorObj[key] = element.msg
                }
            }

            return {
                success: false,
                message: err.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    const getAllAddress = async () => {
        setLoading(true)

        try {
            const response = await api.get('/users/address')

            return {
                success: true,
                message: response.data.message,
                result: response.data.result
            }
        } catch (err) {
            const errorObj = {}
            const { errors: errorsResponse } = err.response.data

            for (const key in errorsResponse) {
                if (Object.hasOwnProperty.call(errorsResponse, key)) {
                    const element = errorsResponse[key]
                    errorObj[key] = element.msg
                }
            }

            return {
                success: false,
                message: err.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    const createNewAddress = async (data) => {
        setLoading(true)

        try {
            const response = await api.post('/users/address', data)

            return {
                success: true,
                message: response.data.message,
                result: response.data.result
            }
        } catch (err) {
            const errorObj = {}
            const { errors: errorsResponse } = err.response.data

            for (const key in errorsResponse) {
                if (Object.hasOwnProperty.call(errorsResponse, key)) {
                    const element = errorsResponse[key]
                    errorObj[key] = element.msg
                }
            }

            return {
                success: false,
                message: err.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    const updateAddress = async (data) => {
        setLoading(true)

        try {
            const response = await api.patch(`/users/address/${data._id}`, data)

            return {
                success: true,
                message: response.data.message
            }
        } catch (err) {
            const errorObj = {}
            const { errors: errorsResponse } = err.response.data

            for (const key in errorsResponse) {
                if (Object.hasOwnProperty.call(errorsResponse, key)) {
                    const element = errorsResponse[key]
                    errorObj[key] = element.msg
                }
            }

            return {
                success: false,
                message: err.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    const deleteAddress = async (id) => {
        setLoading(true)

        try {
            const response = await api.delete(`/users/address/${id}`)

            return {
                success: true,
                message: response.data.message
            }
        } catch (err) {
            const errorObj = {}
            const { errors: errorsResponse } = err.response.data

            for (const key in errorsResponse) {
                if (Object.hasOwnProperty.call(errorsResponse, key)) {
                    const element = errorsResponse[key]
                    errorObj[key] = element.msg
                }
            }

            return {
                success: false,
                message: err.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    return { changeInformation, getInformation, getAllAddress, createNewAddress, updateAddress, deleteAddress, loading }
}

export default useAccount
