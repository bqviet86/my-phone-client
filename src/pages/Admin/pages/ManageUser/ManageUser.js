import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const ManageUser = () => {
    const location = useLocation()
    const unnecessary = location.state?.unnecessary

    useEffect(() => {
        if (unnecessary) {
            toast('Bạn đã đăng nhập rồi', { icon: '😅' })
            window.history.replaceState(null, '', location.pathname)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto grid'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý người dùng
                </h2>

                <div className='w-full mt-4 overflow-hidden rounded-lg shadow-xs'>
                    <div className='w-full overflow-x-auto'>
                        <table className='w-full whitespace-no-wrap'>
                            <thead>
                                <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-4 py-6 text-xl'>Họ tên</th>
                                    <th className='px-4 py-6 text-xl'>Email</th>
                                    <th className='px-4 py-6 text-xl'>Số điện thoại</th>
                                    <th className='px-4 py-6 text-xl'>Giới tính</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                <tr className='text-gray-700 dark:text-gray-400'>
                                    <td className='px-4 py-7'>
                                        <div className='flex items-center'>
                                            <div className='relative hidden w-12 h-12 mr-3 rounded-full md:block'>
                                                <img
                                                    className='object-cover w-full h-full rounded-full'
                                                    src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                                                    alt=''
                                                    loading='lazy'
                                                />
                                                <div
                                                    className='absolute inset-0 rounded-full shadow-inner'
                                                    aria-hidden='true'
                                                ></div>
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Hans Burger</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-7'>thong@gmail.com</td>
                                    <td className='px-4 py-7'>091912123</td>
                                    <td className='px-4 py-7'>Nam</td>
                                </tr>
                                <tr className='text-gray-700 dark:text-gray-400'>
                                    <td className='px-4 py-7'>
                                        <div className='flex items-center'>
                                            <div className='relative hidden w-12 h-12 mr-3 rounded-full md:block'>
                                                <img
                                                    className='object-cover w-full h-full rounded-full'
                                                    src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                                                    alt=''
                                                    loading='lazy'
                                                />
                                                <div
                                                    className='absolute inset-0 rounded-full shadow-inner'
                                                    aria-hidden='true'
                                                ></div>
                                            </div>
                                            <div>
                                                <p className='font-semibold'>Hans Burger</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-7'>thong@gmail.com</td>
                                    <td className='px-4 py-7'>091912123</td>
                                    <td className='px-4 py-7'>Nam</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ManageUser
