import api from "~/utils/api"

function useBrands() {
    
    const getBrands = async () => {
        try {
            const response = await api.get('/brands')
            return {
                success:true,
                message:response.data.message,
                result: response.data.result
            }
        } catch (error) {
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
        }
    }

}

export default useBrands