
import { HomePage } from '../pages/home.page.jsx'
import { LoginPage } from '../pages/login.page.jsx'
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },

    {
        path: '/login',
        component: <LoginPage />,
        label: 'login',
    },
    {
        path: '/v2',
        component: <HomePage />,
        label: 'test',
    }
]

export default routes;