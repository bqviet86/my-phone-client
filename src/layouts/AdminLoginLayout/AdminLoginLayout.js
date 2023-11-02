import classNames from 'classnames/bind'

import images from '~/assets/images'
import styles from './AdminLoginLayout.module.scss'

const cx = classNames.bind(styles)

function AdminLoginLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-block')}>
                {children}
                <img src={images.admin_login_bg} alt='admin-login-bg' className={cx('bg')} />
            </div>
        </div>
    )
}

export default AdminLoginLayout
