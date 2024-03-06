import { createBrowserRouter } from 'react-router-dom'

import { TodoOverview } from '../screens/TodoOverview'

import { TodoSettings } from '../screens/TodoSettings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoOverview />,
  },
  {
    path: '/settings',
    element: <TodoSettings />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])

export default router
