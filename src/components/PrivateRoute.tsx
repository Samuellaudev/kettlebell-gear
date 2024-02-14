import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks'

const PrivateRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const isAuthenticated = userInfo !== null && userInfo !== undefined;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
