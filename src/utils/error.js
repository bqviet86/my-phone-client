const handleError = (error) => {
    const res = error.response.data

    if (res.errors) {
        const errorObj = {}
        const { errors: errorsResponse } = res

        for (const key in errorsResponse) {
            if (Object.hasOwnProperty.call(errorsResponse, key)) {
                const element = errorsResponse[key]
                errorObj[key] = element.msg
            }
        }

        return errorObj
    }

    if (res.message === 'Access token không được để trống') {
        return 'Bạn cần phải đăng nhập để thực hiện chức năng này'
    }

    return error.response.data.message
}

export default handleError
