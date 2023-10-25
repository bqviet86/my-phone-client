import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { Pagination } from 'swiper/modules'

import Modal from '~/components/Modal'
import Slider from '~/components/Slider'
import styles from './PhoneImage.module.scss'

const cx = classNames.bind(styles)

const displayNumber = 6
const defaultFunc = () => {}

function PhoneImage({ images }) {
    const [currentImage, setCurrentImage] = useState(`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${images[0]}`)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isShowSlider, setIsShowSlider] = useState(false)
    const sliderRef = useRef(null)

    useEffect(() => {
        setCurrentImage(`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${images[0]}`)
        setCurrentImageIndex(0)
    }, [images])

    const handleMouseEnter = (image, index) => {
        setCurrentImage(`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${image}`)
        setCurrentImageIndex(index)
    }

    const handleShowSlider = () => {
        setIsShowSlider(true)
    }

    const handleCloseSlider = () => {
        setIsShowSlider(false)
    }

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('image-main')} onClick={handleShowSlider}>
                    <img src={currentImage} alt='img-main' />
                </div>

                <div className={cx('image-list')}>
                    {images.map((image, index) => {
                        const imageLength = images.length

                        if (index < displayNumber) {
                            return (
                                <div
                                    key={index}
                                    className={cx('image-item', { active: index === currentImageIndex })}
                                    onMouseEnter={
                                        index !== displayNumber - 1 ? () => handleMouseEnter(image, index) : defaultFunc
                                    }
                                    onClick={handleShowSlider}
                                >
                                    <img src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${image}`} alt='img-item' />
                                    {index === displayNumber - 1 && imageLength > displayNumber && (
                                        <div className={cx('image-overlay')}>+{images.length - displayNumber}</div>
                                    )}
                                </div>
                            )
                        }

                        return null
                    })}
                </div>
            </div>

            <Modal
                width={800}
                height='calc(100% - 80px)'
                title='Ảnh điện thoại'
                showModal={isShowSlider}
                closeModal={handleCloseSlider}
            >
                <div ref={sliderRef} className={cx('slider')}>
                    <Slider modules={[Pagination]} data={images}>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={cx('slider-image')}
                                style={{ height: sliderRef.current?.clientHeight - 1 || 'auto' }}
                            >
                                <img src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${image}`} alt='img-slider' />
                            </div>
                        ))}
                    </Slider>
                </div>
            </Modal>
        </>
    )
}

export default PhoneImage
