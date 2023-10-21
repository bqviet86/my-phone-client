import { Link, Outlet, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import routes from '~/config/routes'
import FormUpdateInfo from './components/FormUpdateInfo'

function Account() {
    const { pathname } = useLocation()
    return (
        <div className='mt-[80px] grid grid-cols-4 min-h-[600px] px-32 gap-8'>
            <div className='my-8 col-span-1'>
                <ul className='text-black bg-white border border-gray-200 rounded-lg'>
                    <li className='w-full px-8 py-4 hover:bg-gray-100 cursor-pointer hover:text-blue-500 transition-all ease-in-out hover:font-semibold border-b border-gray-200 flex gap-2 items-center'>
                        <Link to={routes.account} className='flex items-center gap-2 w-full'>
                            <span>
                                <Icon icon='majesticons:user-line' />
                            </span>
                            <span>Thông tin tài khoản</span>
                        </Link>
                    </li>
                    <li className='w-full px-8 py-4 hover:bg-gray-100 cursor-pointer hover:text-blue-500 transition-all ease-in-out hover:font-semibold border-b border-gray-200 flex gap-2 items-center'>
                        <Link to={routes.accountOrders} className='flex items-center gap-2 w-full'>
                            <span>
                                <Icon icon='material-symbols:order-approve-outline' />
                            </span>
                            <span>Thông tin đơn hàng</span>
                        </Link>
                    </li>
                    <li className='w-full px-8 py-4 hover:bg-gray-100 cursor-pointer hover:text-blue-500 transition-all ease-in-out hover:font-semibold border-b border-gray-200 flex gap-2 items-center'>
                        <Link to={routes.accountAddresses} className='flex items-center gap-2 w-full'>
                            <span>
                                <Icon icon='ep:location' />
                            </span>
                            <span>Số địa chỉ</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='col-span-3'>{pathname !== '/account' ? <Outlet /> : <FormUpdateInfo />}</div>
        </div>
    )
}

export default Account
