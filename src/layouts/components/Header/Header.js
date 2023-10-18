import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import HeadlessTippy from '@tippyjs/react/headless'

import images from '~/assets/images'
import config from '~/config'
import { userMenu } from '~/constants'
import useLogout from '~/hooks/useLogout'
import { userSelector } from '~/redux/selectors'
import api from '~/utils/api'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    const currentPath = useLocation().pathname
    const currentUser = useSelector(userSelector)
    const navigate = useNavigate()
    const { logout } = useLogout()

    const [user, setUser] = useState({})
    const [isLogout, setIsLogout] = useState(false)

    useEffect(() => {
        if (currentUser?.user_id) {
            const getMe = async () => {
                try {
                    const response = await api.get('/users/me')

                    setUser(response.data.result)
                } catch (err) {
                    console.log(err.response.data.message)
                }
            }

            getMe()
        }
    }, [currentUser?.user_id])

    useEffect(() => {
        if (isLogout && currentUser?.refresh_token) {
            const callLogout = async () => {
                const data = {
                    refresh_token: currentUser.refresh_token
                }
                const result = await logout(data)

                if (result.success) {
                    navigate(config.routes.home)
                }

                setIsLogout(false)
            }

            callLogout()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogout, currentUser?.refresh_token])

    const handleLogout = async () => {
        setIsLogout(true)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to='/' className={cx('logo')}>
                    <img src={images.logo} alt='logo' />
                </Link>

                <div className={cx('right')}>
                    {currentUser ? (
                        <div className={cx('user-wrap')}>
                            <HeadlessTippy
                                interactive
                                placement='bottom'
                                render={(attrs) => (
                                    <div className={cx('user-menu')} tabIndex='-1' {...attrs}>
                                        <div className={cx('info')}>
                                            <div className={cx('avatar')}>
                                                <img
                                                    src={
                                                        user.avatar
                                                            ? `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${user.avatar}`
                                                            : images.avatar
                                                    }
                                                    alt='avatar'
                                                />
                                            </div>
                                            <div className={cx('info-details')}>
                                                <span className={cx('name')}>{user.name}</span>
                                                <span className={cx('email')}>{user.email}</span>
                                            </div>
                                        </div>

                                        {userMenu.map((item, index) => (
                                            <Link key={index} to={item.to} className={cx('item')}>
                                                <Icon icon={item.icon} />
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}

                                        <div className={cx('logout')}>
                                            <button onClick={handleLogout}>Đăng xuất</button>
                                        </div>
                                    </div>
                                )}
                            >
                                <div className={cx('user')}>
                                    <div className={cx('avatar')}>
                                        <img
                                            src={
                                                user.avatar
                                                    ? `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${user.avatar}`
                                                    : images.avatar
                                            }
                                            alt='avatar'
                                        />
                                    </div>
                                    <div className={cx('hello')}>
                                        Xin chào,
                                        <br />
                                        {user.name}
                                    </div>
                                </div>
                            </HeadlessTippy>
                        </div>
                    ) : (
                        <>
                            <Link
                                to={config.routes.login}
                                className={cx('navigate', { active: currentPath === config.routes.login })}
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to={config.routes.register}
                                className={cx('navigate', { active: currentPath === config.routes.register })}
                            >
                                Đăng ký
                            </Link>
                        </>
                    )}
                    <Link
                        to={config.routes.cart}
                        className={cx('navigate', { active: currentPath === config.routes.cart })}
                    >
                        Giỏ hàng
                        <Icon icon='mdi:cart' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
