import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { Select } from 'antd'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import toast from 'react-hot-toast'

import PhoneOptionList from '../PhoneOptionList'
import api from '~/utils/api'
import styles from './PhoneForm.module.scss'
import 'react-markdown-editor-lite/lib/index.css'

const cx = classNames.bind(styles)

const mdParser = new MarkdownIt()
const initialDataPhone = {
    name: '',
    brand: '',
    image: '',
    options: [],
    description: '',
    screen_type: '',
    resolution: '',
    operating_system: '',
    memory: '',
    chip: '',
    battery: '',
    rear_camera: '',
    front_camera: '',
    wifi: '',
    jack_phone: '',
    size: '',
    weight: ''
}

function PhoneForm({ data, mode, phones, setPhones, setIsShowForm }) {
    const [dataPhone, setDataPhone] = useState(initialDataPhone)
    const [brands, setBrands] = useState([])
    const [selectedBrand, setSelectedBrand] = useState('Chọn thương hiệu')
    const [uploadImageValue, setUploadImageValue] = useState('Chọn ảnh')
    const [selectedImage, setSelectedImage] = useState('')
    const [options, setOptions] = useState([])

    const clearForm = () => {
        setDataPhone(initialDataPhone)
        setSelectedBrand('')
        setUploadImageValue('Chọn ảnh')
        setSelectedImage('')
        setOptions([])
    }

    useEffect(() => {
        if (data) {
            setDataPhone(data)
            setSelectedBrand(data.brand._id)
            setSelectedImage(`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${data.image}`)
            setOptions(data.options)

            return
        }

        clearForm()
    }, [data])

    useEffect(() => {
        // Gọi API để lấy danh sách các brand
        const getBrands = async () => {
            try {
                const response = await api.get('/brands')

                setBrands(response.data.result)
            } catch (error) {
                console.error('Lỗi khi lấy danh sách brand: ', error.response?.data)
            }
        }

        getBrands()
    }, [])

    const handleSetValue = (e) => {
        setDataPhone((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleUploadImage = async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()

        formData.append('image', file)

        try {
            const response = await api.post('/medias/upload-image', formData)

            setUploadImageValue(response.data.message)
            setSelectedImage(response.data.result[0].url)
        } catch (error) {
            setUploadImageValue(error.response?.data.message)
        }
    }

    const handleUploadImageMdEditor = (file) => {
        return new Promise(async (resolve) => {
            const formData = new FormData()

            formData.append('image', file)

            try {
                const response = await api.post('/medias/upload-image', formData)

                resolve(response.data.result[0].url)
            } catch (error) {
                console.error('Lỗi khi upload ảnh: ', error.response?.data)
            }
        })
    }

    const handleSubmitDataPhone = async (event) => {
        event.preventDefault()

        // Chuẩn bị dữ liệu để gửi lên API
        const dataToSend = {
            ...dataPhone,
            brand: selectedBrand,
            image: selectedImage.split('/').slice(-1)[0],
            options: options.map((option) => option._id)
        }

        console.log('dataPhoneToSend', dataToSend)

        // Gọi API để tạo điện thoại mới hoặc cập nhật điện thoại
        try {
            let response = {}
            let updateResponse = {}

            if (mode === 'add') {
                response = await api.post('/phones', dataToSend)
            }

            if (mode === 'update') {
                updateResponse = await api.patch(`/phones/${dataPhone._id}`, dataToSend)
                response = await api.get(`/phones/${dataPhone._id}`)
            }

            // Clear form
            clearForm()

            // Cập nhật lại danh sách điện thoại
            const newPhones = [...phones]
            const index = newPhones.findIndex((phone) => phone._id === response.data.result._id)

            // Nếu không tìm thấy thì thêm mới
            if (index === -1) {
                newPhones.unshift(response.data.result)
            }

            // Nếu tìm thấy thì cập nhật
            if (index !== -1) {
                newPhones[index] = response.data.result
            }

            // Cập nhật lại danh sách điện thoại
            setPhones(newPhones)

            // Đóng form
            setIsShowForm(false)

            // Thông báo thành công
            toast.success((mode === 'add' ? response : updateResponse).data.message)
        } catch (error) {
            console.error('Lỗi khi tạo/cập nhật điện thoại: ', error.response)
            toast.error(error.response?.data.message)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap')}>
                <form className={cx('form')} onSubmit={handleSubmitDataPhone}>
                    <h4>Tên điện thoại</h4>
                    <input
                        name='name'
                        spellCheck='false'
                        value={dataPhone.name}
                        onChange={(e) => handleSetValue(e, setDataPhone)}
                    />

                    <h4>Thương hiệu</h4>
                    <Select
                        className={cx('select')}
                        defaultValue={selectedBrand}
                        onChange={(value) => setSelectedBrand(value)}
                        dropdownStyle={{ backgroundColor: '#1f2937' }}
                    >
                        {brands.map((brand) => (
                            <Select.Option key={brand._id} className={cx('select-option')} value={brand._id}>
                                {brand.name}
                            </Select.Option>
                        ))}
                    </Select>

                    <h4>Hình ảnh</h4>
                    <input
                        type='file'
                        id='img_phone'
                        accept='image/*'
                        multiple={false}
                        className={cx('input-file')}
                        onChange={handleUploadImage}
                    />
                    <label htmlFor='img_phone'>{uploadImageValue}</label>
                    {selectedImage && (
                        <div className={cx('images-wrap')}>
                            <img src={selectedImage} alt='Selected' />
                        </div>
                    )}

                    <h4>Thêm options cho điện thoại</h4>
                    <PhoneOptionList options={options} setOptions={setOptions} />

                    <h4>Mô tả</h4>
                    <MdEditor
                        className={cx('md-editor')}
                        renderHTML={(text) => mdParser.render(text)}
                        value={dataPhone.description}
                        onChange={({ html, text }) => setDataPhone((prev) => ({ ...prev, description: text }))}
                        // imageAccept='image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
                        onImageUpload={handleUploadImageMdEditor}
                    />

                    <h4>Loại màn hình</h4>
                    <input
                        name='screen_type'
                        spellCheck='false'
                        value={dataPhone.screen_type}
                        onChange={handleSetValue}
                    />

                    <h4>Độ phân giải</h4>
                    <input
                        name='resolution'
                        spellCheck='false'
                        value={dataPhone.resolution}
                        onChange={handleSetValue}
                    />

                    <h4>Hệ điều hành</h4>
                    <input
                        name='operating_system'
                        spellCheck='false'
                        value={dataPhone.operating_system}
                        onChange={handleSetValue}
                    />

                    <h4>Ram</h4>
                    <input name='memory' spellCheck='false' value={dataPhone.memory} onChange={handleSetValue} />

                    <h4>Chip</h4>
                    <input name='chip' spellCheck='false' value={dataPhone.chip} onChange={handleSetValue} />

                    <h4>Pin</h4>
                    <input name='battery' spellCheck='false' value={dataPhone.battery} onChange={handleSetValue} />

                    <h4>Camera sau</h4>
                    <input
                        name='rear_camera'
                        spellCheck='false'
                        value={dataPhone.rear_camera}
                        onChange={handleSetValue}
                    />

                    <h4>Camera trước</h4>
                    <input
                        name='front_camera'
                        spellCheck='false'
                        value={dataPhone.front_camera}
                        onChange={handleSetValue}
                    />

                    <h4>Wifi</h4>
                    <input name='wifi' spellCheck='false' value={dataPhone.wifi} onChange={handleSetValue} />

                    <h4>Jack tai nghe</h4>
                    <input
                        name='jack_phone'
                        spellCheck='false'
                        value={dataPhone.jack_phone}
                        onChange={handleSetValue}
                    />

                    <h4>Kích thước</h4>
                    <input name='size' spellCheck='false' value={dataPhone.size} onChange={handleSetValue} />

                    <h4>Trọng lượng</h4>
                    <input name='weight' spellCheck='false' value={dataPhone.weight} onChange={handleSetValue} />

                    <button type='submit' className={cx('btn')}>
                        {mode === 'add' ? 'Thêm' : 'Cập nhật'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PhoneForm
