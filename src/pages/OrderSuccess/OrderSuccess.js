import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'

import config from '~/config'
import useQueryParams from '~/hooks/useQueryParams'
import api from '~/utils/api'
import styles from './OrderSuccess.module.scss'

const cx = classNames.bind(styles)

function OrderSuccess() {
    const queryParams = useQueryParams()
    const navigate = useNavigate()

    const [isSuccess, setIsSuccess] = useState()
    const [message, setMessage] = useState('')
    const [orderId, setOrderId] = useState('')

    useEffect(() => {
        if (!queryParams.order_id) {
            const callOrderSuccess = async () => {
                try {
                    const response = await api.patch(
                        '/orders/success',
                        {},
                        {
                            params: queryParams
                        }
                    )

                    setIsSuccess(response.data.result.success)
                    setMessage(response.data.message)
                    setOrderId(response.data.result.order_id)
                } catch (error) {
                    setIsSuccess(false)
                    console.log(error.response)
                }
            }

            callOrderSuccess()
            return
        }

        setIsSuccess(true)
        setMessage('Đặt hàng thành công')
        setOrderId(queryParams.order_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isSuccess === true) {
            const timeout = setTimeout(() => {
                navigate(`${config.routes.accountOrders}/${orderId}`)
            }, 3000)

            return () => {
                clearTimeout(timeout)
            }
        }

        if (isSuccess === false) {
            const timeout = setTimeout(() => {
                navigate(config.routes.home)
            }, 3000)

            return () => {
                clearTimeout(timeout)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    return (
        <div className={cx('wrapper')}>
            {isSuccess === true && (
                <>
                    <Icon icon='iconoir:check-circle' />
                    <h2>{message}</h2>
                    <div className={cx('navigate')}>
                        <Link to={`${config.routes.accountOrders}/${orderId}`}>Xem đơn hàng</Link>
                        <Link to={config.routes.home}>Trang chủ</Link>
                    </div>
                </>
            )}

            {isSuccess === false && (
                <>
                    <Icon icon='octicon:x-circle-24' className={cx('fail')} />
                    <h2>{message}</h2>
                    <div className={cx('navigate')}>
                        <Link to={config.routes.home}>Trang chủ</Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default OrderSuccess
