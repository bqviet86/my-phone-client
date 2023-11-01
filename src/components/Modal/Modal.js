import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import classNames from 'classnames/bind'

import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({
    children,
    width = 'max-content',
    height = 'max-content',
    bgColor = 'white',
    textColor = '#333',
    closeBtnColor = 'rgba(0, 0, 0, 0.5)',
    title = '',
    titlePlacement = 'center',
    closeBtn = true,
    showModal,
    closeModal
}) {
    const contentRef = useRef(null)

    // Cuộn lên đầu khi mở modal
    useEffect(() => {
        if (showModal) {
            setTimeout(() => {
                contentRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }, 300)
        }
    }, [showModal])

    const handleStopPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <>
            <div className={cx('overlay', { show: showModal })} onClick={closeModal}></div>
            <div
                className={cx('wrapper')}
                onClick={handleStopPropagation}
                style={{
                    width,
                    height,
                    backgroundColor: bgColor
                }}
            >
                <div className={cx('header')}>
                    {title && (
                        <h5
                            className={cx('title')}
                            style={{
                                textAlign: titlePlacement,
                                color: textColor,
                                ...(titlePlacement === 'start' && { paddingLeft: 0 })
                            }}
                        >
                            {title}
                        </h5>
                    )}
                    {closeBtn && (
                        <div className={cx('close-btn')} style={{ color: closeBtnColor }} onClick={closeModal}>
                            <Icon icon='ph:x-bold' />
                        </div>
                    )}
                </div>

                <div className={cx('body')} style={{ color: textColor }}>
                    <div ref={contentRef} className={cx('content')}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
