import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import { PaymentMethodArray } from '~/constants'
import styles from './PaymentMethod.module.scss'

const cx = classNames.bind(styles)

function PaymentMethod({ paymentMethod, setPaymentMethod }) {
    const handleCheckPaymentMethod = (id) => {
        setPaymentMethod(id)
    }

    return (
        <div className={cx('payment-wrap')}>
            {PaymentMethodArray.map((method) => (
                <div
                    key={method.id}
                    className={cx('payment-method', {
                        checked: paymentMethod === method.id
                    })}
                    onClick={() => handleCheckPaymentMethod(method.id)}
                >
                    <div className={cx('heading')}>{method.name}</div>
                    <p className={cx('desc')}>{method.description}</p>

                    <div className={cx('checked-block')}>
                        <Icon icon='ic:round-check' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PaymentMethod
