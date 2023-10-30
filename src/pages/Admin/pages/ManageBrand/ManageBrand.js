import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import useBrands from '~/hooks/useBrands'
import styles from './ManageBrand.module.scss'
import classNames from 'classnames/bind'
import { toast } from 'react-hot-toast'

const cx = classNames.bind(styles)

function ManageBrand() {
    const { createBrand, fetchBrands, deleteBrand } = useBrands()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalDeleteBrand, setIsModalDeleteBrand] = useState(false)
    const [allBrand, setAllBrand] = useState([])
    const [error, setError] = useState({ name: '' })
    const [data, setData] = useState({ name: '' })
    const [brandToDelete, setBrandToDelete] = useState(null)

    useEffect(() => {
        fetchAllBrand()
    }, [])

    const fetchAllBrand = async () => {
        const { result } = await fetchBrands()
        setAllBrand(result)
    }
    const handleChange = (e) => {
        const { name } = e.target
        let { value } = e.target
        setError((prev) => ({ ...prev, [name]: '' }))
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const handleShowModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleCreateBrand = async () => {
        let result = {}
        result = await createBrand(data)

        if (!result.success) {
            setError(result.errors)
            return
        }

        await fetchAllBrand()
        toast.success(result.message)
        setIsModalOpen(false)
        setData({ name: '' })
        setError({ name: '' })
    }

    const handleShowModelDeleteBrand = (id) => {
        setBrandToDelete(id)
        setIsModalDeleteBrand(true)
    }
    const handleConfirmDelete = async () => {
        if (brandToDelete) {
            const result = await deleteBrand(brandToDelete)

            if (result.success) {
                setIsModalDeleteBrand(false)
                await fetchAllBrand()
                toast.success(result.message)
            } else {
                toast.error(result.errors)
            }
        }
        setBrandToDelete(null)
    }

    const handleCloseModelDeleteBrand = () => {
        setIsModalDeleteBrand(false)
    }

    return (
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto grid'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý thương hiệu
                </h2>
                <div className='w-full mt-4 overflow-hidden rounded-lg shadow-xs'>
                    <div className='w-full overflow-x-auto'>
                        <div className='w-full grid justify-items-end mb-6'>
                            <button
                                className='w-64 h-16 pr-4 pl-4 bg-sky-600 text-white rounded-xl '
                                onClick={handleShowModal}
                            >
                                Thêm thương hiệu
                            </button>
                            <Modal
                                open={isModalOpen}
                                onOk={handleCreateBrand}
                                onCancel={handleCloseModal}
                                className='custom-modal'
                                okButtonProps={{
                                    style: {
                                        backgroundColor: '#1677ff'
                                    }
                                }}
                            >
                                {
                                    <div className={cx('wrapper')}>
                                        <form className={cx('form-brand')}>
                                            <h2 className={cx('title')}>Thêm thương thiệu</h2>
                                            <div className={cx('input-wrap')}>
                                                <input
                                                    name='name'
                                                    placeholder='Tên thương hiệu'
                                                    value={data.name}
                                                    onChange={handleChange}
                                                />
                                                {error.name && <div className={cx('error')}>{error.name}</div>}
                                            </div>
                                        </form>
                                    </div>
                                }
                            </Modal>
                        </div>
                        <table className='w-full whitespace-no-wrap'>
                            <thead>
                                <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-4 py-6 text-xl'>ID</th>
                                    <th className='px-4 py-6 text-xl'>Tên thương hiệu</th>
                                    <th className='px-4 py-6 text-xl'>Xóa</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                {allBrand.map((brand) => (
                                    <tr key={brand._id} className='text-gray-700 dark:text-gray-400 '>
                                        <td className='px-4 py-7 '>
                                            <p className='font-semibold '>{brand._id}</p>
                                        </td>

                                        <td className='px-4 py-7'>{brand.name}</td>

                                        <td className='px-4 py-7 '>
                                            <button
                                                className='border-solid text-blue-600 text-[14px] border-blue-600 p-2 px-4 rounded-md'
                                                onClick={() => handleShowModelDeleteBrand(brand._id)}
                                            >
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
                                            <Modal
                                                open={isModalDeleteBrand}
                                                onOk={handleConfirmDelete}
                                                onCancel={handleCloseModelDeleteBrand}
                                                className='custom-modal'
                                                // bodyStyle={{ backgroundColor: 'green' }}
                                                okButtonProps={{
                                                    style: {
                                                        backgroundColor: '#1677ff'
                                                    }
                                                }}
                                            >
                                                <h3>Bạn có chắc chắn muốn xóa thương hiệu này không? </h3>
                                            </Modal>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ManageBrand
