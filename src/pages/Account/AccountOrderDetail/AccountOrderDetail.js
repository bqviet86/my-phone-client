import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import { OrderStatus } from '~/constants'
import api from '~/utils/api'
import formatTime from '~/utils/formatTime'
import styles from './AccountOrderDetail.module.scss'
import formatPrice from '~/utils/formatPrice'

const cx = classNames.bind(styles)

function AccountOrderDetail() {
    const { order_id } = useParams()

    const [order, setOrder] = useState()

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await api.get(`/orders/${order_id}`)
                setOrder(response.data.result)
            } catch (err) {
                console.log(err.response)
            }
        }

        getOrder()
    }, [order_id])

    console.log(order)

    return (
        <div className={cx('wrapper')}>
            <div className='flex items-center'>
                <Link to='/account/orders' className={cx('back-btn')}>
                    <Icon icon='mingcute:left-line' />
                </Link>
                <h2 className='font-semibold text-4xl'>Đơn hàng: {order_id}</h2>
            </div>

            {order && (
                <>
                    <div className={cx('info')}>
                        <div className={cx('info-item')}>
                            <h2>Thông tin người nhận</h2>
                            <p className={cx('text')}>
                                <strong>Người nhận: </strong>
                                {order.user.name}
                            </p>
                            <p className={cx('text')}>
                                <strong>Địa chỉ: </strong>
                                {order.address.specific_address}
                            </p>
                            <p className={cx('text')}>
                                <strong>Điện thoại: </strong>
                                {order.address.phone_number}
                            </p>
                        </div>
                        <div className={cx('info-item')}>
                            <h2>Thông tin đơn hàng</h2>
                            <p className={cx('text')}>
                                <strong>Trạng thái đơn hàng: </strong>
                                {OrderStatus[order.order_status].title}
                            </p>
                            <p className={cx('text')}>
                                <strong>Thời gian tạo: </strong>
                                {formatTime(order.created_at, true)}
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
                    </div>
                </>
            )}
        </div>
    )
}

export default AccountOrderDetail
