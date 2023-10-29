import { useEffect } from "react";
import api from "~/utils/api";

const ManageBrand = () => {

    useEffect(() => {
        api.get('/brands')
        .then(res =>{
            const brands = res.resuldata;
            console.log(brands);
        })
    }, []);
    

    return (
        <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto grid'>
                <h2 className='my-6 text-4xl capitalize font-semibold text-gray-700 dark:text-gray-200'>
                    Quản lý thương hiệu
                </h2>

                <div className='w-full mt-4 overflow-hidden rounded-lg shadow-xs'>
                    <div className='w-full overflow-x-auto'>
                        <div className='w-full grid justify-items-end mb-6'>
                            <button className='w-64 h-16 pr-4 pl-4 bg-sky-600 text-white rounded-xl '>Thêm thương hiệu</button>
                        </div>
                        <table className='w-full whitespace-no-wrap'>
                            <thead>
                                <tr className='text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                                    <th className='px-4 py-6 text-xl'>ID</th>
                                    <th className='px-4 py-6 text-xl'>Tên thương hiệu</th>
                                    <th className='px-4 py-6 text-xl'>Xóa</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                                <tr className='text-gray-700 dark:text-gray-400 text-center'>
                                    <td className='px-4 py-7 '>
                                        <p className='font-semibold text-center'>abc78912354</p>
                                    </td>

                                    <td className='px-4 py-7'>Apple</td>
                                   
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
                                {/* <tr className='text-gray-700 dark:text-gray-400 text-center'>
                                    <td className='px-4 py-7 '>
                                        <p className='font-semibold text-center'>abc78912354</p>
                                    </td>

                                    <td className='px-4 py-7'>Sam sung</td>
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
                                                    d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
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
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ManageBrand
