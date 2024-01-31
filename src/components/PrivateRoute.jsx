import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const isAuthenticated = userInfo !== null && userInfo !== undefined;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
