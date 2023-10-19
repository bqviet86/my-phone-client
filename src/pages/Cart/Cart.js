import { useEffect, useState } from 'react'
import api from '~/utils/api'

import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import formatPrice from '~/utils/formatPrice'
import HeadlessTippy from '@tippyjs/react/headless'
import 'tippy.js/dist/backdrop.css'
import CartOption from './CartSingle'
import CartSingle from './CartSingle'

const cx = classNames.bind(styles)

const handleSetColorsAndCapacities = (options, type) => {
    const newState = []

    options.forEach((option) => {
        if (!newState.includes(option[type])) {
            newState.push(option[type])
        }
    })

    return newState
}

function Cart() {
    const [carts, setCarts] = useState([])
    // const [options, setOptions] = useState([])
    // const [currentOption, setCurrentOption] = useState({})
    // const [colors, setColors] = useState([])
    // const [capacities, setCapacities] = useState([])

    useEffect(() => {
        api.get('/carts')
            .then((res) => {
                const carts = res.data.result
                console.log('cart', carts)
                console.log(carts)
                setCarts(carts)
                console.log(carts[0].phone.options)

                carts.forEach((cart, i) => {
                    const options = cart.phone.options
                    console.log('cart.phone.options', cart.phone.options)
                    // setOptions((prevCartOptions) => [...prevCartOptions, options])
                    // setCurrentOption(cart.phone.options[0])
                    // setColors(() => handleSetColorsAndCapacities(cart.phone.options, 'color'))
                    // setCapacities(() => handleSetColorsAndCapacities(cart.phone.options, 'capacity'))
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }, [])

    const totalPriceSum = carts.reduce((accumulator, cart) => accumulator + cart.total_price, 0)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('cart')}>
                    <div className={cx('cart-header')}>
                        <h1 className={cx('cart-header-title')}>Giỏ hàng</h1>
                        <h2 className='font-semibold text-4xl'>{carts.quantity}</h2>
                    </div>
                    <div className={cx('cart-des')}>
                        <h3>Chiết tiết giỏ hàng</h3>
                        <h3>Quantity</h3>
                        <h3>Price</h3>
                        <h3>Total</h3>
                    </div>
                    {carts.map((cart) => (
                        <CartSingle key={cart._id} cart={cart}></CartSingle>
                    ))}
                </div>

                <div className={cx('total')}>
                    <div>
                        <h3>Thanh toán</h3>
                        <div className={cx('temporary')}>
                            <div>
                                <span>Tổng tạm tính</span>
                            </div>
                            <div>{formatPrice(totalPriceSum)}</div>
                        </div>

                        <div className={cx('official')}>
                            <div className={cx('official-lable')}>
                                <span>Thành tiền</span>
                            </div>
                            <div>
                                <div className={cx('official-price')}>{formatPrice(totalPriceSum)}</div>
                                <div className={cx('official-vat')}>
                                    <span>(Đã bao gồm thuế VAT)</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('continue')}>
                            <button>TIẾP TỤC</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
