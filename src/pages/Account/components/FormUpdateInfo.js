import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAccount from '~/hooks/useAccount'
import styles from '../Account.module.scss'

const cx = classNames.bind(styles)
const Sex = {
    male: 0,
    female: 1
}
const FormUpdateInfo = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        sex: Sex.male
    })
    const [error, setError] = useState({
        name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        sex: ''
    })

    const { changeInformation, getInformation } = useAccount()

    useEffect(() => {
        fetchInformation()
    }, [])

    const fetchInformation = async () => {
        const { result } = await getInformation()
        const { name, email, phone_number, date_of_birth, sex } = result
        const birthDate = new Date(date_of_birth)
        const year = birthDate.getFullYear()
        const month = birthDate.getMonth() + 1
        const day = birthDate.getDate()

        const birthdayString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        setData({
            name,
            email,
            phone_number,
            date_of_birth: birthdayString,
            sex
        })
    }

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
        const result = await changeInformation(dataToSend)

        if (!result.success) {
            setError(result.errors)
            return
        }

        toast.success(result.message)
    }

    return (
        <div className='my-8 h-full'>
            <div className={cx('wrapper')}>
                <form className={cx('change-infomation-form')} onSubmit={handleSubmit}>
                    <h2 className='font-semibold text-4xl my-2'>Thông tin tài khoản</h2>

                    <div className={cx('input-wrap')}>
                        <input
                            spellCheck={false}
                            name='name'
                            placeholder='Họ và tên'
                            value={data.name}
                            onChange={handleChange}
                        />
                        {error.name && <div className={cx('error')}>{error.name}</div>}
                    </div>

                    <div className={cx('input-wrap')}>
                        <input
                            spellCheck={false}
                            name='email'
                            placeholder='Email'
                            value={data.email}
                            onChange={handleChange}
                        />
                        {error.email && <div className={cx('error')}>{error.email}</div>}
                    </div>

                    <div className={cx('input-wrap')}>
                        <input
                            spellCheck={false}
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
                            spellCheck={false}
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
                                spellCheck={false}
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
                                spellCheck={false}
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
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
    )
}
export default FormUpdateInfo
