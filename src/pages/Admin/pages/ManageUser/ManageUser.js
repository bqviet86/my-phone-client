import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

import { Sex } from '~/constants'
import images from '~/assets/images'
import useDebounce from '~/hooks/useDebounce'
import api from '~/utils/api'
import formatTime from '~/utils/formatTime'

const limit = 10

const ManageUser = () => {
    const location = useLocation()
    const unnecessary = location.state?.unnecessary

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')

    const debouncedSearch = useDebounce(search, 700)

    useEffect(() => {
        if (unnecessary) {
            toast('Bạn đã đăng nhập rồi', { icon: '😅' })
            window.history.replaceState(null, '', location.pathname)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await api.get('/users', {
                    params: {
                        page: 1,
                        limit,
                        search: debouncedSearch
                    }
                })

                setUsers(response.data.result)
            } catch (error) {
                console.log(error.response)
            }
        }

        getUsers()
    }, [debouncedSearch])

    return (
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto grid'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý người dùng
                </h2>

                <div className='w-full mt-4 overflow-hidden rounded-lg shadow-xs'>
                    <div className='w-[500px] mb-4 float-right'>
                        <label
                            htmlFor='search'
                            className='block mb-2 text-[1.6rem] font-bold text-gray-900 dark:text-white'
                        >
                            Tìm kiếm
                        </label>
                        <input
                            id='search'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-[1.4rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[12px] px-[16px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Nhập tên hoặc email người dùng'
                            spellCheck={false}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            required
                        />
                    </div>

                    <div className='w-full overflow-x-auto'>
                        <table className='w-full whitespace-no-wrap'>
                            <thead>
                                <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-4 py-6 text-xl text-center'>Ảnh đại diện</th>
                                    <th className='px-4 py-6 text-xl text-center'>Họ tên</th>
                                    <th className='px-4 py-6 text-xl text-center'>Email</th>
                                    <th className='px-4 py-6 text-xl text-center'>Giới tính</th>
                                    <th className='px-4 py-6 text-xl text-center'>Ngày sinh</th>
                                    <th className='px-4 py-6 text-xl text-center'>Số điện thoại</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                {users.map((user) => (
                                    <tr key={user._id} className='text-gray-700 dark:text-gray-400'>
                                        <td className='px-4 py-7 text-center flex justify-center items-center'>
                                            <div className='relative overflow-hidden w-[36px] h-[36px] rounded-full md:block'>
                                                <img
                                                    className='object-cover w-full h-full'
                                                    src={
                                                        user.avatar
                                                            ? `${process.env.REACT_APP_IMAGE_URL_PREFIX}/${user.avatar}`
                                                            : images.avatar
                                                    }
                                                    alt='avatar'
                                                    loading='lazy'
                                                />
                                            </div>
                                        </td>
                                        <td className='px-4 py-7 text-center'>{user.name}</td>
                                        <td className='px-4 py-7 text-center'>{user.email}</td>
                                        <td className='px-4 py-7 text-center'>{Sex[user.sex]}</td>
                                        <td className='px-4 py-7 text-center'>{formatTime(user.date_of_birth)}</td>
                                        <td className='px-4 py-7 text-center'>{user.phone_number}</td>
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

export default ManageUser
