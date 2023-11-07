import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import HeadlessTippy from '@tippyjs/react/headless'
import { toast } from 'react-hot-toast'

import images from '~/assets/images'
import config from '~/config'
import { userMenu } from '~/constants'
import useLogout from '~/hooks/useLogout'
import { userSelector } from '~/redux/selectors'
import api from '~/utils/api'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    const currentUser = useSelector(userSelector)
    const navigate = useNavigate()
    const { logout } = useLogout()

    const [user, setUser] = useState()
    const [isLogout, setIsLogout] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (currentUser?.user_id) {
            const getMe = async () => {
                try {
                    const response = await api.get('/users/me')

                    setUser(response.data.result)
                } catch (err) {
                    console.log(err.response)
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
                    toast.success(result.message)
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

    const handleSearch = () => {
        if (searchValue.trim()) {
            setSearchValue('')
            navigate(`${config.routes.search}?q=${searchValue}`)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to='/' className={cx('logo')}>
                    <img src={images.logo} alt='logo' />
                </Link>

                <div className={cx('search-wrap')}>
                    <input
                        className={cx('search-input')}
                        placeholder='Tìm kiếm điện thoại'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch()
                            }
                        }}
                    />
                    <button className={cx('search-button')} onClick={handleSearch}>
                        <Icon icon='mdi:magnify' />
                    </button>
                </div>

                <div className={cx('right')}>
                    {currentUser ? (
                        user && (
                            <>
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
                                <NavLink
                                    to={config.routes.cart}
                                    className={({ isActive }) => cx('navigate', { active: isActive })}
                                >
                                    Giỏ hàng
                                    <Icon icon='mdi:cart' />
                                </NavLink>
                            </>
                        )
                    ) : (
                        <>
                            <NavLink
                                to={config.routes.login}
                                className={({ isActive }) => cx('navigate', { active: isActive })}
                            >
                                Đăng nhập
                            </NavLink>
                            <NavLink
                                to={config.routes.register}
                                className={({ isActive }) => cx('navigate', { active: isActive })}
                            >
                                Đăng ký
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
