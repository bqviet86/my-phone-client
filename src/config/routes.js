const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    phoneDetail: '/phone/:phone_id',
    cart: '/cart',
    account: '/account',
    accountOrders: '/account/orders',
    accountOrderDetail: '/account/orders/:order_id',
    accountAddresses: '/account/addresses',
    checkout: '/checkout',
    confirmPayment: '/confirm-payment/:order_id',
    orderSuccess: '/order-success',
    adminLogin: '/admin-login',
    adminUser: '/admin-user',
    adminOrder: '/admin-order',
    adminOrderDetail: '/admin-order/:order_id',
    adminProduct: '/admin-product',
    adminBrand: '/admin-brand',
    search: '/search'
}

export default routes
