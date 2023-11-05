import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { Pagination } from 'antd'
import { Icon } from '@iconify/react'

import Phone from '~/components/Phone'
import useQueryParams from '~/hooks/useQueryParams'
import api from '~/utils/api'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

const limit = 10

function Search() {
    const queryParams = useQueryParams()
    const { q, page: pageQuery } = queryParams

    const [page, setPage] = useState(Number(pageQuery) || 1)
    const [phones, setPhones] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        if (q.trim()) {
            const getPhones = async () => {
                try {
                    const response = await api.get('/search', {
                        params: {
                            content: q,
                            page,
                            limit
                        }
                    })
                    const total_pages = response.data.result.total_pages

                    setPhones(response.data.result.phones)
                    setTotalPages(total_pages)
                    page > total_pages && setPage(total_pages)
                } catch (error) {
                    console.log(error.response)
                }
            }

            getPhones()
        }
    }, [q, page])

    return (
        <div className={cx('wrapper')}>
            {phones.length ? (
                <>
                    <h2>{`Kết quả tìm kiếm cho "${q}"`}</h2>

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
                </>
            ) : (
                <h2>Không tìm thấy kết quả nào</h2>
            )}
        </div>
    )
}

export default Search
