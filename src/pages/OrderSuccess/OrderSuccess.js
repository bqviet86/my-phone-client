import classNames from 'classnames/bind'

import styles from './OrderSuccess.module.scss'

const cx = classNames.bind(styles)

function OrderSuccess() {
    return <div className={cx('wrapper')}>OrderSuccess</div>
}

export default OrderSuccess
