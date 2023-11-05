import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import { OrderStatus, PaymentMethodArray, Sex } from '~/constants'
import api from '~/utils/api'
import formatPrice from '~/utils/formatPrice'
import formatTime from '~/utils/formatTime'
import styles from './ManageOrderDetail.module.scss'
import Modal from '~/components/Modal'

const cx = classNames.bind(styles)

const OrderStatusValues = Object.values(OrderStatus)

function ManageOrderDetail() {
    const { order_id } = useParams()
    const navigate = useNavigate()

    const [order, setOrder] = useState()
    const [orderStatusValue, setOrderStatusValue] = useState()
    const [isShowModal, setIsShowModal] = useState(false)
    const [mode, setMode] = useState('')

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

    const handleShowModal = (mode) => {
        setMode(mode)
        setIsShowModal(true)
    }

    const handleChangeOrderStatus = async (order_status) => {
        try {
            await api.patch(`/orders/${order_id}`, {
                order_status
            })

            getOrder()
            setIsShowModal(false)
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
                <h2 className='font-semibold text-4xl text-[#fff]'>Đơn hàng: {order_id}</h2>
            </div>

            {order && (
                <>
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <h2>Thông tin khách hàng</h2>
                            <p className={cx('text')}>
                                <strong>Họ tên: </strong>
                                {order.user.name}
                            </p>
                            <p className={cx('text')}>
                                <strong>Email: </strong>
                                {order.user.email}
                            </p>
                            <p className={cx('text')}>
                                <strong>Số điện thoại: </strong>
                                {order.user.phone_number}
                            </p>
                            <p className={cx('text')}>
                                <strong>Ngày sinh: </strong>
                                {formatTime(order.user.date_of_birth)}
                            </p>
                            <p className={cx('text')}>
                                <strong>Giới tính: </strong>
                                {Sex[order.user.sex]}
                            </p>
                        </div>
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
                                    className={`px-2 py-1 text-[1.2rem] font-bold rounded-full ${orderStatusValue?.style}`}
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
                        <div className={cx('title')}>
                            <span style={{ width: 'calc(40% - 16px)' }}>Sản phẩm</span>
                            <span style={{ width: 'calc(20% - 16px)' }}>Đơn giá</span>
                            <span style={{ width: 'calc(20% - 16px)' }}>Số lượng</span>
                            <span style={{ width: 'calc(20% - 16px)' }}>Thành tiền</span>
                        </div>

                        {order.carts.map((product) => (
                            <div key={product._id} className={cx('product-item')}>
                                <div className={cx('product')}>
                                    <Link to={`/phone/${product.phone._id}`} className={cx('image')}>
                                        <img
                                            src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${product.phone_option.images[0]}`}
                                            alt={product.phone.name}
                                        />
                                    </Link>
                                    <div className={cx('info')}>
                                        <Link to={`/phone/${product.phone._id}`} className={cx('name')}>
                                            {product.phone.name}
                                        </Link>
                                        <p>
                                            <strong>Màu: </strong>
                                            {product.phone_option.color}
                                        </p>
                                        <p>
                                            <strong>Dung lượng: </strong>
                                            {product.phone_option.capacity}
                                        </p>
                                    </div>
                                </div>

                                <div className={cx('price')}>
                                    <span>{formatPrice(product.phone_option.price)}</span>
                                    <span>{formatPrice(product.phone_option.price_before_discount)}</span>
                                </div>

                                <div className={cx('quantity')}>{product.quantity}</div>

                                <div className={cx('total-price')}>{formatPrice(product.total_price)}</div>
                            </div>
                        ))}
                    </div>

                    <div className={cx('under')}>
                        <div className={cx('invoice')}></div>

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
                        </div>

                        <div className={cx('actions')}>
                            <button
                                className={cx('btn', 'primary', {
                                    disabled: order.order_status !== OrderStatus.PendingConfirmation.id
                                })}
                                onClick={() => handleShowModal('confirm')}
                            >
                                Xác nhận đơn hàng
                            </button>
                            <button
                                className={cx('btn', 'danger', {
                                    disabled: [
                                        OrderStatus.Shipping.id,
                                        OrderStatus.Completed.id,
                                        OrderStatus.Cancelled.id
                                    ].includes(order.order_status)
                                })}
                                onClick={() => handleShowModal('cancel')}
                            >
                                Hủy đơn hàng
                            </button>
                        </div>

                        <Modal
                            width={400}
                            height='auto'
                            bgColor='#111827'
                            textColor='#9ca3af'
                            closeBtnColor='#9ca3af'
                            title={mode === 'confirm' ? 'Xác nhận đơn hàng' : mode === 'cancel' ? 'Hủy đơn hàng' : ''}
                            showModal={isShowModal}
                            closeModal={() => setIsShowModal(false)}
                        >
                            <div className={cx('modal')}>
                                <h4>
                                    {mode === 'confirm'
                                        ? 'Bạn có chắc chắn muốn xác nhận đơn hàng này?'
                                        : mode === 'cancel'
                                        ? 'Bạn có chắc chắn muốn hủy đơn hàng này?'
                                        : ''}
                                </h4>
                                <div
                                    className={cx('btn', {
                                        primary: mode === 'confirm',
                                        danger: mode === 'cancel'
                                    })}
                                    onClick={
                                        mode === 'confirm'
                                            ? () => handleChangeOrderStatus(OrderStatus.Processing.id)
                                            : mode === 'cancel'
                                            ? () => handleChangeOrderStatus(OrderStatus.Cancelled.id)
                                            : () => {}
                                    }
                                >
                                    {mode === 'confirm' ? 'Xác nhận' : mode === 'cancel' ? 'Hủy' : ''}
                                </div>
                            </div>
                        </Modal>
                    </div>
                </>
            )}
        </div>
    )
}

export default ManageOrderDetail
