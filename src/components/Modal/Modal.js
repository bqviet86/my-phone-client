import { Icon } from '@iconify/react'
import classNames from 'classnames/bind'

import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({
    children,
    width = 'auto',
    height = 'auto',
    title = '',
    titlePlacement = 'center',
    closeBtn = true,
    showModal,
    closeModal
}) {
    const handleStopPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={cx('overlay', { show: showModal })} onClick={closeModal}>
            <div className={cx('wrapper')} onClick={handleStopPropagation} style={{ width, height }}>
                <div className={cx('header')}>
                    {title && (
                        <h5
                            className={cx('title')}
                            style={{
                                textAlign: titlePlacement,
                                ...(titlePlacement === 'start' && { paddingLeft: 0 })
                            }}
                        >
                            {title}
                        </h5>
                    )}
                    {closeBtn && (
                        <div className={cx('close-btn')} onClick={closeModal}>
                            <Icon icon='ph:x-bold' />
                        </div>
                    )}
                </div>

                <div className={cx('body')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Modal
