import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'

import AddressList from './AddressList'
import PaymentMethod from './PaymentMethod'
import images from '~/assets/images'
import config from '~/config'
import { PaymentMethods } from '~/constants'
import useAccount from '~/hooks/useAccount'
import api from '~/utils/api'
import formatPrice from '~/utils/formatPrice'
import styles from './Checkout.module.scss'

const cx = classNames.bind(styles)

function Checkout() {
    const location = useLocation()
    const navigate = useNavigate()
    const { cart_ids, total_price } = location.state || {}

    const [addresses, setAddresses] = useState([])
    const [addressChecked, setAddressChecked] = useState('')
    const [content, setContent] = useState('')
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethods.CreditCard)
    const [products, setProducts] = useState([])

    const { getAllAddress } = useAccount()

    const fetchAllAddress = async () => {
        const { result } = await getAllAddress()

        setAddresses(result)

        return result
    }

    useEffect(() => {
        const getAddresses = async () => {
            const result = await fetchAllAddress()

            setAddressChecked(result.find((address) => address.default)._id)
        }

        getAddresses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (cart_ids) {
            const getProducts = async () => {
                try {
                    const response = await api.get('/carts', {
                        params: {
                            carts: cart_ids.join('|')
                        }
                    })

                    setProducts(response.data.result)
                } catch (error) {
                    console.log(error.response)
                }
            }

            getProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlePayment = async () => {
        try {
            const response = await api.post(`/orders/${paymentMethod}`, {
                carts: cart_ids,
                address: addressChecked,
                content
            })

            window.history.replaceState(null, '', location.pathname)

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
            {cart_ids && total_price ? (
                <div className={cx('content')}>
                    <div className={cx('left')}>
                        <div className={cx('address-wrap')}>
                            <h2>Thông tin địa chỉ</h2>
                            <AddressList
                                addresses={addresses}
                                fetchAllAddress={fetchAllAddress}
                                addressChecked={addressChecked}
                                setAddressChecked={setAddressChecked}
                            />
                        </div>

                        <div className={cx('note')}>
                            <h2>Ghi chú cho đơn hàng</h2>
                            <input
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
                                <Link to='/cart' state={{ cart_ids }}>
                                    Chỉnh sửa
                                </Link>
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
                                    <span>{formatPrice(total_price)}</span>
                                </p>

                                <p className={cx('text')}>
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </p>

                                <p className={cx('text', 'total-price')}>
                                    <span>Tổng thanh toán</span>
                                    <span>{formatPrice(total_price)}</span>
                                </p>

                                <p className={cx('text', 'vat')}>(Đã bao gồm thuế VAT)</p>

                                <button className={cx('payment-btn')} onClick={handlePayment}>
                                    Thanh toán
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

export default Checkout
