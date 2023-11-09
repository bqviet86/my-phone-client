import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { format } from 'date-fns'
import viLocale from 'date-fns/locale/vi'
import Barcode from 'react-barcode'

import images from '~/assets/images'
import { PaymentMethodArray, PaymentStatus } from '~/constants'
import formatPrice from '~/utils/formatPrice'
import styles from './Invoice.module.scss'

const cx = classNames.bind(styles)

function Invoice({ invoice }, ref) {
    const order = invoice?.order

    return (
        <>
            {invoice && order && (
                <div ref={ref} className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <div className={cx('logo')}>
                            <img src={images.logo} alt='logo' />
                        </div>

                        <div className={cx('info')}>
                            <p>
                                <span>Địa chỉ: </span>đường 3/2, p.Xuân Khánh, q.Ninh Kiều, tp.Cần Thơ
                            </p>
                            <p>
                                <span>Email: </span>spacephone@gmail.com
                            </p>
                            <p>
                                <span>Website: </span>spacephone.com
                            </p>
                        </div>
                    </div>

                    <h1 className={cx('title')}>Hóa đơn thanh toán</h1>

                    <div className={cx('code-wrap')}>
                        <div className={cx('code-info')}>
                            <p className={cx('code-title')}>
                                <span>Mã hóa đơn: </span>
                                <span>{`#${invoice._id}`}</span>
                            </p>
                            <p className={cx('code-title')}>
                                <span>Mã đơn hàng: </span>
                                <span>{`#${order._id}`}</span>
                            </p>
                            <p className={cx('code-title')}>
                                <span>Ngày đặt hàng: </span>{' '}
                                <span>
                                    {format(new Date(order.created_at), 'dd/MM/yyyy, HH:mm:ss a', {
                                        locale: viLocale
                                    })}
                                </span>
                            </p>
                        </div>

                        <Barcode value={`#${order._id}`} width={0.9} height={50} displayValue={false} />
                    </div>

                    <div className={cx('body')}>
                        <div className={cx('info')}>
                            <div className={cx('left')}>
                                <div className={cx('title')}>Hóa đơn đến</div>

                                <div className={cx('desc')}>
                                    <p>
                                        <span>Người nhận: </span> {order.address.name}
                                    </p>
                                    <p>
                                        <span>Email: </span> {order.address.email}
                                    </p>
                                    <p>
                                        <span>Địa chỉ: </span> {order.address.specific_address}
                                    </p>
                                    <p>
                                        <span>Số điện thoại: </span> {order.address.phone_number}
                                    </p>
                                </div>
                            </div>

                            <div className={cx('right')}>
                                <div className={cx('title')}>Thông tin thanh toán</div>

                                <div className={cx('desc')}>
                                    <p>
                                        <span>Phương thức thanh toán: </span>{' '}
                                        {
                                            PaymentMethodArray.find((item) => item.id === order.payment.payment_method)
                                                ?.name
                                        }
                                    </p>
                                    <p>
                                        <span>Trạng thái thanh toán: </span>{' '}
                                        {order.payment.payment_status === PaymentStatus.PendingPayment
                                            ? 'Chưa thanh toán'
                                            : 'Đã thanh toán'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('products')}>
                            <div className={cx('header', 'page-break')}>
                                <div className={cx('title')}>
                                    <span style={{ width: 'calc(40% - 16px)' }}>Sản phẩm</span>
                                    <span style={{ width: 'calc(20% - 16px)' }}>Đơn giá</span>
                                    <span style={{ width: 'calc(20% - 16px)' }}>Số lượng</span>
                                    <span style={{ width: 'calc(20% - 16px)' }}>Thành tiền</span>
                                </div>
                            </div>

                            <div className={cx('body')}>
                                {order.carts.map((product, index) => (
                                    <div key={product._id} className={cx('page-break')}>
                                        <div
                                            className={cx('product-item')}
                                            style={
                                                index === order.carts.length - 1 ? { borderRadius: '0 0 8px 8px' } : {}
                                            }
                                        >
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
                                                {/* <span>{formatPrice(product.phone_option.price_before_discount)}</span> */}
                                            </div>

                                            <div className={cx('quantity')}>{product.quantity}</div>

                                            <div className={cx('total-price')}>{formatPrice(product.total_price)}</div>
                                        </div>
                                    </div>
                                ))}

                                <div className={cx('page-break')}>
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
                                            <span className={cx('total-price')}>
                                                {formatPrice(order.payment.total_price)}
                                            </span>
                                        </div>

                                        <p className={cx('vat')}>(Đã bao gồm VAT)</p>
                                    </div>
                                </div>

                                <div className={cx('page-break')}>
                                    <div className={cx('footer')}>
                                        <p className={cx('title')}>Cảm ơn quý khách đã mua hàng tại SpacePhone!</p>
                                        <p className={cx('text')}>
                                            Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi tại
                                            spacephone@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default forwardRef(Invoice)
