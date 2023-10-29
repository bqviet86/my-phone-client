import config from '~/config'

import DefaultLayout from '~/layouts'

import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import PhoneDetail from '~/pages/PhoneDetail'
import Cart from '~/pages/Cart'
import Account, { AccountAddresses, AccountOrderDetail, AccountOrders } from '~/pages/Account'
import Checkout from '~/pages/Checkout'
import OrderSuccess from '~/pages/OrderSuccess'
import ManageUser from '~/pages/Admin/pages/ManageUser'
import AdminLayout from '~/layouts/AdminLayout/AdminLayout'
import ManageOrder from '~/pages/Admin/pages/ManageOrder'
import ManageProduct from '~/pages/Admin/pages/ManageProduct'
import ManageBrand from '~/pages/Admin/pages/ManageBrand'

// Thêm unnecessary: true để báo là route này khi đã đăng nhập thì không cần truy cập nữa -> điều hướng về home
// Thêm protected: true để báo là route này cần phải đăng nhập mới được truy cập -> điều hướng về login
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
                protected: true,
                children: [
                    {
                        path: config.routes.accountOrderDetail,
                        component: AccountOrderDetail,
                        protected: true
                    }
                ]
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
        path: config.routes.orderSuccess,
        component: OrderSuccess,
        layout: DefaultLayout,
        protected: true
    },
    {
        path: config.routes.adminUser,
        component: ManageUser,
        layout: AdminLayout,
        protected: false
    },
    {
        path: config.routes.adminOrder,
        component: ManageOrder,
        layout: AdminLayout,
        protected: false
    },
    {
        path: config.routes.adminProduct,
        component: ManageProduct,
        layout: AdminLayout,
        protected: false
    },
    {
        path: config.routes.adminBrand,
        component: ManageBrand,
        layout: AdminLayout,
        protected: false
    }
]

export default routes
