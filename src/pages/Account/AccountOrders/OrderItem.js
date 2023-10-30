import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import 'tippy.js/dist/tippy.css'
import formatPrice from '~/utils/formatPrice'
import styles from './OrderItem.module.scss'

const cx = classNames.bind(styles)

function OrderItem({ carts }) {
    return carts.map((item) => (
        <div key={item._id} className={cx('wrapper')}>
            <div className={cx('product')}>
                <Link to={`/phone/${item.phone._id}`} className={cx('image')}>
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${item.phone_option.images[0]}`}
                        alt={item.phone._id}
                    />
                </Link>
                <div className={cx('info')}>
                    <Link to={`/phone/${item.phone._id}`} className={cx('name')}>
                        {item.phone.name}
                    </Link>
                    <p>
                        <span>Màu: </span>
                        {item.phone_option.color}
                    </p>
                    <p>
                        <span>Dung lượng: </span>
                        {item.phone_option.capacity}
                    </p>
                </div>
            </div>

            <div className={cx('options')}>
                <div className={cx('choose-wrap')}>
                    <div className={cx('choose-option')}>
                        <p>
                            <span>Màu: </span>
                            {item.phone_option.color}
                        </p>
                        <p>
                            <span>Dung lượng: </span>
                            {item.phone_option.capacity}
                        </p>
                    </div>
                </div>
            </div>

            <div className={cx('price')}>
                <span>{formatPrice(item.phone_option.price)}</span>
                <span>{formatPrice(item.phone_option.price_before_discount)}</span>
            </div>

            <div className={cx('quantity')}>
                <p className={cx('quantity-input')}>{item.quantity}</p>
            </div>

            <div className={cx('total-price')}>
                <p>{formatPrice(item.total_price)}</p>
            </div>
        </div>
    ))
}

export default OrderItem
