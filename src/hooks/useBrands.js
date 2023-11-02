import { useState } from 'react'
import api from '~/utils/api'

function useBrands() {
    const [loading, setLoading] = useState(false)
    // const [brands, setBrands] = useState([])
    const [error, setError] = useState(null)

    const fetchBrands = async () => {
        setLoading(true)
        try {
            const response = await api.get('/brands')
            // setBrands(response.data.result)
            return {
                success: true,
                message: response.data.message,
                result: response.data.result
            }
        } catch (error) {
            setError(error)
            setLoading(false) // Thêm brand thất bại, tắt trạng thái loading
            return { success: false, message: 'Thất bại khi thêm brand' }
        } finally {
            setLoading(false)
        }
    }

    const createBrand = async (brandData) => {
        setLoading(true)

        try {
            const response = await api.post('/brands', brandData)
            // setBrands((prevBrands) => [...prevBrands, response.data.result]);
            return {
                success: true,
                message: response.data.message,
                result: response.data.result
            }
        } catch (error) {
            const errorObj = {}
            const { errors: errorsResponse } = error.response.data

            for (const key in errorsResponse) {
                if (Object.hasOwnProperty.call(errorsResponse, key)) {
                    const element = errorsResponse[key]
                    errorObj[key] = element.msg
                }
            }

            return {
                success: false,
                message: error.response.data.message,
                errors: errorObj
            }
        } finally {
            setLoading(false)
        }
    }

    const deleteBrand = async (id) => {
        setLoading(true)
        console.log(id)
        try {
            const response = await api.delete(`/brands/${id}`)

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

    return { loading, error, createBrand, fetchBrands, deleteBrand }
}

export default useBrands
