import { Navigate, Outlet } from 'react-router';

import { useAuthStore } from '@/stores/authStore';

function PrivateRoute() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
