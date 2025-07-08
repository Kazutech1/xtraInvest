import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAdminAuth from './admin/hooks/useAdminAuth';

const AdminProtectedRoute = () => {
  const { isAuthenticated } = useAdminAuth();

  return isAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute ;
