import { useState } from 'react'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'

import Modal from '~/components/Modal'
import useAccount from '~/hooks/useAccount'
import styles from './AddressList.module.scss'

const cx = classNames.bind(styles)

const initialDataAndError = {
    name: '',
    email: '',
    phone_number: '',
    specific_address: ''
}

function AddressList({ addresses, fetchAllAddress, addressChecked, setAddressChecked }) {
    const [mode, setMode] = useState('')
    const [isShowAddressModal, setIsShowAddressModal] = useState(false)
    const [data, setData] = useState(initialDataAndError)
    const [error, setError] = useState(initialDataAndError)

    const { createNewAddress, updateAddress } = useAccount()

    const handleCheckAddress = (address_id) => {
        setAddressChecked(address_id)
    }

    const handleOpenAddressModal = ({ address, mode }) => {
        setIsShowAddressModal(true)
        setMode(mode)

        if (mode === 'add') {
            setData(initialDataAndError)
        }

        if (mode === 'update') {
            setData(address)
        }
    }

    const handleCloseAddressModal = () => {
        setIsShowAddressModal(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setError((prev) => ({ ...prev, [name]: '' }))
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmitAddress = async (e) => {
        e.preventDefault()

        let response = {}

        if (mode === 'add') {
            response = await createNewAddress(data)
        }

        if (mode === 'update') {
            response = await updateAddress(data)
        }

        if (response.success === false) {
            setError(response.errors)
            return
        }

        await fetchAllAddress()
        setIsShowAddressModal(false)

        toast.success(response.message)
    }

    return (
        <>
            <div className={cx('address-list')}>
                {addresses.map((address) => (
                    <div
                        key={address._id}
                        className={cx('address', {
                            checked: addressChecked === address._id
                        })}
                        onClick={() => handleCheckAddress(address._id)}
                    >
                        <div className={cx('heading')}>
                            <p className={cx('name')}>{address.name}</p>
                            <div
                                className={cx('update')}
                                onClick={() => handleOpenAddressModal({ address, mode: 'update' })}
                            >
                                <Icon icon='solar:pen-2-linear' />
                            </div>
                        </div>
                        <p className={cx('phone')} style={{ margin: '6px 0' }}>
                            {address.phone_number}
                        </p>
                        <p className={cx('address-text')} style={{ marginTop: 'auto' }}>
                            {address.specific_address}
                        </p>

                        <div className={cx('checked-block')}>
                            <Icon icon='ic:round-check' />
                        </div>
                    </div>
                ))}

                <div className={cx('address', 'add')} onClick={() => handleOpenAddressModal({ mode: 'add' })}>
                    <Icon icon='ic:round-add' />
                    <p>Thêm địa chỉ</p>
                </div>
            </div>

            <Modal
                width={500}
                title={mode === 'add' ? 'Thêm địa chỉ' : 'Cập nhật địa chỉ'}
                titlePlacement='start'
                showModal={isShowAddressModal}
                closeModal={handleCloseAddressModal}
            >
                <form className={cx('address-form')} onSubmit={handleSubmitAddress}>
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

                    <div className={cx('input-wrap')}>
                        <input
                            spellCheck={false}
                            name='specific_address'
                            placeholder='Địa chỉ cụ thể'
                            value={data.specific_address}
                            onChange={handleChange}
                        />
                        {error.specific_address && <div className={cx('error')}>{error.specific_address}</div>}
                    </div>

                    <button type='submit' className={cx('submit')}>
                        {mode === 'add' ? 'Thêm' : 'Cập nhật'}
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default AddressList
