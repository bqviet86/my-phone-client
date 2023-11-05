import config from '~/config'

import DefaultLayout, { AdminLayout, AdminLoginLayout } from '~/layouts'

import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import PhoneDetail from '~/pages/PhoneDetail'
import Cart from '~/pages/Cart'
import Account, { AccountAddresses, AccountOrderDetail, AccountOrders } from '~/pages/Account'
import Checkout from '~/pages/Checkout'
import ConfirmPayment from '~/pages/ConfirmPayment'
import OrderSuccess from '~/pages/OrderSuccess'
import AdminLogin from '~/pages/AdminLogin'
import ManageUser from '~/pages/Admin/pages/ManageUser'
import ManageOrder from '~/pages/Admin/pages/ManageOrder'
import ManageOrderDetail from '~/pages/Admin/pages/ManageOrderDetail'
import ManageProduct from '~/pages/Admin/pages/ManageProduct'
import ManageBrand from '~/pages/Admin/pages/ManageBrand/ManageBrand'

// Thêm unnecessary: true để báo là route này khi đã đăng nhập thì không cần truy cập nữa
// Thêm protected: true để báo là route này cần phải đăng nhập mới được truy cập
// Thêm onlyAdmin: true để báo là route này chỉ có admin mới được truy cập
// Children: [] chứa các route con của nó

const routes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout
    },
    {
        path: config.routes.login,
        component: Login,
        layout: DefaultLayout,
        unnecessary: true
    },
    {
        path: config.routes.register,
        component: Register,
        layout: DefaultLayout,
        unnecessary: true
    },
    {
        path: config.routes.phoneDetail,
        component: PhoneDetail,
        layout: DefaultLayout
    },
    {
        path: config.routes.cart,
        component: Cart,
        layout: DefaultLayout,
        protected: true
    },
    {
        path: config.routes.account,
        component: Account,
        layout: DefaultLayout,
        protected: true,
        children: [
            {
                path: config.routes.accountOrders,
                component: AccountOrders,
                protected: true
            },
            {
                path: config.routes.accountOrderDetail,
                component: AccountOrderDetail,
                protected: true
            },
            {
                path: config.routes.accountAddresses,
                component: AccountAddresses,
                protected: true
            }
        ]
    },
    {
        path: config.routes.checkout,
        component: Checkout,
        layout: DefaultLayout,
        protected: true
    },
    {
        path: config.routes.confirmPayment,
        component: ConfirmPayment,
        layout: DefaultLayout,
        protected: true
    },
    {
        path: config.routes.orderSuccess,
        component: OrderSuccess,
        layout: DefaultLayout,
        protected: true
    },
    {
        path: config.routes.adminLogin,
        component: AdminLogin,
        layout: AdminLoginLayout,
        unnecessary: true
    },
    {
        path: config.routes.adminUser,
        component: ManageUser,
        layout: AdminLayout,
        onlyAdmin: true
    },
    {
        path: config.routes.adminOrder,
        component: ManageOrder,
        layout: AdminLayout,
        onlyAdmin: true
    },
    {
        path: config.routes.adminOrderDetail,
        component: ManageOrderDetail,
        layout: AdminLayout,
        onlyAdmin: true
    },
    {
        path: config.routes.adminProduct,
        component: ManageProduct,
        layout: AdminLayout,
        onlyAdmin: true
    },
    {
        path: config.routes.adminBrand,
        component: ManageBrand,
        layout: AdminLayout,
        onlyAdmin: true
    }
]

export default routes
