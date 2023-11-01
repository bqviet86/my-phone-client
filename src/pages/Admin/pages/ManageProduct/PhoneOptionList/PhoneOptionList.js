import { useState } from 'react'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { nanoid } from 'nanoid'

import PhoneOption from '../PhoneOption'
import Modal from '~/components/Modal'
import api from '~/utils/api'
import parsePrice from '~/utils/parsePrice'
import formatPrice from '~/utils/formatPrice'
import styles from './PhoneOptionList.module.scss'

const cx = classNames.bind(styles)

const initialDataPhoneOption = {
    capacity: '',
    color: '',
    price: 0,
    price_before_discount: 0,
    quantity: 0,
    images: []
}

function PhoneOptionList({ options, setOptions }) {
    const [dataPhoneOption, setDataPhoneOption] = useState(initialDataPhoneOption)
    const [showOptionForm, setShowOptionForm] = useState(false)
    const [uploadImageValueOption, setUploadImageValueOption] = useState('Chọn ảnh')
    const [selectedImageOption, setSelectedImageOption] = useState([])
    const [mode, setMode] = useState('')
    const [deleteOptionId, setDeleteOptionId] = useState('')

    const handleSetValue = (e) => {
        let { name, value } = e.target

        if (name === 'price' || name === 'price_before_discount') {
            value = parsePrice(value)
        }

        if (name === 'quantity') {
            value = Number(value)
        }

        setDataPhoneOption((prev) => ({ ...prev, [name]: value }))
    }

    const handleShowOptionForm = ({ phone_option, mode }) => {
        setShowOptionForm(true)
        setMode(mode)

        if (mode === 'add') {
            setDataPhoneOption(initialDataPhoneOption)
            setUploadImageValueOption('Chọn ảnh')
            setSelectedImageOption([])
        }

        if (mode === 'update') {
            setDataPhoneOption(phone_option)
            setUploadImageValueOption('Chọn ảnh')
            setSelectedImageOption(
                phone_option.images.map((image) => ({
                    id: nanoid(),
                    url: `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${image}`
                }))
            )
        }

        if (mode === 'delete') {
            setDeleteOptionId(phone_option._id)
        }
    }

    const handleUploadImageOption = async (event) => {
        const files = event.target.files
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i])
        }

        try {
            const response = await api.post('/medias/upload-image', formData)

            setUploadImageValueOption(response.data.message)
            setSelectedImageOption(response.data.result.map((image) => ({ ...image, id: nanoid() })))
        } catch (error) {
            setUploadImageValueOption(error.response?.data?.message || '')
        }
    }

    const handleSubmitDataPhoneOption = async (event) => {
        event.preventDefault()

        // Chuẩn bị dữ liệu để gửi lên API
        const dataToSend = {
            ...dataPhoneOption,
            images: selectedImageOption.map((image) => image.url.split('/').slice(-1)[0])
        }

        console.log('dataPhoneOptionToSend', dataToSend)

        // Gọi API để tạo option mới, cập nhật option hoặc xóa option
        try {
            let response = {}

            if (mode === 'add') {
                response = await api.post('/phones/options', dataToSend)
                setOptions([...options, response.data.result])
            }

            if (mode === 'update') {
                response = await api.patch(`/phones/options/${dataPhoneOption._id}`, dataToSend)
                setOptions(
                    options.map((option) => {
                        if (option._id === dataPhoneOption._id) {
                            return response.data.result
                        }

                        return option
                    })
                )
            }

            // Đóng modal
            setShowOptionForm(false)

            // Thông báo thành công
            toast.success(response.data.message)
        } catch (error) {
            console.error('Lỗi khi tạo/cập nhật option: ', error.response)
            toast.error(error.response?.data.message)
        }
    }

    const handleDeletePhoneOption = async () => {
        try {
            const response = await api.delete(`/phones/options/${deleteOptionId}`)

            setOptions(options.filter((option) => option._id !== deleteOptionId))
            setShowOptionForm(false)
            toast.success(response.data.message)
        } catch (error) {
            console.error('Lỗi khi xóa option: ', error.response)
        }
    }

    return (
        <>
            <div className={cx('phone-option')}>
                {options.map((option) => (
                    <PhoneOption key={option._id} data={option} handleShowOptionForm={handleShowOptionForm} />
                ))}
                <div className={cx('add-option-btn')} onClick={() => handleShowOptionForm({ mode: 'add' })}>
                    <Icon icon='ic:round-add' />
                    <p>Thêm option</p>
                </div>
            </div>

            <Modal
                width={mode !== 'delete' ? 600 : 400}
                height={mode !== 'delete' ? 'calc(100% - 60px)' : 'auto'}
                bgColor='#111827'
                textColor='#9ca3af'
                closeBtnColor='#9ca3af'
                title={mode === 'add' ? 'Thêm option' : mode === 'update' ? 'Cập nhật option' : 'Xóa option'}
                showModal={showOptionForm}
                closeModal={() => setShowOptionForm(false)}
            >
                {mode !== 'delete' ? (
                    <div className={cx('form', 'options')}>
                        <div className={cx('form-group')}>
                            <h4>Dung lượng</h4>
                            <input
                                name='capacity'
                                spellCheck='false'
                                value={dataPhoneOption.capacity}
                                onChange={handleSetValue}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <h4>Màu sắc</h4>
                            <input
                                name='color'
                                spellCheck='false'
                                value={dataPhoneOption.color}
                                onChange={handleSetValue}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <h4>Giá</h4>
                            <input
                                name='price'
                                spellCheck='false'
                                value={formatPrice(dataPhoneOption.price, false)}
                                onChange={handleSetValue}
                            />
                            <span>Đơn vị: VND</span>
                        </div>

                        <div className={cx('form-group')}>
                            <h4>Giá gốc</h4>
                            <input
                                name='price_before_discount'
                                spellCheck='false'
                                value={formatPrice(dataPhoneOption.price_before_discount, false)}
                                onChange={handleSetValue}
                            />
                            <span>Đơn vị: VND</span>
                        </div>

                        <div className={cx('form-group')}>
                            <h4>Số lượng</h4>
                            <input
                                name='quantity'
                                spellCheck='false'
                                value={dataPhoneOption.quantity}
                                onChange={handleSetValue}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <h4>Hình ảnh</h4>
                            <input
                                type='file'
                                id='img_phone_option'
                                accept='image/*'
                                multiple='multiple'
                                className={cx('input-file')}
                                onChange={handleUploadImageOption}
                            />
                            <label htmlFor='img_phone_option'>{uploadImageValueOption}</label>
                            <div className={cx('images-wrap')}>
                                {selectedImageOption.map((image) => (
                                    <img key={image.id} src={image.url} alt='Selected' />
                                ))}
                            </div>
                        </div>

                        <div className={cx('btn', 'btn-create')} onClick={handleSubmitDataPhoneOption}>
                            {mode === 'add' ? 'Thêm' : 'Cập nhật'}
                        </div>
                    </div>
                ) : (
                    <div className={cx('form', 'options')}>
                        <h4>Bạn có chắc chắn muốn xóa option này?</h4>
                        <div className={cx('btn', 'btn-delete')} onClick={handleDeletePhoneOption}>
                            Xóa
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default PhoneOptionList
