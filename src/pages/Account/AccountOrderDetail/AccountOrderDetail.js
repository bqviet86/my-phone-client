import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import { OrderStatus, PaymentMethodArray } from '~/constants'
import api from '~/utils/api'
import formatTime from '~/utils/formatTime'
import formatPrice from '~/utils/formatPrice'
import styles from './AccountOrderDetail.module.scss'

const cx = classNames.bind(styles)

const OrderStatusValues = Object.values(OrderStatus)

function AccountOrderDetail() {
    const { order_id } = useParams()
    const navigate = useNavigate()

    const [order, setOrder] = useState()
    const [orderStatusValue, setOrderStatusValue] = useState()

    const getOrder = async () => {
        try {
            const response = await api.get(`/orders/${order_id}`)
            const orderResponse = response.data.result

            setOrder(orderResponse)
            setOrderStatusValue(OrderStatusValues.find((item) => item.id === orderResponse.order_status))
        } catch (err) {
            console.log(err.response)
        }
    }

    useEffect(() => {
        getOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order_id])

    const handleCancelOrder = async () => {
        try {
            await api.patch(`/orders/${order_id}`, {
                order_status: OrderStatus.Cancelled.id
            })

            getOrder()
        } catch (err) {
            console.log(err.response)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className='flex items-center'>
                <button className={cx('back-btn')} onClick={() => navigate(-1)}>
                    <Icon icon='mingcute:left-line' />
                </button>
                <h2 className='font-semibold text-4xl'>Đơn hàng: {order_id}</h2>
            </div>

            {order && (
                <>
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <h2>Thông tin giao hàng</h2>

                            <p className={cx('text')}>
                                <strong>Người nhận: </strong>
                                {order.address.name}
                            </p>

                            <p className={cx('text')}>
                                <strong>Email: </strong>
                                {order.address.email}
                            </p>

                            <p className={cx('text')}>
                                <strong>Số điện thoại: </strong>
                                {order.address.phone_number}
                            </p>

                            <p className={cx('text')}>
                                <strong>Địa chỉ: </strong>
                                {order.address.specific_address}
                            </p>
                        </div>

                        <div className={cx('info-item')}>
                            <h2>Thông tin đơn hàng</h2>

                            <p className={cx('text')}>
                                <strong>Trạng thái đơn hàng: </strong>
                                <span
                                    className={`px-2 py-1 text-[1.1rem] font-medium rounded-full ${orderStatusValue?.style}`}
                                >
                                    {orderStatusValue?.title}
                                </span>
                            </p>

                            <p className={cx('text')}>
                                <strong>Thời gian tạo: </strong>
                                {formatTime(order.created_at, true)}
                            </p>

                            <p className={cx('text')}>
                                <strong>Phương thức thanh toán: </strong>
                                {PaymentMethodArray.find((item) => item.id === order.payment.payment_method)?.name}
                            </p>

                            <p className={cx('text')}>
                                <strong>Thông tin ghí chú: </strong>
                                {order.content}
                            </p>
                        </div>
                    </div>

                    <div className={cx('products')}>
                        <h2>Sản phẩm</h2>

                        {order.carts.map((product) => (
                            <div key={product._id} className={cx('product-item')}>
                                <div className={cx('image')}>
                                    <img
                                        src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${product.phone_option.images[0]}`}
                                        alt=''
                                    />
                                </div>

                                <div className={cx('info')}>
                                    <p className={cx('name')}>{product.phone.name}</p>
                                    <p>Màu sắc: {product.phone_option.color}</p>
                                    <p>Dung lượng: {product.phone_option.capacity}</p>
                                </div>

                                <div className={cx('price_quantity')}>
                                    <span className={cx('price')}>{formatPrice(product.total_price)}</span>
                                    <span className={cx('quantity')}>x{product.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={cx('total')}>
                        <div className={cx('line')}>
                            <span>Tổng tạm tính</span>
                            <span>{formatPrice(order.payment.total_price)}</span>
                        </div>

                        <div className={cx('line')}>
                            <span>Phí vận chuyển</span>
                            <span>{formatPrice(0)}</span>
                        </div>

                        <div className={cx('line')}>
                            <span>Giảm giá</span>
                            <span>{formatPrice(0)}</span>
                        </div>

                        <div className={cx('line')}>
                            <span>Thành tiền</span>
                            <span className={cx('total-price')}>{formatPrice(order.payment.total_price)}</span>
                        </div>

                        <p className={cx('vat')}>(Đã bao gồm VAT)</p>

                        {order.order_status === OrderStatus.PendingPayment.id && (
                            <button
                                className={cx('btn', 'payment-btn')}
                                onClick={() => navigate(`/confirm-payment/${order_id}`)}
                            >
                                Thanh toán ngay
                            </button>
                        )}

                        {[OrderStatus.PendingPayment.id, OrderStatus.PendingConfirmation.id].includes(
                            order.order_status
                        ) && (
                            <button className={cx('btn', 'cancel-btn')} onClick={handleCancelOrder}>
                                Hủy đơn hàng
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default AccountOrderDetail
