import React from 'react'
import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'
import { Link } from 'react-router-dom'
import formatPrice from '~/utils/formatPrice'

const cx = classNames.bind(styles)
const ProductDetail = ({ cart }) => {
    return (
        <div key={cart._id} className={cx('wrapper')}>
            <div className={cx('product')}>
                <Link to={`/phone/${cart.phone._id}`} className={cx('image')}>
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${cart.phone_option.images[0]}`}
                        alt={cart.phone._id}
                    />
                </Link>
                <div className={cx('info')}>
                    <Link to={`/phone/${cart.phone._id}`} className={cx('name')}>
                        {cart.phone.name}
                    </Link>
                    <p>
                        <span>Màu: </span>
                        {cart.phone_option.color}
                    </p>
                    <p>
                        <span>Dung lượng: </span>
                        {cart.phone_option.capacity}
                    </p>
                </div>
            </div>

            <div className={cx('price')}>
                <span>{formatPrice(cart.phone_option.price)}</span>
                <span>{formatPrice(cart.phone_option.price_before_discount)}</span>
            </div>

            <div className={cx('quantity')}>
                <p className={cx('quantity-input')}>x{cart.quantity}</p>
            </div>

            <div className={cx('total-price')}>
                <p>{formatPrice(cart.total_price)}</p>
            </div>
        </div>
    )
}

export default ProductDetail
