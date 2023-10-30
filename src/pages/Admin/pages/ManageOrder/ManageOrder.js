import { useEffect, useState } from 'react'
import api from '~/utils/api'
import formatDate from '~/utils/formatDate'
import formatPrice from '~/utils/formatPrice'
import {
    CancelledName,
    CompletedName,
    PendingConfirmationName,
    PendingPaymentName,
    ProcessingName,
    ShippingName
} from '~/constants'
import { Modal } from 'antd'
import ProductDetail from './ProductDetail'
const ManageOrder = () => {
    const [orders, setOrders] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [addressDetail, setAddressDetail] = useState({})
    const [carts, setCarts] = useState([])
    const [payment, setPayment] = useState({})
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

    const getColorStr = (status) => {
        switch (status) {
            case 0: {
                return 'text-white bg-blue-500'
            }
            case 1: {
                return 'text-white bg-violet-500'
            }
            case 2: {
                return 'text-white bg-pink-500'
            }
            case 3: {
                return 'text-white bg-amber-500'
            }
            case 4: {
                return 'text-white bg-teal-500'
            }
            default: {
                return 'text-white bg-red-500'
            }
        }
    }

    const getTextOrderStatus = (status) => {
        switch (status) {
            case 0: {
                return PendingPaymentName
            }
            case 1: {
                return PendingConfirmationName
            }
            case 2: {
                return ProcessingName
            }
            case 3: {
                return ShippingName
            }
            case 4: {
                return CompletedName
            }
            default: {
                return CancelledName
            }
        }
    }

    return (
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto grid'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý đơn hàng
                </h2>

                <div className='w-full mt-4 overflow-hidden rounded-lg shadow-xs'>
                    <div className='w-full overflow-x-auto'>
                        <table className='w-full whitespace-no-wrap'>
                            <thead>
                                <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-4 py-6 text-xl'>ID</th>
                                    <th className='px-4 py-6 text-xl'>Tên khách hàng</th>
                                    <th className='px-4 py-6 text-xl'>Trạng thái</th>
                                    <th className='px-4 py-6 text-xl'>Tổng tiền</th>
                                    <th className='px-4 py-6 text-xl'>Ngày tạo</th>
                                    <th className='px-4 py-6 text-xl'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                {orders.map((order) => (
                                    <tr key={order._id} className='text-gray-700 dark:text-gray-400'>
                                        <td className='px-4 py-7'>
                                            <div className='flex items-center'>
                                                <div>
                                                    <p className='font-semibold'>{order._id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-4 py-7'>{order.user.name}</td>
                                        <td className='px-4 py-7'>
                                            <span
                                                className={`px-2 py-1 text-sm font-semibold rounded-full ${getColorStr(
                                                    order.order_status
                                                )}`}
                                            >
                                                {getTextOrderStatus(order.order_status)}
                                            </span>
                                        </td>
                                        <td className='px-4 py-7'>{formatPrice(order.payment.total_price)}</td>
                                        <td className='px-4 py-7'>{formatDate(order.created_at)}</td>
                                        <td className='px-4 py-7 flex gap-2 items-center'>
                                            <button
                                                onClick={() => {
                                                    setCarts(order.carts)
                                                    setUserInfo(order.user)
                                                    setAddressDetail(order.address)
                                                    setPayment(order.payment)
                                                    setIsModalOpen(true)
                                                }}
                                                className='rounded-md px-8 py-3 text-[12px] shadow-md bg-gray-100 text-blue-600 font-semibold hover:opacity-75'
                                            >
                                                Xem chi tiết
                                            </button>
                                            <button className='rounded-md px-8 py-3 text-[12px] shadow-md bg-gray-100 text-teal-600 font-semibold hover:opacity-75'>
                                                Xác nhận
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    okButtonProps={{
                        style: {
                            display: 'none'
                        }
                    }}
                    cancelText={'Thoát'}
                >
                    <div>
                        <h2 className='font-semibold text-3xl'>
                            <span className='text-red-500'>*</span> Thông tin người đặt hàng
                        </h2>
                        <div className='mt-2'>
                            <p className='text-2xl mt-4'>
                                <strong>Họ tên: </strong> {userInfo.name}
                            </p>
                            <p className='text-2xl my-2'>
                                <strong>Email: </strong> {userInfo.email}
                            </p>
                            <p className='text-2xl my-2'>
                                <strong>Số điện thoại: </strong> {userInfo.phone_number}
                            </p>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h2 className='font-semibold text-3xl'>
                            <span className='text-red-500'>*</span> Địa chỉ giao hàng
                        </h2>
                        <div className='mt-2'>
                            <p className='text-2xl mt-4'>
                                <strong>Địa chỉ: </strong> {addressDetail.specific_address}
                            </p>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h2 className='font-semibold text-3xl'>
                            <span className='text-red-500'>*</span> Chi tiết sản phẩm
                        </h2>
                        <div className='mt-2'>
                            {carts.map((cart) => (
                                <ProductDetail key={cart._id} cart={cart} />
                            ))}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h2 className='font-semibold text-3xl'>
                            <span className='text-red-500'>*</span> Tổng tiền:{' '}
                            <span className='underline'>{formatPrice(payment.total_price)}</span>
                        </h2>
                    </div>
                </Modal>
            </div>
        </main>
    )
}

export default ManageOrder
