import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'

import config from '~/config'
import useLogin from '~/hooks/useLogin'
import styles from './AdminLogin.module.scss'

const cx = classNames.bind(styles)

function AdminLogin() {
    const location = useLocation()
    const onlyAdmin = location.state?.onlyAdmin
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        email: '',
        password: ''
    })
    const { login } = useLogin(true)

    console.log('error', error)

    useEffect(() => {
        if (onlyAdmin) {
            toast('Bạn cần đăng nhập với tài khoản admin để truy cập vào trang này', { icon: '😅' })
            window.history.replaceState(null, '', location.pathname)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setError((prev) => ({ ...prev, [name]: '' }))
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await login(data)

        if (!result.success) {
            if (typeof result.errors === 'string') {
                toast.error(result.errors)
            } else {
                setError(result.errors)
            }

            return
        }

        // Đăng nhập thành công thì chuyển sang trang admin
        navigate(config.routes.adminUser)
        toast.success(result.message)
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('login-form')} onSubmit={handleSubmit}>
                <h2 className={cx('title')}>Đăng nhập</h2>

                <div className={cx('input-wrap')}>
                    <input name='email' placeholder='Email' value={data.email} onChange={handleChange} />
                    {error.email && <div className={cx('error')}>{error.email}</div>}
                </div>

                <div className={cx('input-wrap')}>
                    <input
                        type='password'
                        name='password'
                        placeholder='Mật khẩu'
                        value={data.password}
                        onChange={handleChange}
                    />
                    {error.password && <div className={cx('error')}>{error.password}</div>}
                </div>

                <button type='submit' className={cx('submit')}>
                    Đăng nhập
                </button>
            </form>
        </div>
    )
}

export default AdminLogin
