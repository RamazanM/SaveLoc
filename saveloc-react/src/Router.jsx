import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import LoginPage from './page/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <div>
          Header
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <>Home</> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <>Register</> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
