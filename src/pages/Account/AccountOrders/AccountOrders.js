import { useEffect, useState } from 'react'
import api from '~/utils/api'
import EmptyOrder from './EmptyOrder'
import OrderList from './OrderList'

function AccountOrders() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get('/orders')
                setOrders(response.data.result)
            } catch (err) {
                console.log(err.response)
            }
        }
        getOrders()
    }, [])
    return (
        <div className='my-8 h-full'>
            <div className='flex justify-between'>
                <h2 className='font-semibold text-4xl'>Quản lý đơn hàng</h2>
            </div>
            {orders.length > 0 ? <OrderList orders={orders} /> : <EmptyOrder />}
        </div>
    )
}

export default AccountOrders
