import classNames from 'classnames/bind'

import styles from './AccountOrders.module.scss'
import OrderItem from './OrderItem'
import formatDate from '~/utils/formatDate'
import {
    CancelledName,
    CompletedName,
    PendingConfirmationName,
    PendingPaymentName,
    ProcessingName,
    ShippingName
} from '~/constants'
import formatPrice from '~/utils/formatPrice'
import { useState } from 'react'
import { Modal } from 'antd'

const cx = classNames.bind(styles)

const OrderList = ({ orders }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [addressDetail, setAddressDetail] = useState({})

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
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('orders')}>
                        <div className={cx('orders-list')}>
                            {orders.map((order) => (
                                <div key={order._id} className='border-b-2'>
                                    <h1 className='text-2xl'>
                                        <strong>Ngày đặt hàng: </strong> {formatDate(order.created_at)}
                                    </h1>
                                    <h1 className='text-2xl flex items-center gap-2'>
                                        <strong>Trạng thái: </strong>
                                        <span
                                            className={`px-2 py-1 text-sm font-semibold rounded-full ${getColorStr(
                                                order.order_status
                                            )}`}
                                        >
                                            {getTextOrderStatus(order.order_status)}
                                        </span>
                                    </h1>
                                    <h1 className='text-2xl flex items-center gap-2'>
                                        <strong>Tổng tiền: </strong>

                                        {formatPrice(order.payment.total_price)}
                                    </h1>
                                    <button
                                        onClick={() => {
                                            setUserInfo(order.user)
                                            setAddressDetail(order.address)
                                            setIsModalOpen(true)
                                        }}
                                        className='rounded-md px-8 py-3 text-[12px] shadow-md bg-gray-100 text-blue-600'
                                    >
                                        Xem thông tin đơn hàng
                                    </button>
                                    <OrderItem carts={order.carts} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                className='custom-modal'
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
            </Modal>
        </>
    )
}

export default OrderList
