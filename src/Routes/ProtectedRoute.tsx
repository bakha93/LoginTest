import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
type Props = {
  children: React.ReactNode;
  isAdmin?: boolean;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated === false ? <Navigate to="/login" /> : children}</>;
};

export default ProtectedRoute;
