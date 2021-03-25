import Layout from '@/layouts/BasicLayout'
import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'

const routerConfig = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/dashboard',
        component: Dashboard,
      },
    ],
  },
]

export default routerConfig
