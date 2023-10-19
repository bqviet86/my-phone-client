import classNames from 'classnames/bind'

import styles from './Account.module.scss'
import { Link, Outlet } from 'react-router-dom'

const cx = classNames.bind(styles)

function Account() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <Link to='/account/orders'>Orders</Link>
                <Link to='/account/addresses'>Addresses</Link>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Account
