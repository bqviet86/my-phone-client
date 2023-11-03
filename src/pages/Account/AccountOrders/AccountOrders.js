import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import { OrderStatus } from '~/constants'
import api from '~/utils/api'
import formatTime from '~/utils/formatTime'
import formatPrice from '~/utils/formatPrice'
import styles from './AccountOrders.module.scss'

const cx = classNames.bind(styles)

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
        <div className={cx('wrapper')}>
            <div className='flex justify-between'>
                <h2 className='font-semibold text-4xl'>Quản lý đơn hàng</h2>
            </div>

            <div className={cx('order-list')}>
                <div className={cx('title')}>
                    <span style={{ width: 'calc(17% - 10px)' }}>Mã đơn hàng</span>
                    <span style={{ width: 'calc(17% - 10px)' }}>Ngày đặt</span>
                    <span style={{ width: 'calc(32% - 10px)' }}>Sản phẩm</span>
                    <span style={{ width: 'calc(17% - 10px)' }}>Tổng tiền(đ)</span>
                    <span style={{ width: 'calc(17% - 10px)' }}>Trạng thái</span>
                </div>

                {orders.map((order) => {
                    const order_status = OrderStatus[order.order_status]
                    const order_name = `${order.carts[0].phone.name} ${
                        order.carts.length > 1 ? `và ${order.carts.length - 1} sản phẩm khác` : ''
                    }`

                    return (
                        <div key={order._id} className={cx('order')}>
                            <Link to={`/account/orders/${order._id}`}>{order._id}</Link>
                            <p className={cx('text')}>{formatTime(order.created_at, true)}</p>
                            <p className={cx('text', 'name')} title={order_name}>
                                {order_name}
                            </p>
                            <p className={cx('text')}>{formatPrice(order.payment.total_price, false)}</p>
                            <p
                                className={`${cx(
                                    'text',
                                    'status'
                                )} w-full text-2xl flex justify-center items-center gap-2`}
                            >
                                <span
                                    className={`px-2 py-1 text-[1.1rem] font-medium rounded-full ${order_status.style}`}
                                >
                                    {order_status.title}
                                </span>
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AccountOrders
