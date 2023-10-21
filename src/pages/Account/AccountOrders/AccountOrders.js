import images from '~/assets/images'

function AccountOrders() {
    return (
        <div className='my-8 h-full'>
            <div className='flex justify-between'>
                <h2 className='font-semibold text-4xl'>Quản lý đơn hàng</h2>
                <div className='flex gap-2 bg-gray-50 shadow-md rounded-md'>
                    <button className='px-8 py-3 text-[14px] hover:shadow-md hover:bg-gray-100 hover:text-blue-600'>
                        Chờ thanh toán
                    </button>
                    <button className='px-8 py-3 text-[14px] hover:shadow-md hover:bg-gray-100 hover:text-blue-600'>
                        Chờ giao hàng
                    </button>
                    <button className='px-8 py-3 text-[14px] hover:shadow-md hover:bg-gray-100 hover:text-blue-600'>
                        Đã hoàn thành
                    </button>
                </div>
            </div>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <div className='mx-auto'>
                    <div className='flex flex-col items-center gap-8'>
                        <img src={images.no_products_found} alt='' />
                        <p>Bạn không có đơn hàng nào</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountOrders
