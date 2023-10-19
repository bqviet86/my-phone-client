import classNames from 'classnames/bind'
// import { useEffect, useState } from 'react'
import formatPrice from '~/utils/formatPrice'
import styles from './CartSingle.module.scss'
import HeadlessTippy from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
const cx = classNames.bind(styles)

function CartSingle({ cart }) {
    console.log(cart.phone.options)

    // carts.cart?.map((cart) => {
    //     const getcolor = cart.phone.options.map((option) => {
    //         console.log(option.color)
    //     })
    //     console.log(cart.phone.options)
    // })

    return (
        <>
            <div className={cx('cart-detail')}>
                <div className={cx('cart-detail-infor')}>
                    <div className={cx('cart-detail-right')}>
                        <img
                            className={cx('cart-detail-imgage-src')}
                            src={`http://localhost:8000/static/image/${cart.phone_option.images[0]}`}
                            alt={cart.phone.name}
                        />
                    </div>
                    <div className={cx('cart-detail-left')}>
                        <div className={cx('cart-detail-imgage-name')}>{cart.phone.name}</div>
                        <div className={cx('cart-detail-imgage-brand')}>{cart.phone.brand.name}</div>
                        <HeadlessTippy
                            interactive
                            placement='bottom'
                            render={(attrs) => (
                                <div className={cx('option')} tabIndex='-1'>
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
                                                    <button className={cx('button')}>{color}</button>
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
                                                <div key={index}>
                                                    {' '}
                                                    <button>{capacity}</button>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx('cart-detail-selected')}>
                                <button className={cx('button')}>
                                    <div>
                                        {cart.phone_option.color} - {cart.phone_option.capacity}
                                    </div>
                                    <div></div>
                                </button>
                            </div>
                        </HeadlessTippy>
                    </div>
                </div>

                <div className={cx('cart-detail-quantity')}>
                    <button>-</button>
                    <input value={cart.quantity} />
                    <button>+</button>
                </div>
                <div className={cx('cart-detail-price')}>
                    <p>{formatPrice(cart.phone_option.price)}</p>
                </div>
                <div className={cx('cart-detail-total')}>
                    <p>{formatPrice(cart.total_price)}</p>
                </div>
            </div>

            {/* <div className={cx('infor')}>
                <p>
                    {cart.phone
                        ? cart.phone.name.length > 30
                            ? cart.phone.name.slice(0, 25) + '...'
                            : cart.phone.name
                        : ''}
                </p>
                <p>{cart.phone.brand.name}</p>

                <div className={cx('infor-option')}>
                    <button className={cx('infor-option-btn')}>
                        <div className={cx('options')}>
                            <div className={cx('buttons-wrap')}>
                                <div className={cx('buttons-list')}>
                                    <p className={cx('text')}>MÀU SẮC: {cart.phone.options.color}</p>

                                    {cart?.map((cart, index) => (
                                        <div
                                            key={index}
                                            className={cx('button', {
                                                active: cart.color === cart.color
                                            })}
                                            onClick={() => handleSetCurrentOption(cart.color, 'color')}
                                        >
                                            {cart.color}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={cx('buttons-wrap')}>
                                <p className={cx('text')}>DUNG LƯỢNG (ROM): {cartOption.capacity}</p>
                                <div className={cx('buttons-list')}>
                                    {cartOption.capacities.map((capacity, index) => (
                                        <div
                                            key={index}
                                            className={cx('button', {
                                                active: capacity === cartOption.capacity
                                            })}
                                            onClick={() => handleSetCurrentOption(capacity, 'capacity')}
                                        >
                                            {capacity}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                <button>
                    <p>{cart.phone_option.color}</p>
                    <p>{cart.phone_option.capacity}</p>
                </button>
            </div> */}
        </>
    )
}

export default CartSingle
