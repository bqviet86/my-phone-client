const ManageOrder = () => {
    return (
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto grid'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý đơn hàng
                </h2>

                <div className='w-full mt-4 overflow-hidden rounded-lg shadow-xs'>
                    <div className='w-full overflow-x-auto'>
                        <table className='w-full whitespace-no-wrap'>
                            <thead>
                                <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-4 py-6 text-xl'>ID</th>
                                    <th className='px-4 py-6 text-xl'>Tên khách hàng</th>
                                    <th className='px-4 py-6 text-xl'>Trạng thái</th>
                                    <th className='px-4 py-6 text-xl'>Tổng tiền</th>
                                    <th className='px-4 py-6 text-xl'>Ngày tạo</th>
                                    <th className='px-4 py-6 text-xl'>Xem chi tiết</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                <tr className='text-gray-700 dark:text-gray-400'>
                                    <td className='px-4 py-7'>
                                        <div className='flex items-center'>
                                            <div>
                                                <p className='font-semibold'>abc78912354</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-7'>Duong Thanh Thong</td>
                                    <td className='px-4 py-7'>
                                        <span className='px-2 py-1 text-sm font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100'>
                                            Chưa thanh toán
                                        </span>
                                    </td>
                                    <td className='px-4 py-7'>199.999.999đ</td>
                                    <td className='px-4 py-7'>27-10-2023</td>
                                    <td className='px-4 py-7'>
                                        <button className='border-solid text-blue-600 text-[14px] border-blue-600 p-2 px-4 rounded-md'>
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                                <tr className='text-gray-700 dark:text-gray-400'>
                                    <td className='px-4 py-7'>
                                        <div className='flex items-center'>
                                            <div>
                                                <p className='font-semibold'>abc78912354</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-7'>Duong Thanh Thong</td>
                                    <td className='px-4 py-7'>
                                        <span className='px-2 py-1 text-sm font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100'>
                                            Chưa thanh toán
                                        </span>
                                    </td>
                                    <td className='px-4 py-7'>199.999.999đ</td>
                                    <td className='px-4 py-7'>27-10-2023</td>
                                    <td className='px-4 py-7'>
                                        <button className='border-solid text-blue-600 text-[14px] border-blue-600 p-2 px-4 rounded-md'>
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                                <tr className='text-gray-700 dark:text-gray-400'>
                                    <td className='px-4 py-7'>
                                        <div className='flex items-center'>
                                            <div>
                                                <p className='font-semibold'>abc78912354</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-7'>Duong Thanh Thong</td>
                                    <td className='px-4 py-7'>
                                        <span className='px-2 py-1 text-sm font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100'>
                                            Chưa thanh toán
                                        </span>
                                    </td>
                                    <td className='px-4 py-7'>199.999.999đ</td>
                                    <td className='px-4 py-7'>27-10-2023</td>
                                    <td className='px-4 py-7'>
                                        <button className='border-solid text-blue-600 text-[14px] border-blue-600 p-2 px-4 rounded-md'>
                                            Xem chi tiết
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

export default ManageOrder
