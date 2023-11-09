import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'

import AddressList from '~/components/AddressList'
import PaymentMethod from '~/components/PaymentMethod'
import images from '~/assets/images'
import config from '~/config'
import { PaymentMethods, PaymentStatus } from '~/constants'
import useAccount from '~/hooks/useAccount'
import api from '~/utils/api'
import formatPrice from '~/utils/formatPrice'
import styles from './ConfirmPayment.module.scss'

const cx = classNames.bind(styles)

function ConfirmPayment() {
    const { order_id } = useParams()
    const navigate = useNavigate()

    const [order, setOrder] = useState()
    const [addresses, setAddresses] = useState([])
    const [addressChecked, setAddressChecked] = useState('')
    const [isShowAllAddress, setIsShowAllAddress] = useState(false)
    const [content, setContent] = useState('')
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethods.CreditCard)
    const [products, setProducts] = useState([])

    console.log(addressChecked)
    const { getAllAddress } = useAccount()

    const fetchAllAddress = async () => {
        const { result } = await getAllAddress()

        setAddresses(result)

        return result
    }

    useEffect(() => {
        fetchAllAddress()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await api.get(`/orders/${order_id}`)
                const orderResponse = response.data.result

                setOrder(orderResponse)
                setContent(orderResponse.content)
                setPaymentMethod(orderResponse.payment.payment_method)
                setProducts(orderResponse.carts)
            } catch (err) {
                console.log(err.response)
            }
        }

        getOrder()
    }, [order_id])

    const handleConfirmPayment = async () => {
        try {
            const response = await api.put(`/orders/confirm-payment/${order_id}/${paymentMethod}`, {
                carts: products.map((product) => product._id),
                address: addressChecked,
                content
            })

            const { order, payment_url } = response.data.result

            // Nếu có payment_url thì redirect sang trang thanh toán không thì redirect sang trang order success
            if (payment_url) {
                window.location.href = payment_url
                return
            }

            navigate({
                pathname: config.routes.orderSuccess,
                search: `?order_id=${order._id}` // Để xác định phương thức thanh toán là trả tiền mặt
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div className={cx('wrapper')}>
            {order && order.payment.payment_status === PaymentStatus.PendingPayment ? (
                <div className={cx('content')}>
                    <div className={cx('left')}>
                        <div className={cx('address-wrap')}>
                            {isShowAllAddress || (
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <h2>Thông tin địa chỉ</h2>
                                        <button
                                            className={cx('btn', 'choose')}
                                            onClick={() => setIsShowAllAddress(true)}
                                        >
                                            Chọn địa chỉ khác
                                        </button>
                                    </div>
                                    <div className={cx('current-address')}>
                                        <div className={cx('heading')}>
                                            <p className={cx('name')}>{order.address.name}</p>
                                        </div>
                                        <p className={cx('phone')} style={{ margin: '6px 0' }}>
                                            {order.address.phone_number}
                                        </p>
                                        <p className={cx('address-text')} style={{ marginTop: 'auto' }}>
                                            {order.address.specific_address}
                                        </p>
                                    </div>
                                </>
                            )}

                            {isShowAllAddress && (
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <h2>Chọn địa chỉ giao hàng</h2>
                                        <button
                                            className={cx('btn', 'remove')}
                                            onClick={() => {
                                                setIsShowAllAddress(false)
                                                setAddressChecked('')
                                            }}
                                        >
                                            Loại bỏ
                                        </button>
                                    </div>
                                    <AddressList
                                        addresses={addresses}
                                        fetchAllAddress={fetchAllAddress}
                                        addressChecked={addressChecked}
                                        setAddressChecked={setAddressChecked}
                                    />
                                </>
                            )}
                        </div>

                        <div className={cx('note')}>
                            <h2>Ghi chú cho đơn hàng</h2>
                            <input
                                spellCheck={false}
                                placeholder='Nhập thông tin ghi chú cho nhà bán hàng'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        <div className={cx('payment')}>
                            <h2>Phương thức thanh toán</h2>
                            <p className={cx('note')}>Chọn phương thức thanh toán phù hợp với bạn</p>
                            <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('order-info')}>
                            <div className={cx('heading')}>
                                <h2>Thông tin đơn hàng</h2>
                            </div>

                            <div className={cx('product-list')}>
                                {products.map((product) => (
                                    <div key={product._id} className={cx('product')}>
                                        <Link to={`/phone/${product.phone._id}`} className={cx('image-wrap')}>
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${product.phone_option.images[0]}`}
                                                alt='product'
                                            />
                                        </Link>

                                        <div className={cx('info')}>
                                            <Link to={`/phone/${product.phone._id}`} className={cx('name')}>
                                                {product.phone.name}
                                            </Link>

                                            <p className={cx('text')}>
                                                {product.phone_option.color}, {product.phone_option.capacity}
                                            </p>

                                            <p className={cx('text')}>Số lượng: {product.quantity}</p>

                                            <div className={cx('price-block')}>
                                                <p className={cx('price')}>{formatPrice(product.phone_option.price)}</p>
                                                <p className={cx('price_before_discount')}>
                                                    {formatPrice(product.phone_option.price_before_discount)}
                                                </p>
                                            </div>

                                            <p className={cx('total-price')}>
                                                Thành tiền: <span>{formatPrice(product.total_price)}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('payment')}>
                            <h2>Thanh toán</h2>
                            <div className={cx('details')}>
                                <p className={cx('text')}>
                                    <span>Tạm tính</span>
                                    <span>{formatPrice(order.payment.total_price)}</span>
                                </p>

                                <p className={cx('text')}>
                                    <span>Phí vận chuyển</span>
                                    <span>{formatPrice(0)}</span>
                                </p>

                                <p className={cx('text', 'total-price')}>
                                    <span>Tổng thanh toán</span>
                                    <span>{formatPrice(order.payment.total_price)}</span>
                                </p>

                                <p className={cx('text', 'vat')}>(Đã bao gồm thuế VAT)</p>

                                <button className={cx('payment-btn')} onClick={handleConfirmPayment}>
                                    Thanh toán ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('empty-cart')}>
                    <img src={images.empty_cart} alt='empty cart' />
                    <p>Bạn chưa chọn sản phẩm nào để thanh toán</p>
                </div>
            )}
        </div>
    )
}

export default ConfirmPayment
