import { Icon } from '@iconify/react'
import classNames from 'classnames/bind'

import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import styles from './AccountAddresses.module.scss'
import useAccount from '~/hooks/useAccount'
import toast from 'react-hot-toast'

const cx = classNames.bind(styles)

function AccountAddresses() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [mode, setMode] = useState('add')
    const [data, setData] = useState({
        id: '',
        name: '',
        email: '',
        phone_number: '',
        specific_address: ''
    })
    const [error, setError] = useState({
        name: '',
        phone_number: '',
        email: '',
        specific_address: ''
    })
    const [allAddress, setAllAddress] = useState([])
    const { getAllAddress, createNewAddress, updateAddress, deleteAddress } = useAccount()

    useEffect(() => {
        fetchAllAddress()
    }, [])

    const fetchAllAddress = async () => {
        const { result } = await getAllAddress()
        setAllAddress(result)
    }

    const handleShowModal = (mode) => {
        setIsModalOpen(true)
        setMode(mode)
    }

    const handleOk = async () => {
        let result = {}
        if (mode === 'add') {
            result = await createNewAddress(data)
        } else if (mode === 'edit') {
            result = await updateAddress(data)
        } else {
            result = await deleteAddress(data._id)
        }

        if (!result.success) {
            setError(result.errors)
            return
        }

        await fetchAllAddress()
        toast.success(result.message)
        setIsModalOpen(false)
        setData({
            name: '',
            email: '',
            phone_number: '',
            specific_address: ''
        })
        setError({
            name: '',
            phone_number: '',
            email: '',
            specific_address: ''
        })
    }

    const handleCancel = () => {
        setData({
            name: '',
            email: '',
            phone_number: '',
            specific_address: ''
        })
        setIsModalOpen(false)
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

    const handleClickEditAddress = (item) => {
        setMode('edit')
        setData(item)
        setIsModalOpen(true)
    }

    const handleClickDeleteAddress = (item) => {
        setMode('delete')
        setData(item)
        setIsModalOpen(true)
    }
    return (
        <div className='my-8 h-full'>
            <h2 className='font-semibold text-4xl'>Sổ địa chỉ</h2>
            {/* Show modal */}
            <button
                onClick={() => handleShowModal('add')}
                className='block w-full py-8 bg-gray-50 border-dashed border-2 border-gray-300 mt-4 rounded-md hover:opacity-80'
            >
                <p className='flex gap-2 justify-center'>
                    <span>
                        <Icon
                            style={{
                                fontSize: 18
                            }}
                            icon='mdi-light:plus'
                        />
                    </span>
                    <span className='text-blue-600'>Thêm địa chỉ mới</span>
                </p>
            </button>

            {/* Address list */}
            {allAddress.map((item) => (
                <div key={item._id} className='bg-gray-50 p-4 mt-4 rounded-md'>
                    <div className='flex justify-between'>
                        <div>
                            <div className='flex items-center gap-4'>
                                <h3 className=''>{item.name}</h3>
                                {item.default && (
                                    <span className='text-blue-900 px-4 text-[14px] py-1 bg-gray-50 shadow'>
                                        Mặc định
                                    </span>
                                )}
                            </div>

                            <div>
                                <p className='text-[14px] my-2 text-gray-400'>Địa chỉ: {item.specific_address}</p>
                                <p className='text-[14px] my-2 text-gray-400'>Điện thoại: {item.phone_number}</p>
                            </div>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <button
                                onClick={() => handleClickEditAddress(item)}
                                className='border-solid text-blue-600 text-[14px] border-blue-600 p-2 px-4 rounded-md'
                            >
                                Chỉnh sửa
                            </button>
                            {!item.default && (
                                <button
                                    onClick={() => handleClickDeleteAddress(item)}
                                    className='border-solid text-red-600 text-[14px] border-red-600 p-2 px-4 rounded-md'
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal edit */}
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className='custom-modal'
                okButtonProps={{
                    style: {
                        backgroundColor: '#1677ff'
                    }
                }}
            >
                {mode !== 'delete' ? (
                    <div className={cx('wrapper')}>
                        <form className={cx('form-address')}>
                            <h2 className='font-semibold text-4xl my-2'>
                                {mode === 'add' ? 'Thêm địa chỉ' : 'Cập nhật địa chỉ'}
                            </h2>

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
                        </form>
                    </div>
                ) : (
                    <p className='text-2xl font-semibold'>Bạn chắc chắn muốn xóa địa chỉ này?</p>
                )}
            </Modal>
        </div>
    )
}

export default AccountAddresses
