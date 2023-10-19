import { useRef } from 'react'
import { Icon } from '@iconify/react'
import classNames from 'classnames/bind'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './Slider.module.scss'
import 'swiper/css/bundle'

const cx = classNames.bind(styles)

function Slider({
    children,
    slidesPerView = 1,
    loop = false,
    delay = 5000,
    modules = [],
    onSlideChange = null,
    data = []
}) {
    const swiperRef = useRef(null)

    const handlePrevSlider = () => {
        if (!swiperRef.current) return
        swiperRef.current.swiper.slidePrev()
    }

    const handleNextSlider = () => {
        if (!swiperRef.current) return
        swiperRef.current.swiper.slideNext()
    }

    return (
        <>
            <Swiper
                ref={swiperRef}
                className='mySwiper'
                slidesPerView={slidesPerView}
                loop={loop}
                modules={modules}
                {...(modules.includes(Pagination) && {
                    pagination: {
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `<span class="${className}"></span>`
                        }
                    }
                })}
                {...(modules.includes(Autoplay) && { autoplay: { delay } })}
                {...(modules.includes(EffectFade) && { effect: 'fade' })}
                {...(onSlideChange && { onSlideChange })}
            >
                {data.map((_, index) => (
                    <SwiperSlide key={index}>{children[index]}</SwiperSlide>
                ))}
            </Swiper>

            <button className={cx('navigation', 'left')} onClick={handlePrevSlider}>
                <Icon icon='ph:caret-left-bold' />
            </button>

            <button className={cx('navigation', 'right')} onClick={handleNextSlider}>
                <Icon icon='ph:caret-right-bold' />
            </button>
        </>
    )
}

export default Slider
