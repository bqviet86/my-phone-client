import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'
import { Pagination } from 'antd'
import { Icon } from '@iconify/react'

import PhoneForm from './PhoneForm'
import Modal from '~/components/Modal'
import config from '~/config'
import useQueryParams from '~/hooks/useQueryParams'
import api from '~/utils/api'
import formatPrice from '~/utils/formatPrice'
import styles from './ManageProduct.module.scss'

const cx = classNames.bind(styles)

const limit = 10

const ManageProduct = () => {
    const queryParams = useQueryParams()
    const { page: pageQuery } = queryParams

    const [page, setPage] = useState(Number(pageQuery) || 1)
    const [phones, setPhones] = useState([])
    const [isShowForm, setIsShowForm] = useState(false)
    const [data, setData] = useState(null)
    const [mode, setMode] = useState('')
    const [deletePhoneId, setDeletePhoneId] = useState('')
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const getPhones = async () => {
            try {
                const response = await api.get('/phones', {
                    params: {
                        page,
                        limit,
                        brands: ''
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
        window.history.replaceState(null, '', `${config.routes.adminProduct}?page=${page}`)
    }, [page])

    const handleShowForm = async ({ phone_id, mode }) => {
        setIsShowForm(true)
        setMode(mode)

        if (mode === 'add') {
            setData(null)
        }

        if (mode === 'update') {
            try {
                const response = await api.get(`/phones/${phone_id}`)

                setData(response.data.result)
            } catch (error) {
                console.log(error.response)
            }
        }

        if (mode === 'delete') {
            setDeletePhoneId(phone_id)
        }
    }

    const handleDeletePhone = async () => {
        try {
            const response = await api.delete(`/phones/${deletePhoneId}`)

            setPhones(phones.filter((phone) => phone._id !== deletePhoneId))
            setIsShowForm(false)
            toast.success(response.data.message)
        } catch (error) {
            console.error('Lỗi khi xóa điện thoại: ', error.response)
        }
    }

    return (
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto flex flex-col min-h-screen'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý Sản phẩm
                </h2>

                <div className='w-full mt-4 overflow-hidden rounded-lg shadow-xs flex-1 flex'>
                    <div className='w-full overflow-x-auto flex flex-col'>
                        <div className='w-full grid justify-items-end mb-6'>
                            <button
                                className='w-56 h-16 pr-4 pl-4 bg-sky-600 text-white rounded-xl '
                                onClick={() => handleShowForm({ mode: 'add' })}
                            >
                                Thêm sản phẩm
                            </button>
                            <Modal
                                width={mode !== 'delete' ? 1000 : 400}
                                height={mode !== 'delete' ? 'calc(100% - 40px)' : 'auto'}
                                bgColor='#111827'
                                textColor='#9ca3af'
                                closeBtnColor='#9ca3af'
                                title={
                                    mode === 'add'
                                        ? 'Thêm điện thoại'
                                        : mode === 'update'
                                        ? 'Cập nhật điện thoại'
                                        : 'Xóa điện thoại'
                                }
                                showModal={isShowForm}
                                closeModal={() => setIsShowForm(false)}
                            >
                                {mode === 'add' || mode === 'update' ? (
                                    <PhoneForm
                                        data={data}
                                        mode={mode}
                                        phones={phones}
                                        setPhones={setPhones}
                                        setIsShowForm={setIsShowForm}
                                    />
                                ) : (
                                    <div className={cx('form', 'options')}>
                                        <h4>Bạn có chắc chắn muốn xóa điện thoại này?</h4>
                                        <div className={cx('btn', 'btn-delete')} onClick={handleDeletePhone}>
                                            Xóa
                                        </div>
                                    </div>
                                )}
                            </Modal>
                        </div>

                        <table className='w-full whitespace-no-wrap mb-[20px] rounded-[6px] overflow-hidden'>
                            <thead>
                                <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-3 py-4 text-xl text-center'>ID</th>
                                    <th className='px-3 py-4 text-xl text-center'>Hình ảnh</th>
                                    <th className='px-3 py-4 text-xl text-center'>Tên điện thoại</th>
                                    <th className='px-3 py-4 text-xl text-center'>Thương hiệu</th>

                                    <th className='px-3 py-4 text-xl text-center'>Giá bán</th>
                                    <th className='px-3 py-4 text-xl text-center'>Giá gốc</th>
                                    <th className='px-3 py-4 text-xl text-center'>Cập nhật</th>
                                    <th className='px-3 py-4 text-xl text-center'>Xóa</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white  divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                {phones.map((phone) => (
                                    <tr key={phone._id} className='text-gray-700 text-center dark:text-gray-400'>
                                        <td className='px-3 py-4 text-[1.4rem]'>
                                            <span>{phone._id}</span>
                                        </td>
                                        <td className='px-3 py-4 text-[1.4rem] text-center flex justify-center'>
                                            <div className='flex items-center w-32 h-32 rounded-md overflow-hidden'>
                                                <img
                                                    className='object-cover w-full h-full '
                                                    src={`${process.env.REACT_APP_IMAGE_URL_PREFIX}/${phone.image}`}
                                                    alt=''
                                                    loading='lazy'
                                                />
                                            </div>
                                        </td>
                                        <td className='px-3 py-4 text-[1.4rem] text-center'>
                                            <span>{phone.name}</span>
                                        </td>
                                        <td className='px-3 py-4 text-[1.4rem] text-center'>{phone.brand.name}</td>
                                        <td className='px-3 py-4 text-[1.4rem] text-center'>
                                            <span
                                                className={cx('one-line')}
                                                title={
                                                    formatPrice(phone.price[0]) +
                                                    (phone.price[1] ? ` - ${formatPrice(phone.price[1])}` : '')
                                                }
                                            >
                                                {formatPrice(phone.price[0]) +
                                                    (phone.price[1] ? ` - ${formatPrice(phone.price[1])}` : '')}
                                            </span>
                                        </td>
                                        <td className='px-3 py-4 text-[1.4rem] text-center'>
                                            {formatPrice(phone.price_before_discount)}
                                        </td>

                                        <td className='px-3 py-4 text-[1.4rem] text-center'>
                                            <button
                                                className='border-solid text-blue-600 text-[14px] border-blue-600 p-2 px-4 rounded-md'
                                                onClick={() => handleShowForm({ phone_id: phone._id, mode: 'update' })}
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth='1.5'
                                                    stroke='currentColor'
                                                    className='w-7 h-7'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                        <td className='px-3 py-4 text-[1.4rem] text-center'>
                                            <button
                                                className='border-solid text-blue-600 text-[16px] border-blue-600 p-2 px-4 rounded-md'
                                                onClick={() => handleShowForm({ phone_id: phone._id, mode: 'delete' })}
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth='1.5'
                                                    stroke='currentColor'
                                                    className='w-7 h-7'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

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
        </main>
    )
}

export default ManageProduct
