import classNames from 'classnames/bind'

import styles from './PhoneInfoTable.module.scss'

const cx = classNames.bind(styles)

function PhoneInfoTable({ title = '', less = false, phone, currentOption }) {
    return (
        <div className={cx('wrapper')}>
            {title && <h3 className={cx('title')}>{title}</h3>}
            <div className={cx('info-table')}>
                <div className={cx('session')}>
                    <div className={cx('session-line')}>
                        <div className={cx('session-line-title')}>Thương hiệu</div>
                        <div className={cx('session-line-content')}>{phone.brand.name}</div>
                    </div>
                    <div className={cx('session-line')}>
                        <div className={cx('session-line-title')}>Bảo hành</div>
                        <div className={cx('session-line-content')}>12 tháng</div>
                    </div>
                </div>

                <div className={cx('session')}>
                    <div className={cx('session-title')}>Thông tin chung</div>
                    <div className={cx('session-line')}>
                        <div className={cx('session-line-title')}>Tên sản phẩm</div>
                        <div className={cx('session-line-content')}>{phone.name}</div>
                    </div>
                    <div className={cx('session-line')}>
                        <div className={cx('session-line-title')}>Màu sắc</div>
                        <div className={cx('session-line-content')}>{currentOption.color}</div>
                    </div>
                </div>

                <div className={cx('session')}>
                    <div className={cx('session-title')}>Màn hình</div>
                    <div className={cx('session-line')}>
                        <div className={cx('session-line-title')}>Loại màn hình</div>
                        <div className={cx('session-line-content')}>{phone.screen_type}</div>
                    </div>
                    <div className={cx('session-line')}>
                        <div className={cx('session-line-title')}>Độ phân giải</div>
                        <div className={cx('session-line-content')}>{phone.resolution}</div>
                    </div>
                </div>

                {!less && (
                    <>
                        <div className={cx('session')}>
                            <div className={cx('session-title')}>Cấu hình</div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Dung lượng (ROM)</div>
                                <div className={cx('session-line-content')}>{currentOption.capacity}</div>
                            </div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Hệ điều hành</div>
                                <div className={cx('session-line-content')}>{phone.operating_system}</div>
                            </div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>RAM</div>
                                <div className={cx('session-line-content')}>{phone.memory}</div>
                            </div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Chip</div>
                                <div className={cx('session-line-content')}>{phone.chip}</div>
                            </div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Pin</div>
                                <div className={cx('session-line-content')}>{phone.battery}</div>
                            </div>
                        </div>

                        <div className={cx('session')}>
                            <div className={cx('session-title')}>Camera</div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Camera sau</div>
                                <div className={cx('session-line-content')}>{phone.rear_camera}</div>
                            </div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Camera trước</div>
                                <div className={cx('session-line-content')}>{phone.front_camera}</div>
                            </div>
                        </div>

                        <div className={cx('session')}>
                            <div className={cx('session-title')}>Kết nối</div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Wifi</div>
                                <div className={cx('session-line-content')}>{phone.wifi}</div>
                            </div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Jack tai nghe</div>
                                <div className={cx('session-line-content')}>{phone.jack_phone}</div>
                            </div>
                        </div>

                        <div className={cx('session')}>
                            <div className={cx('session-title')}>Thiết kế và trọng lượng</div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Kích thước</div>
                                <div className={cx('session-line-content')}>{phone.size}</div>
                            </div>
                            <div className={cx('session-line')}>
                                <div className={cx('session-line-title')}>Khối lượng</div>
                                <div className={cx('session-line-content')}>{phone.weight}</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default PhoneInfoTable
