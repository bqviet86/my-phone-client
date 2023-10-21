import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import { toast } from 'react-hot-toast'

import images from '~/assets/images'
import config from '~/config'
import useLogin from '~/hooks/useLogin'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    const location = useLocation()
    const from = location.state?.from
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        email: '',
        password: ''
    })
    const { login } = useLogin()

    useEffect(() => {
        if (from) {
            toast('Bạn cần đăng nhập để truy cập vào trang này', { icon: '😅' })
        }
    }, [from])

    const handleChange = (e) => {
        const { name, value } = e.target

        setError((prev) => ({ ...prev, [name]: '' }))
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await login(data)

        if (!result.success) {
            setError(result.errors)
            return
        }

        // Đăng nhập thành công thì chuyển sang trang chủ
        navigate(config.routes.home)
        toast.success(result.message)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-image')}>
                <img src={images.login} alt='login' />
            </div>
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

                <div className={cx('register')}>
                    Bạn chưa có tài khoản? <Link to={config.routes.register}>Đăng ký</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
