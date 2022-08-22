
import { HomePage } from './pages/home.page.jsx'
import { AboutPage } from './pages/about.page.jsx'
import { AdminPage } from './pages/admin.page.jsx'
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: '/about',
        component: <AboutPage />,
        label: 'about',
    }, {
        path: '/admin',
        component: <AdminPage />,
        label: 'admin',
    }
]

export default routes;