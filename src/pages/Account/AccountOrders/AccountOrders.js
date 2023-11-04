import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import images from '~/assets/images'
import config from '~/config'
import { OrderStatus } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import api from '~/utils/api'
import formatTime from '~/utils/formatTime'
import formatPrice from '~/utils/formatPrice'
import styles from './AccountOrders.module.scss'

const cx = classNames.bind(styles)

const OrderStatusValues = Object.values(OrderStatus)

function AccountOrders() {
    const { tab } = useQueryParams()

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get('/orders', {
                    params: {
                        order_status: OrderStatusValues.find((item) => item.tab === tab)?.id ?? ''
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
                {OrderStatusValues.map((status) => {
                    const tabValue = status.tab

                    return (
                        <Link
                            key={status.id}
                            to={`${config.routes.accountOrders}?tab=${tabValue}`}
                            className={cx('btn', { active: tabValue === tab })}
                        >
                            {status.title}
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
                        const created_at = formatTime(order.created_at, true)
                        const order_name = `${order.carts[0].phone.name} ${
                            order.carts.length > 1 ? `và ${order.carts.length - 1} sản phẩm khác` : ''
                        }`
                        const total_price = formatPrice(order.payment.total_price, false)
                        const order_status = OrderStatusValues.find((item) => item.id === order.order_status)

                        return (
                            <div key={order._id} className={cx('order')}>
                                <Link to={`/account/orders/${order._id}`} title={order._id}>
                                    {order._id}
                                </Link>
                                <p className={cx('text')} title={created_at}>
                                    {created_at}
                                </p>
                                <p className={cx('text', 'name')} title={order_name}>
                                    {order_name}
                                </p>
                                <p className={cx('text')} title={total_price}>
                                    {total_price}
                                </p>
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
