import { useState } from 'react'
import classNames from 'classnames/bind'
import { Autoplay, EffectFade } from 'swiper/modules'

import Slider from '~/components/Slider'
import styles from './HomeSlider.module.scss'

const cx = classNames.bind(styles)

function HomeSlider({ data }) {
    const [showContentEffect, setShowContentEffect] = useState(() => {
        const initialShowContentEffect = Array(data.length).fill(false)

        initialShowContentEffect[0] = true

        return initialShowContentEffect
    })

    const handleSlideChange = (swiper) => {
        setShowContentEffect((prevShowContentEffect) =>
            prevShowContentEffect.map((_, index) => index === swiper.realIndex)
        )
    }

    return (
        <div className={cx('wrapper')}>
            <Slider loop={true} modules={[Autoplay, EffectFade]} onSlideChange={handleSlideChange} data={data}>
                {data.map((slider, index) => (
                    <div key={index} className={cx('slide')}>
                        <img src={slider.image} alt={slider.heading} />
                        <div className={cx('content', { effect: showContentEffect[index] })}>
                            <h2 className={cx('heading')}>{slider.heading}</h2>
                            <p className={cx('description')}>{slider.desc}</p>
                            <button className={cx('btn')}>Chi tiết</button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default HomeSlider
