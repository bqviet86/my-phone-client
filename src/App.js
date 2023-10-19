import React from 'react'
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import Wrapper from './Wrapper'
import config from './config'
import { userSelector } from './redux/selectors'
import routes from './routes'

function App() {
    const currentUser = useSelector(userSelector)

    const renderRoutes = (routes) => {
        return routes.map((route, index) => {
            const isParent = !!route.children && route.children.length > 0
            const Layout = route.layout || React.Fragment
            const Page = route.component

            let element = (
                <Layout>
                    <Page />
                </Layout>
            )

            // Điều hướng đến trang chủ nếu đã đăng nhập mà truy cập vào các trang không cần thiết như login, register, ...
            if (currentUser && route.unnecessary) {
                element = <Navigate to={config.routes.home} />
            }

            // Điều hướng đến trang login nếu chưa đăng nhập mà truy cập vào các trang đuợc bảo vệ như cart, account, ...
            if (!currentUser && route.protected) {
                element = <Navigate to={config.routes.login} />
            }

            return (
                <Route key={index} path={route.path} element={element}>
                    {isParent && renderRoutes(route.children)}
                </Route>
            )
        })
    }

    return (
        <div className='App'>
            <Router>
                <>
                    <Toaster position='top-right' reverseOrder={false} />
                    <Wrapper>{renderRoutes(routes)}</Wrapper>
                </>
            </Router>
        </div>
    )
}

export default App
