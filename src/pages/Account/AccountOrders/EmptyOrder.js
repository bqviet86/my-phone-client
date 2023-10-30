import React from 'react'
import images from '~/assets/images'

const EmptyOrder = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='mx-auto'>
                <div className='flex flex-col items-center gap-8'>
                    <img src={images.no_products_found} alt='' />
                    <p>Bạn không có đơn hàng nào</p>
                </div>
            </div>
        </div>
    )
}

export default EmptyOrder
