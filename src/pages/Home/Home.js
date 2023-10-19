import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import HomeSlider from './HomeSlider'
import Phone from '~/components/Phone'
import { sliderData } from '~/constants'
import api from '~/utils/api'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    const [brands, setBrands] = useState([])
    const [brandsChecked, setBrandsChecked] = useState([])
    const [phones, setPhones] = useState([])

    // Call api get all brands
    useEffect(() => {
        const getBrands = async () => {
            try {
                const response = await api.get('/brands')

                setBrands(response.data.result)
            } catch (err) {
                console.log(err.response.data.message)
            }
        }

        getBrands()
    }, [])

    // Call api get phones
    useEffect(() => {
        const getPhones = async () => {
            try {
                const response = await api.get('/phones', {
                    params: {
                        page: 1,
                        limit: 10,
                        brands: brandsChecked.join('|')
                    }
                })

                setPhones(response.data.result.phones)
            } catch (err) {
                console.log(err.response.data.message)
            }
        }

        getPhones()
    }, [brandsChecked])

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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
