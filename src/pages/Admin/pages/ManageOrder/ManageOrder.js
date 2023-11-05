import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import config from '~/config'
import { OrderStatus } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import api from '~/utils/api'
import formatPrice from '~/utils/formatPrice'
import formatTime from '~/utils/formatTime'
import styles from './ManageOrder.module.scss'

const cx = classNames.bind(styles)

const OrderStatusValues = Object.values(OrderStatus)

function ManageOrder() {
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
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto flex flex-col min-h-screen'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý Đơn hàng
                </h2>

                <div className={cx('status-btn')}>
                    {OrderStatusValues.map((status) => {
                        const tabValue = status.tab

                        return (
                            <Link
                                key={status.id}
                                to={`${config.routes.adminOrder}?tab=${tabValue}`}
                                className={cx('btn', { active: tabValue === tab })}
                            >
                                {status.title}
                            </Link>
                        )
                    })}
                </div>

                <div className='w-full mt-[32px] overflow-hidden rounded-lg shadow-xs'>
                    <div className='w-full overflow-x-auto'>
                        <table className='w-full whitespace-no-wrap'>
                            <thead>
                                <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-4 py-6 text-xl text-center'>ID</th>
                                    <th className='px-4 py-6 text-xl text-center'>Ngày đặt</th>
                                    <th className='px-4 py-6 text-xl text-center'>Khách hàng</th>
                                    <th className='px-4 py-6 text-xl text-center'>Sản phẩm</th>
                                    <th className='px-4 py-6 text-xl text-center'>Tổng tiền</th>
                                    <th className='px-4 py-6 text-xl text-center'>Trạng thái</th>
                                    <th className='px-4 py-6 text-xl text-center'>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                {orders.map((order) => {
                                    const order_name = `${order.carts[0].phone.name} ${
                                        order.carts.length > 1 ? `và ${order.carts.length - 1} sản phẩm khác` : ''
                                    }`
                                    const order_status = OrderStatusValues.find(
                                        (item) => item.id === order.order_status
                                    )

                                    return (
                                        <tr key={order._id} className='text-gray-700 dark:text-gray-400'>
                                            <td className='px-4 py-7 text-center text-[1.4rem]'>
                                                <p className={cx('one-line')}>{order._id}</p>
                                            </td>
                                            <td className='px-4 py-7 text-center text-[1.4rem]'>
                                                <p className={cx('one-line')}>{formatTime(order.created_at, true)}</p>
                                            </td>
                                            <td className='px-4 py-7 text-center text-[1.4rem]'>
                                                <p className={cx('one-line')}>{order.user.name}</p>
                                            </td>
                                            <td className='px-4 py-7 text-center text-[1.4rem]'>
                                                <p className={cx('one-line')}>{order_name}</p>
                                            </td>
                                            <td className='px-4 py-7 text-center text-[1.4rem]'>
                                                <p className={cx('one-line')}>
                                                    {formatPrice(order.payment.total_price)}
                                                </p>
                                            </td>
                                            <td className='px-4 py-7 text-center text-[1.4rem] min-w-[120px]'>
                                                <span
                                                    className={`px-2 py-1 text-[1.2rem] font-semibold rounded-full ${order_status.style}`}
                                                >
                                                    {order_status.title}
                                                </span>
                                            </td>
                                            <td className='px-4 py-7 flex gap-2 justify-center items-center text-center text-[1.4rem]'>
                                                <Link to={`/admin-order/${order._id}`}>
                                                    <Icon
                                                        icon='basil:eye-outline'
                                                        style={{
                                                            fontSize: '2rem',
                                                            color: 'var(--blue)',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ManageOrder
