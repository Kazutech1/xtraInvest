// src/hooks/useUser.js
import { useState } from 'react';

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Helper function for authenticated requests
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get user dashboard data
  const getDashboard = async () => {
    return await authFetch('/api/user/dashboard');
  };

  

  // Get user profile
  const getProfile = async () => {
    return await authFetch('/api/user/profile');
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    return await authFetch('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  };

  // Get user referrals
  const getReferrals = async () => {
    return await authFetch('/api/user/referrals');
  };

  return {
    loading,
    error,
    getDashboard,
    getProfile,
    updateProfile,
    getReferrals,
  };
};

export default useUser;