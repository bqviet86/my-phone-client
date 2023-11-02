import React from 'react'
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import Wrapper from './Wrapper'
import { Role } from './constants'
import config from './config'
import { userSelector } from './redux/selectors'
import routes from './routes'
import './index.css'

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

            // Nếu đã đăng nhập mà truy cập vào các trang không cần thiết như login, register, ...
            if (route.unnecessary && currentUser) {
                if (currentUser.role === Role.Admin) {
                    element = <Navigate to={config.routes.adminUser} state={{ unnecessary: true }} />
                } else {
                    element = <Navigate to={config.routes.home} state={{ unnecessary: true }} />
                }
            }

            // Nếu chưa đăng nhập mà truy cập vào các trang đuợc bảo vệ như cart, account, ...
            if (route.protected && !currentUser) {
                element = <Navigate to={config.routes.login} state={{ protected: true }} />
            }

            // Khi truy cập vào trang chỉ dành cho admin
            if (route.onlyAdmin) {
                if (!currentUser) {
                    element = <Navigate to={config.routes.adminLogin} state={{ onlyAdmin: true }} />
                } else if (currentUser.role !== Role.Admin) {
                    element = <Navigate to={config.routes.home} state={{ onlyAdmin: true }} />
                }
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
            <Toaster
                position='bottom-right'
                toastOptions={{
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff'
                    }
                }}
            />
            <Router>
                <Wrapper>{renderRoutes(routes)}</Wrapper>
            </Router>
        </div>
    )
}

export default App
