import classNames from 'classnames/bind'
import formatPrice from '~/utils/formatPrice'
import styles from './CartSingle.module.scss'
import HeadlessTippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import { useEffect, useState } from 'react'
import api from '~/utils/api'
import { toast } from 'react-hot-toast'
const cx = classNames.bind(styles)

function CartSingle({ cart }) {

    const [options, setOptions] = useState([])
    const [currentOption, setCurrentOption] = useState({})
    const [quantity, setQuantity] = useState(cart.quantity)

    const id = cart._id


    console.log(cart.phone_option)
    useEffect(() => {
        setOptions(cart.phone.options)
        setCurrentOption(cart.phone_option)
        setQuantity(quantity)
    }, [quantity])

    const handleSetCurrentOption = (value, type) => {
        const { color, capacity } = currentOption
        const newOption = { color, capacity, [type]: value }
        const newCurrentOption = options.find((option) => {
            return option.color === newOption.color && option.capacity === newOption.capacity
        })

        setCurrentOption(newCurrentOption)
    }

    const updateOption = (id, phone_option_id, quantity) => {
        const data = {
            phone_option_id: phone_option_id,
            quantity: quantity
        }
        api.patch(`/carts/${id}`, data)
            .then((res) => {
                // toast.success('Cập nhật thành công')
                setTimeout(function() {
                    // Reload trang sau khi đã chờ trong 3 giây
                    toast.success('Cập nhật thành công')
                    window.location.reload();
                  }, 2000)
            })
            .catch((err) => {
                console.error('Lỗi khi cập nhật giỏ hàng:', err)
            })
    }
    
    const handleIncrease = () => {
        setQuantity(quantity + 1)
        updateOption(id, currentOption._id, quantity + 1)
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
            updateOption(id, currentOption._id, quantity - 1)
        }
    }

    const handleDeteleCart = (id) => {
        api.delete(`/carts/${id}`)
            .then((res) => {
                // toast.success('Xóa sản phẩm thành công')

                setTimeout(function() {
                    // Reload trang sau khi đã chờ trong 3 giây
                    toast.success('Xóa sản phẩm thành công')
                    window.location.reload();
                  }, 2000)
            })
            .catch((err) => {
                console.error('Lỗi khi cập nhật giỏ hàng:', err)
            })
    }
    
    return (
        <>
            <div className={cx('cart-detail')}>
                <div className={cx('cart-detail-infor')}>
                    <div className={cx('cart-detail-right')}>
                        <img
                            className={cx('cart-detail-image-src')}
                            src={`http://localhost:8000/static/image/${
                                currentOption && currentOption.images && currentOption.images[0]
                                    ? currentOption.images[0]
                                    : ''
                            }`}
                            alt={cart.phone.name}
                        />
                    </div>
                    <div className={cx('cart-detail-left')}>
                        <div className={cx('cart-detail-image-name')}>{cart.phone.name}</div>
                        <div className={cx('cart-detail-image-brand')}>{cart.phone.brand.name}</div>
                        <HeadlessTippy
                            interactive
                            placement='bottom'
                            render={(attrs) => (
                                <div className={cx('option')} tabIndex='-1' {...attrs}>
                                    <div className={cx('option-color')}>
                                        <p className={cx('color')}>Màu: </p>
                                        {cart.phone.options
                                            .reduce((uniqueColors, option) => {
                                                if (!uniqueColors.includes(option.color)) {
                                                    uniqueColors.push(option.color)
                                                }
                                                return uniqueColors
                                            }, [])
                                            .map((color, index) => (
                                                <div key={index} className={cx('color-btn')}>
                                                    <button
                                                        index={index}
                                                        className={cx('button', {
                                                            active: color === currentOption.color
                                                        })}
                                                        onClick={() => handleSetCurrentOption(color, 'color')}
                                                    >
                                                        {color}
                                                    </button>
                                                </div>
                                            ))}
                                    </div>
                                    <div className={cx('option-capacity')}>
                                        <p className={cx('capacity')}>Dung lượng: </p>
                                        {cart.phone.options
                                            .reduce((uniqueCapacity, option) => {
                                                if (!uniqueCapacity.includes(option.capacity)) {
                                                    uniqueCapacity.push(option.capacity)
                                                }
                                                return uniqueCapacity
                                            }, [])
                                            .map((capacity, index) => (
                                                <div key={index} className={cx('capacity-btn')}>
                                                    <button
                                                        index={index}
                                                        className={cx('button', {
                                                            active: capacity === currentOption.capacity
                                                        })}
                                                        onClick={() => handleSetCurrentOption(capacity, 'capacity')}
                                                    >
                                                        {capacity}
                                                    </button>
                                                </div>
                                            ))}
                                    </div>
                                    <div className={cx('option-confirm')}>
                                        <button
                                            className={cx('button')}
                                            onClick={() => updateOption(id, currentOption._id, quantity)}
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx('cart-detail-selected')}>
                                <button className={cx('button')}>
                                    <div>
                                        {currentOption.color} - {currentOption.capacity}
                                    </div>
                                    <svg
                                        className={cx('edit')}
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke-width='1.5'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                        />
                                    </svg>
                                    <div></div>
                                </button>
                            </div>
                        </HeadlessTippy>
                    </div>
                </div>
                <div className={cx('cart-detail-quantity')}>
                    <div className={cx('quantity')}>
                        <button onClick={handleDecrease}>-</button>
                        <input value={quantity} />
                        <button onClick={handleIncrease}>+</button>
                    </div>
                    <div className={cx('remove')} onClick={() => handleDeteleCart(id)}>
                        <p>Xóa</p>
                    </div>
                </div>
                <div className={cx('cart-detail-price')}>
                    <p>{formatPrice(cart.phone_option.price)}</p>
                </div>
                <div className={cx('cart-detail-total')}>
                    <p>{formatPrice(cart.phone_option.price * quantity)}</p>
                </div>
            </div>
        </>
    )
}

export default CartSingle
