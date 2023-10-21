import classNames from 'classnames/bind'

import styles from './AccountOrders.module.scss'
import { Link, Outlet } from 'react-router-dom'

const cx = classNames.bind(styles)

function AccountOrders() {
    return (
        <div className={cx('wrapper')}>
            <div>
                AccountOrders{' '}
                <div>
                    <Link to='/account/orders/1'>Orders Detail</Link>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default AccountOrders
