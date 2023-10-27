import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import images from '~/assets/images'
import routes from '~/config/routes'

const Sidebar = () => {
    const { pathname } = useLocation()

    return (
        <aside className='z-20 hidden w-96 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0'>
            <div className='py-4 text-gray-500 dark:text-gray-400'>
                <p className='ml-6 text-lg font-bold text-gray-800 dark:text-gray-200'>
                    <img src={images.logo} alt='logo' />
                </p>
                <ul className='mt-8'>
                    <li className='relative px-6 py-3 my-3'>
                        {pathname === routes.adminUser && (
                            <span
                                className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                                aria-hidden='true'
                            ></span>
                        )}
                        <Link
                            to='/admin-user'
                            className='inline-flex items-center w-full font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100'
                        >
                            <svg
                                className='w-7 h-7'
                                aria-hidden='true'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'></path>
                            </svg>
                            <span className='ml-4'>Người dùng</span>
                        </Link>
                    </li>
                    <li className='relative px-6 py-3 my-3'>
                        {pathname === routes.adminProduct && (
                            <span
                                className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                                aria-hidden='true'
                            ></span>
                        )}
                        <Link
                            className='inline-flex items-center w-full font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                            to={'/admin-product'}
                        >
                            <svg
                                className='w-7 h-7'
                                aria-hidden='true'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'></path>
                            </svg>
                            <span className='ml-4'>Sản phẩm</span>
                        </Link>
                    </li>
                    <li className='relative px-6 py-3'>
                        {pathname === routes.adminBrand && (
                            <span
                                className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                                aria-hidden='true'
                            ></span>
                        )}
                        <Link
                            to='/admin-brand'
                            className='inline-flex items-center w-full font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                        >
                            <svg
                                className='w-7 h-7'
                                aria-hidden='true'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'></path>
                            </svg>
                            <span className='ml-4'>Thương hiệu</span>
                        </Link>
                    </li>
                    <li className='relative px-6 py-3 my-3'>
                        {pathname === routes.adminOrder && (
                            <span
                                className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                                aria-hidden='true'
                            ></span>
                        )}
                        <Link
                            to='/admin-order'
                            className='inline-flex items-center w-full font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                        >
                            <svg
                                className='w-7 h-7'
                                aria-hidden='true'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path d='M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'></path>
                                <path d='M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'></path>
                            </svg>
                            <span className='ml-4'>Đơn hàng</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
