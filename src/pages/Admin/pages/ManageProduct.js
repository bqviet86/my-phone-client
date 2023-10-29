import Modal from '~/components/Modal'
import { useState } from 'react'
import PhoneForm from './PhoneForm'

const ManageProduct = () => {
    const [isShowForm, setIsShowForm] = useState(false)

    const handleShowForm = () => {
        setIsShowForm(true)
    }

    const handleCloseForm = () => {
        setIsShowForm(false)
    }
    return (
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto grid'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý Sản phẩm
                </h2>

                <div className='w-full mt-4 overflow-hidden rounded-lg shadow-xs'>
                    <div className='w-full overflow-x-auto'>
                        <div className='w-full grid justify-items-end mb-6'>
                            <button
                                className='w-56 h-16 pr-4 pl-4 bg-sky-600 text-white rounded-xl '
                                onClick={handleShowForm}
                            >
                                Thêm sản phẩm
                            </button>
                            <Modal
                                width={600}
                                height='calc(100% - 80px)'
                                title='Thêm sản phẩm'
                                showModal={isShowForm}
                                closeModal={handleCloseForm}
                            >
                                <PhoneForm />
                            </Modal>
                        </div>
                        <table className='w-full whitespace-no-wrap'>
                            <thead>
                                <tr className='text-xs text-center font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-4 py-6 text-xl'>ID</th>
                                    <th className='px-4 py-6 text-xl'>Tên sản phẩm</th>
                                    <th className='px-4 py-6 text-xl'>Thương hiệu</th>
                                    <th className='px-4 py-6 text-xl'>Màu</th>
                                    <th className='px-4 py-6 text-xl'>Dung lượng</th>

                                    <th className='px-4 py-6 text-xl'>Giá</th>
                                    <th className='px-4 py-6 text-xl'>Cập nhật</th>
                                    <th className='px-4 py-6 text-xl'>Xóa</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white  divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                <tr className='text-gray-700 text-center dark:text-gray-400'>
                                    <td className='px-4 py-7'>
                                        <div className='flex items-center'>
                                            <div>
                                                <p className='font-semibold'>abc78912354</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-7'>
                                        <div className='flex items-center'>
                                            <div className='relative hidden w-32 h-32 mr-3 md:block'>
                                                <img
                                                    className='object-cover w-full h-full '
                                                    src='https://photo2.tinhte.vn/data/attachment-files/2023/09/8122189_ptt3.jpg'
                                                    alt=''
                                                    loading='lazy'
                                                />
                                                <div className='absolute inset-0 shadow-inner' aria-hidden='true'></div>
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Iphone 15</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-7'>Apple</td>
                                    <td className='px-4 py-7'>Blue Titanium</td>
                                    <td className='px-4 py-7'>1TB</td>
                                    <td className='px-4 py-7'>34000000</td>

                                    <td className='px-4 py-7'>
                                        <button className='border-solid text-blue-600 text-[14px] border-blue-600 p-2 px-4 rounded-md'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke-width='1.5'
                                                stroke='currentColor'
                                                class='w-6 h-6'
                                            >
                                                <path
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className='px-4 py-7'>
                                        <button className='border-solid text-blue-600 text-[14px] border-blue-600 p-2 px-4 rounded-md'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke-width='1.5'
                                                stroke='currentColor'
                                                class='w-6 h-6'
                                            >
                                                <path
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ManageProduct
