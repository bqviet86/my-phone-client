import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import { toast } from 'react-hot-toast'

import images from '~/assets/images'
import config from '~/config'
import useRegister from '~/hooks/useRegister'
import styles from './Register.module.scss'

const cx = classNames.bind(styles)

const Sex = {
    male: 0,
    female: 1
}

function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        date_of_birth: '',
        sex: Sex.male
    })
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        date_of_birth: '',
        sex: ''
    })
    const navigate = useNavigate()
    const { register } = useRegister()

    const handleChange = (e) => {
        const { name } = e.target
        let { value } = e.target

        if (name === 'sex') {
            value = Number(value)
        }

        setError((prev) => ({ ...prev, [name]: '' }))
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataToSend = {
            ...data,
            date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString() : ''
        }
        const result = await register(dataToSend)

        if (!result.success) {
            setError(result.errors)
            return
        }

        // Đăng ký thành công thì chuyển sang trang chủ
        navigate(config.routes.home)
        toast.success(result.message)
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('register-form')} onSubmit={handleSubmit}>
                <h2 className={cx('title')}>Đăng ký</h2>

                <div className={cx('input-wrap')}>
                    <input name='name' placeholder='Họ và tên' value={data.name} onChange={handleChange} />
                    {error.name && <div className={cx('error')}>{error.name}</div>}
                </div>

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

                <div className={cx('input-wrap')}>
                    <input
                        type='password'
                        name='confirm_password'
                        placeholder='Nhập lại mật khẩu'
                        value={data.confirm_password}
                        onChange={handleChange}
                    />
                    {error.confirm_password && <div className={cx('error')}>{error.confirm_password}</div>}
                </div>

                <div className={cx('input-wrap')}>
                    <input
                        name='phone_number'
                        placeholder='Số điện thoại'
                        value={data.phone_number}
                        onChange={handleChange}
                    />
                    {error.phone_number && <div className={cx('error')}>{error.phone_number}</div>}
                </div>

                <div className={cx('input-wrap', 'date')}>
                    <label htmlFor='date_of_birth' className={cx('input-label')}>
                        Ngày sinh:
                    </label>
                    <input
                        type='date'
                        id='date_of_birth'
                        name='date_of_birth'
                        value={data.date_of_birth}
                        onChange={handleChange}
                    />
                </div>
                {error.date_of_birth && <div className={cx('error')}>{error.date_of_birth}</div>}

                <div className={cx('input-wrap', 'sex')}>
                    <div className={cx('input-label')}>Giới tính:</div>
                    <div className={cx('radio-wrap')}>
                        <input
                            type='radio'
                            id='male'
                            name='sex'
                            value={Sex.male}
                            checked={data.sex === Sex.male}
                            onChange={handleChange}
                        />
                        <label htmlFor='male'>Nam</label>
                    </div>
                    <div className={cx('radio-wrap')}>
                        <input
                            type='radio'
                            id='female'
                            name='sex'
                            value={Sex.female}
                            checked={data.sex === Sex.female}
                            onChange={handleChange}
                        />
                        <label htmlFor='female'>Nữ</label>
                    </div>
                </div>

                <button type='submit' className={cx('submit')}>
                    Đăng ký
                </button>

                <div className={cx('login')}>
                    Bạn đã có tài khoản? <Link to={config.routes.login}>Đăng nhập</Link>
                </div>
            </form>
            <div className={cx('register-image')}>
                <img src={images.register} alt='register' />
            </div>
        </div>
    )
}

export default Register
