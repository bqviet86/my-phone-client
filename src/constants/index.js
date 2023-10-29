import images from '~/assets/images'

export const userMenu = [
    {
        title: 'Thông tin tài khoản',
        icon: 'mingcute:user-3-line',
        to: '/account'
    },
    {
        title: 'Quản lý đơn hàng',
        icon: 'icon-park-outline:transaction-order',
        to: '/account/orders'
    },
    {
        title: 'Sổ địa chỉ',
        icon: 'ic:outline-location-on',
        to: '/account/addresses'
    }
]

export const sliderData = [
    {
        image: images.iphone_15,
        heading: 'Iphone 15',
        desc: 'Iphone 15 là một sản phẩm mới từ Apple với nhiều tính năng tuyệt vời.'
    },
    {
        image: images.samsung_galaxy_z_flip_4,
        heading: 'Samsung Z Flip 4',
        desc: 'Samsung Z Flip 4 là một chiếc điện thoại gập cao cấp với màn hình linh hoạt.'
    },
    {
        image: images.oppo_find_n2_flip,
        heading: 'Oppo Find N2 Flip',
        desc: 'Oppo Find N2 Flip là một điện thoại gập từ Oppo với hiệu suất ấn tượng.'
    },
    {
        image: images.xiaomi_12t,
        heading: 'Xiaomi 12T',
        desc: 'Xiaomi 12T là một smartphone Android mạnh mẽ với giá cả hợp lý.'
    }
]

export const PaymentMethods = {
    CreditCard: 0, // Thẻ tín dụng
    Cash: 1 // Tiền mặt
}

export const PaymentMethodArray = [
    {
        id: PaymentMethods.CreditCard,
        name: 'Thanh toán VNPAY-QR',
        description: 'Thanh toán qua Internet Banking, Visa, Master, JCB, VNPAY-QR'
    },
    {
        id: PaymentMethods.Cash,
        name: 'Thanh toán khi nhận hàng',
        description: 'Thanh toán khi nhận hàng tại nhà (COD)'
    }
]
