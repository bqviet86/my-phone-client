import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import HeadlessTippy from '@tippyjs/react/headless'
import toast from 'react-hot-toast'

import useDebounce from '~/hooks/useDebounce'
import api from '~/utils/api'
import formatPrice from '~/utils/formatPrice'
import styles from './CartItem.module.scss'
import 'tippy.js/dist/tippy.css'

const cx = classNames.bind(styles)

function CartItem({ data, checked, carts, setCarts, cartsChecked, setCartsChecked, showDeleteCartModal }) {
    const [currentOption, setCurrentOption] = useState(data.phone_option)
    const [colorActive, setColorActive] = useState(data.phone_option.color)
    const [capacityActive, setCapacityActive] = useState(data.phone_option.capacity)
    const [quantity, setQuantity] = useState(data.quantity)
    const tippyInstance = useRef(null)
    const options = data.phone.options

    const debouncedQuantity = useDebounce(quantity, 700)

    const handleSetColorsAndCapacities = (options, type) => {
        const newState = []

        options.forEach((option) => {
            if (!newState.includes(option[type])) {
                newState.push(option[type])
            }
        })

        return newState
    }

    const colors = handleSetColorsAndCapacities(data.phone.options, 'color')
    const capacities = handleSetColorsAndCapacities(data.phone.options, 'capacity')

    const handleChangeCheckbox = (e) => {
        if (e.target.checked) {
            setCartsChecked([...cartsChecked, e.target.value])
        } else {
            setCartsChecked([...cartsChecked.filter((cartId) => cartId !== e.target.value)])
        }
    }

    const handleUpdateCart = async ({ newCurrentOption = data.phone_option, newQuantity = data.quantity }) => {
        try {
            const response = await api.patch(`/carts/${data._id}`, {
                phone_option_id: newCurrentOption._id,
                quantity: newQuantity
            })

            setCurrentOption(newCurrentOption)
            setQuantity(newQuantity)

            tippyInstance.current._tippy.hide()

            setColorActive(newCurrentOption.color)
            setCapacityActive(newCurrentOption.capacity)
            setCarts(
                carts.map((cart) => {
                    if (cart._id === data._id) {
                        return {
                            ...cart,
                            phone_option: newCurrentOption,
                            quantity: newQuantity,
                            total_price: newCurrentOption.price * newQuantity
                        }
                    }

                    return cart
                })
            )

            toast.success(response.data.message)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        if (debouncedQuantity === data.quantity || !debouncedQuantity) {
            return
        }

        handleUpdateCart({ newQuantity: debouncedQuantity })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuantity])

    const handleUpdateOption = () => {
        const newCurrentOption = options.find(
            (option) => option.color === colorActive && option.capacity === capacityActive
        )

        handleUpdateCart({ newCurrentOption })
    }

    const handleUpdateQuantity = (value) => {
        if (value < 1) {
            return
        }

        setQuantity(value)
    }

    const handleChangeQuantity = (e) => {
        const value = Number(e.target.value)

        if (/^[0-9]*$/.test(e.target.value) && value !== 0) {
            setQuantity(value)
        }

        if (e.target.value === '') {
            setQuantity('')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('check')}>
                <input
                    type='checkbox'
                    id={data._id}
                    name={data.phone.name}
                    checked={checked}
                    value={data._id}
                    onChange={handleChangeCheckbox}
                />
            </div>

            <div className={cx('product')}>
                <Link to={`/phone/${data.phone._id}`} className={cx('image')}>
                    <img
                        src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${currentOption.images[0]}`}
                        alt={data.phone.name}
                    />
                </Link>
                <div className={cx('info')}>
                    <Link to={`/phone/${data.phone._id}`} className={cx('name')}>
                        {data.phone.name}
                    </Link>
                    <p>
                        <span>Màu: </span>
                        {currentOption.color}
                    </p>
                    <p>
                        <span>Dung lượng: </span>
                        {currentOption.capacity}
                    </p>
                </div>
            </div>

            <div className={cx('options')}>
                <HeadlessTippy
                    ref={tippyInstance}
                    arrow
                    interactive
                    hideOnClick
                    trigger='click'
                    placement='bottom'
                    offset={[0, 12]}
                    onHide={() => {
                        setColorActive(currentOption.color)
                        setCapacityActive(currentOption.capacity)
                    }}
                    render={(attrs) => (
                        <div className={cx('options-tippy')} data-popper-placement='bottom' tabIndex='-1' {...attrs}>
                            <div className={cx('buttons-list')}>
                                <p className={cx('text')}>MÀU SẮC: </p>
                                {colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className={cx('button', {
                                            active: color === colorActive
                                        })}
                                        onClick={() => setColorActive(color)}
                                    >
                                        {color}
                                    </div>
                                ))}
                            </div>

                            <div className={cx('buttons-list')}>
                                <p className={cx('text')}>DUNG LƯỢNG: </p>
                                {capacities.map((capacity, index) => (
                                    <div
                                        key={index}
                                        className={cx('button', {
                                            active: capacity === capacityActive
                                        })}
                                        onClick={() => setCapacityActive(capacity)}
                                    >
                                        {capacity}
                                    </div>
                                ))}
                            </div>

                            <div className={cx('update-option-btn')} onClick={handleUpdateOption}>
                                Xác nhận
                            </div>

                            <div className={cx('arrow')} data-popper-arrow></div>
                        </div>
                    )}
                >
                    <div className={cx('choose-wrap')}>
                        <div className={cx('choose-option')}>
                            <p>
                                <span>Màu: </span>
                                {currentOption.color}
                            </p>
                            <p>
                                <span>Dung lượng: </span>
                                {currentOption.capacity}
                            </p>
                        </div>
                        <Icon icon='ph:caret-down-fill' />
                    </div>
                </HeadlessTippy>
            </div>

            <div className={cx('price')}>
                <span>{formatPrice(currentOption.price)}</span>
                <span>{formatPrice(currentOption.price_before_discount)}</span>
            </div>

            <div className={cx('quantity')}>
                <div className={cx('change-quantity')}>
                    <button onClick={() => handleUpdateQuantity(quantity - 1)}>-</button>
                    <input
                        className={cx('quantity-input')}
                        value={quantity}
                        onChange={handleChangeQuantity}
                        onBlur={() => quantity === '' && setQuantity(data.quantity)}
                    />
                    <button onClick={() => handleUpdateQuantity(quantity + 1)}>+</button>
                </div>
                <div className={cx('delete-btn')} onClick={() => showDeleteCartModal(data._id)}>
                    Xóa
                </div>
            </div>

            <div className={cx('total-price')}>
                <p>
                    {formatPrice(
                        debouncedQuantity
                            ? currentOption.price * debouncedQuantity
                            : currentOption.price * data.quantity
                    )}
                </p>
            </div>
        </div>
    )
}

export default CartItem
