import { useState } from 'react';

const useProfile = () => {
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
        throw new Error(data.error || data.message || 'Request failed');
      }

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get user profile
   * @returns {Promise<Object>} User profile data
   */
  const getProfile = async () => {
    return await authFetch('/api/user/profile');
  };

  /**
   * Update user profile
   * @param {Object} profileData - Profile update data
   * @param {string} [profileData.fullName] - New full name
   * @param {string} [profileData.username] - New username
   * @param {string} [profileData.email] - New email
   * @param {string} [profileData.phoneNumber] - New phone number
   * @param {string} [profileData.password] - New password
   * @returns {Promise<Object>} Updated user data
   */
  const updateProfile = async (profileData) => {
    return await authFetch('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  };

  return {
    loading,
    error,
    getProfile,
    updateProfile,
  };
};

export default useProfile;