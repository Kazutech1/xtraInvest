import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const loginAdmin = async (username, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/api/admin/adlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and admin data
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data.admin));

      // Redirect to admin dashboard
      navigate('/admin');

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/auth');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('adminToken');
  };

  const getAdminData = () => {
    const adminData = localStorage.getItem('adminData');
    return adminData ? JSON.parse(adminData) : null;
  };

  return {
    loading,
    error,
    loginAdmin,
    logoutAdmin,
    isAuthenticated,
    getAdminData,
  };
};

export default useAdminAuth;