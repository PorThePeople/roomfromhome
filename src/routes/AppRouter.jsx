import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router';
import App from '../App';
import Login from '../pages/Login';
import useUserStore from '../stores/userStore';
import Rooms from '../pages/Rooms';
import Leases from '../pages/Leases';
import Tenants from '../pages/Tenants';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';

const guestRouter = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      { path: 'rooms', element: <Rooms /> },
      { path: 'tenants', element: <Tenants /> },
      { path: 'leases', element: <Leases /> },
      { path: 'users', element: <Users /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

export default function AppRouter() {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider key={user?.id} router={finalRouter} />;
}
