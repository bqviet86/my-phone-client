import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import { OrderStatus, OrderStatusQueryParams } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import api from '~/utils/api'
import formatTime from '~/utils/formatTime'
import formatPrice from '~/utils/formatPrice'
import styles from './AccountOrders.module.scss'
import config from '~/config'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function AccountOrders() {
    const { tab } = useQueryParams()

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get('/orders', {
                    params: {
                        order_status: OrderStatusQueryParams[tab]
                    }
                })

                setOrders(response.data.result)
            } catch (err) {
                console.log(err.response)
            }
        }

        getOrders()
    }, [tab])

    return (
        <div className={cx('wrapper')}>
            <div className='flex justify-between'>
                <h2 className='font-semibold text-4xl'>Quản lý đơn hàng</h2>
            </div>

            <div className={cx('status-btn')}>
                {Object.entries(OrderStatus).map((status, index) => {
                    const tabValue = Object.entries(OrderStatusQueryParams).find(
                        (item) => `${item[1]}` === status[0]
                    )[0]

                    return (
                        <Link
                            key={index}
                            to={`${config.routes.accountOrders}?tab=${tabValue}`}
                            className={cx('btn', { active: tabValue === tab })}
                        >
                            {status[1].title}
                        </Link>
                    )
                })}
            </div>

            {orders.length ? (
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
            ) : (
                <div className='flex-1 flex flex-col justify-center items-center'>
                    <img src={images.no_products_found} alt='' className='w-[160px]' />
                    <p className='mt-[16px]'>Bạn không có đơn hàng nào</p>
                </div>
            )}
        </div>
    )
}

export default AccountOrders
