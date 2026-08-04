import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const AuthenticationCheck = localStorage.getItem('isAuthenticated') === 'true';
  return AuthenticationCheck ? <Outlet /> : <Navigate to="/adminlogin" replace />;
};

export default ProtectedRoute;