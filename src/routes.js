
import { HomePage } from './pages/home.page.jsx'
import { AboutPage } from './pages/about.page.jsx'
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
    }
]

export default routes;