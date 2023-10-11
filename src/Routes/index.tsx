import { useRoutes } from 'react-router-dom';
import Login from '../components/Login';
import ProtectedRoute from './ProtectedRoute';
import Main from '../components/Main';

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Main />
        </ProtectedRoute>
      ),
      children: [],
    },
    {
      path: '/login',
      element: <Login />,
      children: [],
    },
  ]);
};

export default Routes;
