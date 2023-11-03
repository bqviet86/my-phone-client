import images from '~/assets/images'

export const Role = {
    Admin: 0,
    User: 1
}

export const SexEnum = {
    Male: 0,
    Female: 1
}

export const Sex = {
    [SexEnum.Male]: 'Nam',
    [SexEnum.Female]: 'Nữ'
}

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

export const OrderStatusEnum = {
    PendingPayment: 0, // Chờ thanh toán (chỉ áp dụng cho thanh toán bằng thẻ tín dụng)
    PendingConfirmation: 1, // Chờ xác nhận
    Processing: 2, // Đang lấy hàng
    Shipping: 3, // Đang giao hàng
    Completed: 4, // Đã giao hàng
    Cancelled: 5 // Đã hủy
}

export const OrderStatus = {
    [OrderStatusEnum.PendingPayment]: {
        title: 'Chờ thanh toán',
        style: 'text-white bg-blue-500'
    },
    [OrderStatusEnum.PendingConfirmation]: {
        title: 'Chờ xác nhận',
        style: 'text-white bg-violet-500'
    },
    [OrderStatusEnum.Processing]: {
        title: 'Đang lấy hàng',
        style: 'text-white bg-pink-500'
    },
    [OrderStatusEnum.Shipping]: {
        title: 'Đang giao hàng',
        style: 'text-white bg-amber-500'
    },
    [OrderStatusEnum.Completed]: {
        title: 'Đã nhận hàng',
        style: 'text-white bg-teal-500'
    },
    [OrderStatusEnum.Cancelled]: {
        title: 'Đã hủy',
        style: 'text-white bg-red-500'
    }
}

export const OrderStatusQueryParams = {
    pending_payment: OrderStatusEnum.PendingPayment,
    pending_confirmation: OrderStatusEnum.PendingConfirmation,
    processing: OrderStatusEnum.Processing,
    shipping: OrderStatusEnum.Shipping,
    completed: OrderStatusEnum.Completed,
    cancelled: OrderStatusEnum.Cancelled
}

export const PendingPayment = 0
export const PendingConfirmation = 1
export const Processing = 2
export const Shipping = 3
export const Completed = 4
export const Cancelled = 5

export const PendingPaymentName = 'Chờ thanh toán'
export const PendingConfirmationName = 'Chờ xác nhận'
export const ProcessingName = 'Đơn hàng đang xử lý'
export const ShippingName = 'Đơn hàng đang vận chuyển'
export const CompletedName = 'Đặt hàng thành công'
export const CancelledName = 'Đơn hàng đã bị hủy'
