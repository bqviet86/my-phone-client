import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'
import { Pagination } from 'antd'
import { Icon } from '@iconify/react'

import HomeSlider from './HomeSlider'
import Phone from '~/components/Phone'
import config from '~/config'
import { sliderData } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import api from '~/utils/api'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

const limit = 10

function Home() {
    const location = useLocation()
    const queryParams = useQueryParams()
    const navigate = useNavigate()
    const unnecessary = location.state?.unnecessary
    const onlyAdmin = location.state?.onlyAdmin
    const { page: pageQuery, brand: brandQuery } = queryParams

    const [page, setPage] = useState(Number(pageQuery) || 1)
    const [brands, setBrands] = useState([])
    const [brandsChecked, setBrandsChecked] = useState([])
    const [phones, setPhones] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        if (unnecessary) {
            toast('Bạn đã đăng nhập rồi', { icon: '😅' })
        }

        if (onlyAdmin) {
            toast('Bạn không có quyền truy cập vào trang này', { icon: '🤣' })
        }

        window.history.replaceState(null, '', location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Call api get all brands
    useEffect(() => {
        const getBrands = async () => {
            try {
                const response = await api.get('/brands')
                const brandsResponse = response.data.result

                setBrands(brandsResponse)
                setBrandsChecked(
                    brandQuery
                        ? brandsResponse
                              .filter((brand) => brandQuery.split('_').includes(brand.name))
                              .map((brand) => brand._id)
                        : []
                )
            } catch (err) {
                console.log(err.response)
            }
        }

        getBrands()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Call api get phones
    useEffect(() => {
        if (brands.length) {
            const getPhones = async () => {
                try {
                    const response = await api.get('/phones', {
                        params: {
                            page,
                            limit,
                            brands: brandsChecked.join('|')
                        }
                    })
                    const total_pages = response.data.result.total_pages

                    setPhones(response.data.result.phones)
                    setTotalPages(total_pages)
                    page > total_pages && setPage(total_pages)
                } catch (err) {
                    console.log(err.response)
                }
            }

            getPhones()
        }
    }, [page, brandsChecked, brands])

    useEffect(() => {
        navigate(
            `${config.routes.home}?page=${page}${
                brandsChecked.length
                    ? `&brand=${brands
                          .filter((brand) => brandsChecked.includes(brand._id))
                          .map((brand) => brand.name)
                          .join('_')}`
                    : ''
            }`
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, brandsChecked])

    const handleChangeCheckbox = (e) => {
        if (e.target.checked) {
            setBrandsChecked([...brandsChecked, e.target.value])
        } else {
            setBrandsChecked(brandsChecked.filter((brand) => brand !== e.target.value))
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-wrap')}>
                <HomeSlider data={sliderData} />
            </div>

            <div className={cx('products-wrap')}>
                <h2 className={cx('heading')}>Sản phẩm</h2>
                <div className={cx('content')}>
                    <div className={cx('brands')}>
                        <h3 className={cx('brands-heading')}>Thương hiệu</h3>
                        <div className={cx('brands-list')}>
                            {brands.map((brand) => (
                                <label key={brand._id} htmlFor={brand._id} className={cx('brands-item')}>
                                    <input
                                        type='checkbox'
                                        id={brand._id}
                                        name={brand.name}
                                        value={brand._id}
                                        checked={brandsChecked.includes(brand._id)}
                                        onChange={handleChangeCheckbox}
                                    />
                                    <span>{brand.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={cx('phones')}>
                        <div className={cx('phones-list')}>
                            {phones.map((phone) => (
                                <Phone key={phone._id} data={phone} />
                            ))}
                        </div>
                        <Pagination
                            total={totalPages * limit}
                            pageSize={limit}
                            current={page}
                            showSizeChanger={false}
                            showTitle={false}
                            prevIcon={<Icon icon='mingcute:left-line' />}
                            nextIcon={<Icon icon='mingcute:right-line' />}
                            className={cx('pagination')}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
