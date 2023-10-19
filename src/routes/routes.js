import config from '~/config'

import DefaultLayout from '~/layouts'

import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import PhoneDetail from '~/pages/PhoneDetail'
import Cart from '~/pages/Cart'

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
        redirect: config.routes.home
    },
    {
        path: config.routes.register,
        component: Register,
        layout: DefaultLayout,
        redirect: config.routes.home
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
        protected: true,
        redirect: config.routes.login
    }

    // /account /account/orders /account/orders/:order_id /account/addresses
]

export default routes
