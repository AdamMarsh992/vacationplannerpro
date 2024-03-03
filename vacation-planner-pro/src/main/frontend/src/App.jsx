import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Root from './pages/Root';
import Error from './Error';
import LogIn from './pages/LogIn';
import Calendar from './pages/Calendar';
import SignUp from './pages/SignUp';

const isAuthenticated = () => {
  const cookie = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith('authToken'));
  return cookie !== undefined;
};

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: isAuthenticated() ? (
          <Navigate to="/calendar" />
        ) : (
          <Navigate to="/login" />
        ),
      },
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export default function App() {
  return (
    <RouterProvider router={router}>{router.startupElement}</RouterProvider>
  );
}