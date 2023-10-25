import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'

import CartItem from './CartItem'
import Modal from '~/components/Modal'
import images from '~/assets/images'
import api from '~/utils/api'
import formatPrice from '~/utils/formatPrice'
import styles from './Cart.module.scss'

const cx = classNames.bind(styles)

function Cart() {
    const location = useLocation()
    const cartIdChecked = location.state?.cart_id

    const [carts, setCarts] = useState([])
    const [cartsChecked, setCartsChecked] = useState(cartIdChecked ? [cartIdChecked] : [])
    const [totalPrice, setTotalPrice] = useState(0)
    const [isShowDeleteCartModal, setIsShowDeleteCartModal] = useState(false)
    const [cartDeletedId, setCartDeletedId] = useState('')

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await api.get('/carts')

                setCarts(response.data.result)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }

        getCart()
    }, [])

    useEffect(() => {
        setTotalPrice(
            cartsChecked.reduce((total, cartCheckedId) => {
                const cartChecked = carts.find((cart) => cart._id === cartCheckedId)
                const total_price = cartChecked?.total_price || 0

                return total + total_price
            }, 0)
        )
    }, [cartsChecked, carts])

    const handleShowDeleteCartModal = (cart_id) => {
        setIsShowDeleteCartModal(true)
        setCartDeletedId(cart_id)
    }

    const handleCloseDeleteCartModal = () => {
        setIsShowDeleteCartModal(false)
    }

    const handleDeleteCart = async () => {
        try {
            const response = await api.delete(`/carts/${cartDeletedId}`)

            setCarts(carts.filter((cart) => cart._id !== cartDeletedId))
            setCartsChecked(cartsChecked.filter((cartCheckedId) => cartCheckedId !== cartDeletedId))

            toast.success(response.data.message)
        } catch (error) {
            console.log(error.response.data.message)
        }

        setIsShowDeleteCartModal(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('cart')}>
                    <h2 className={cx('cart-header')}>Giỏ hàng</h2>

                    <div className={cx('cart-list')}>
                        <div className={cx('title')}>
                            <span style={{ width: 'calc(40% - 10px)' }}>Sản phẩm</span>
                            <span style={{ width: 'calc(20% - 10px)' }}>Tùy chọn</span>
                            <span style={{ width: 'calc(12.5% - 10px)' }}>Đơn giá</span>
                            <span style={{ width: 'calc(15% - 10px)' }}>Số lượng</span>
                            <span style={{ width: 'calc(12.5% - 10px)' }}>Thành tiền</span>
                        </div>

                        {carts.length ? (
                            carts.map((cart) => (
                                <CartItem
                                    key={cart._id}
                                    data={cart}
                                    checked={cartsChecked.includes(cart._id)}
                                    carts={carts}
                                    setCarts={setCarts}
                                    cartsChecked={cartsChecked}
                                    setCartsChecked={setCartsChecked}
                                    showDeleteCartModal={handleShowDeleteCartModal}
                                />
                            ))
                        ) : (
                            <div className={cx('empty-cart')}>
                                <img src={images.empty_cart} alt='empty cart' />
                                <p>Không có sản phẩm nào trong giỏ hàng.</p>
                            </div>
                        )}

                        <Modal title='Chú ý' showModal={isShowDeleteCartModal} closeModal={handleCloseDeleteCartModal}>
                            <div className={cx('delete-cart')}>
                                <h3>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</h3>
                                <div className={cx('buttons')}>
                                    <button onClick={handleCloseDeleteCartModal}>Hủy bỏ</button>
                                    <button onClick={handleDeleteCart}>Đồng ý</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>

                <div className={cx('total')}>
                    <h2 className={cx('total-header')}>Thanh toán</h2>
                    <div className={cx('temporary')}>
                        <div>
                            <span>Tổng tạm tính</span>
                        </div>

                        <div>{formatPrice(totalPrice)}</div>
                    </div>

                    <div className={cx('official')}>
                        <div className={cx('official-lable')}>
                            <span>Thành tiền</span>
                        </div>
                        <div>
                            <div className={cx('official-price')}>{formatPrice(totalPrice)}</div>
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
    )
}

export default Cart
