import classNames from 'classnames/bind'

import formatPrice from '~/utils/formatPrice'
import styles from './PhoneOption.module.scss'

const cx = classNames.bind(styles)

function PhoneOption({ data, handleShowOptionForm }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('option')}>
                <img className={cx('image')} src={`http://localhost:8000/static/image/${data.images[0]}`} alt='' />
                <p className={cx('line')}>Màu sắc: {data.color}</p>
                <p className={cx('line')}>Dung lượng: {data.capacity}</p>
                <p className={cx('line')}>Giá: {formatPrice(data.price)}</p>
                <p className={cx('line')}>Giá gốc: {formatPrice(data.price_before_discount)}</p>
                <p className={cx('line')}>Số lượng: {data.quantity}</p>
            </div>
            <div className={cx('actions')}>
                <div
                    className={cx('btn', 'btn-update')}
                    onClick={() => handleShowOptionForm({ phone_option: data, mode: 'update' })}
                >
                    Cập nhật
                </div>
                <div
                    className={cx('btn', 'btn-delete')}
                    onClick={() => handleShowOptionForm({ phone_option: data, mode: 'delete' })}
                >
                    Xóa
                </div>
            </div>
        </div>
    )
}

export default PhoneOption
