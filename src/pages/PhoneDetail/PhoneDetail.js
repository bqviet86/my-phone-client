import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames/bind'
import { toast } from 'react-hot-toast'

import PhoneImage from './PhoneImage'
import PhoneInfoTable from './PhoneInfoTable'
import Modal from '~/components/Modal'
import images from '~/assets/images'
import config from '~/config'
import api from '~/utils/api'
import handleError from '~/utils/error'
import formatPrice from '~/utils/formatPrice'
import styles from './PhoneDetail.module.scss'

const cx = classNames.bind(styles)

function PhoneDetail() {
    const { phone_id } = useParams()
    const navigate = useNavigate()

    const [phone, setPhone] = useState()
    const [options, setOptions] = useState([])
    const [currentOption, setCurrentOption] = useState({})
    const [colors, setColors] = useState([])
    const [capacities, setCapacities] = useState([])
    const [isShowTable, setIsShowTable] = useState(false)

    const handleSetColorsAndCapacities = (options, type) => {
        const newState = []

        options.forEach((option) => {
            if (!newState.includes(option[type])) {
                newState.push(option[type])
            }
        })

        return newState
    }

    useEffect(() => {
        const getPhone = async () => {
            try {
                const response = await api.get(`/phones/${phone_id}`)

                setPhone(response.data.result)
                setOptions(response.data.result.options)
                setCurrentOption(response.data.result.options[0])
                setColors(handleSetColorsAndCapacities(response.data.result.options, 'color'))
                setCapacities(handleSetColorsAndCapacities(response.data.result.options, 'capacity'))
            } catch (error) {
                console.log(error.response)
            }
        }

        getPhone()
    }, [phone_id])

    const handleSetCurrentOption = (value, type) => {
        const { color, capacity } = currentOption
        const newOption = { color, capacity, [type]: value }
        const newCurrentOption = options.find((option) => {
            return option.color === newOption.color && option.capacity === newOption.capacity
        })

        setCurrentOption(newCurrentOption)
    }

    const handleAddToCart = async () => {
        try {
            const response = await api.post('/carts', {
                phone_id: phone._id,
                phone_option_id: currentOption._id,
                quantity: 1
            })
            const cart_id = response.data.result._id

            toast.success(response.data.message)

            return cart_id
        } catch (error) {
            toast(handleError(error), { icon: '😢' })

            return null
        }
    }

    const handleShowTable = () => {
        setIsShowTable(true)
    }

    const handleCloseTable = () => {
        setIsShowTable(false)
    }

    return (
        <div className={cx('wrapper')}>
            {phone && (
                <>
                    <div className={cx('above')}>
                        <div className={cx('phone')}>
                            <PhoneImage images={currentOption.images} />

                            <div className={cx('info-wrap')}>
                                <h2 className={cx('name')}>{phone.name}</h2>
                                <p className={cx('text')}>
                                    Thương hiệu: {phone.brand.name} | Mã điện thoại: {phone._id}
                                </p>

                                <div className={cx('options')}>
                                    <div className={cx('buttons-wrap')}>
                                        <p className={cx('text')}>MÀU SẮC: {currentOption.color}</p>
                                        <div className={cx('buttons-list')}>
                                            {colors.map((color, index) => (
                                                <div
                                                    key={index}
                                                    className={cx('button', {
                                                        active: color === currentOption.color
                                                    })}
                                                    onClick={() => handleSetCurrentOption(color, 'color')}
                                                >
                                                    {color}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={cx('buttons-wrap')}>
                                        <p className={cx('text')}>DUNG LƯỢNG (ROM): {currentOption.capacity}</p>
                                        <div className={cx('buttons-list')}>
                                            {capacities.map((capacity, index) => (
                                                <div
                                                    key={index}
                                                    className={cx('button', {
                                                        active: capacity === currentOption.capacity
                                                    })}
                                                    onClick={() => handleSetCurrentOption(capacity, 'capacity')}
                                                >
                                                    {capacity}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('price-wrap')}>
                                    <div className={cx('price')}>{formatPrice(currentOption.price)}</div>

                                    <div className={cx('price-before-discount')}>
                                        <span>{formatPrice(currentOption.price_before_discount)}</span>

                                        <span>{`-${(
                                            ((currentOption.price_before_discount - currentOption.price) * 100) /
                                            currentOption.price_before_discount
                                        ).toFixed(2)}%`}</span>
                                    </div>
                                </div>

                                <div className={cx('button-wrap')}>
                                    <button
                                        className={cx('buy-btn')}
                                        onClick={async () => {
                                            const cart_id = await handleAddToCart()

                                            if (cart_id) {
                                                navigate(config.routes.cart, { state: { cart_ids: [cart_id] } })
                                            }
                                        }}
                                    >
                                        MUA NGAY
                                    </button>
                                    <button className={cx('add-to-cart-btn')} onClick={handleAddToCart}>
                                        THÊM VÀO GIỎ HÀNG
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={cx('additional-info')}>
                            <div className={cx('title')}>Chính sách bán hàng</div>
                            <div className={cx('info')}>
                                <img src={images.info_1} alt='info-1' />
                                <p>Miễn phí giao hàng cho đơn hàng từ 5 triệu</p>
                            </div>
                            <div className={cx('info')}>
                                <img src={images.info_2} alt='info-2' />
                                <p>Cam kết hàng chính hãng 100%</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('under')}>
                        <div className={cx('description-wrap')}>
                            <h3 className={cx('title')}>Mô tả sản phẩm</h3>
                            <ReactMarkdown className={cx('description')} children={phone.description} />
                        </div>

                        <div className={cx('info-detail-wrap')}>
                            <PhoneInfoTable
                                title='Thông tin chi tiết'
                                less={true}
                                phone={phone}
                                currentOption={currentOption}
                            />
                            <div className={cx('additional-display')} onClick={handleShowTable}>
                                Xem thêm nội dung
                            </div>
                        </div>

                        <Modal
                            width={600}
                            height='calc(100% - 80px)'
                            title='Thông số kỹ thuật'
                            showModal={isShowTable}
                            closeModal={handleCloseTable}
                        >
                            <PhoneInfoTable phone={phone} currentOption={currentOption} />
                        </Modal>
                    </div>
                </>
            )}
        </div>
    )
}

export default PhoneDetail
