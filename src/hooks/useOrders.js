import api from '~/utils/api'

function useOrders() {
    const getDetailOrder = async (id) => {
        try {
            const response = await api.get(`/orders/${id}`)
            return response.data.result
        } catch (err) {
            console.log(err.response)
        }
    }

    const getAllOrders = async () => {
        try {
            const response = await api.get('/orders')
            return response.data.result
        } catch (err) {
            console.log(err.response)
        }
    }

    return { getAllOrders, getDetailOrder }
}

export default useOrders
