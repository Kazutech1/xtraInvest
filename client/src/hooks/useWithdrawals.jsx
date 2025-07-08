import { useState } from 'react';

const useWithdrawal = () => {
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
        throw new Error(data.message || data.error || 'Request failed');
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
   * Create a new withdrawal request
   * @param {Object} withdrawalData - Withdrawal details
   * @param {string} withdrawalData.walletAddress - Destination wallet address
   * @param {number} withdrawalData.amount - Amount to withdraw
   * @param {string} withdrawalData.cryptocurrency - Cryptocurrency to withdraw
   */
  const createWithdrawal = async (withdrawalData) => {
    return await authFetch('/api/withdrawal', {
      method: 'POST',
      body: JSON.stringify(withdrawalData)
    });
  };

  /**
   * Get all withdrawals for the current user
   */
  const getWithdrawals = async () => {
    return await authFetch('/api/withdrawal');
  };

  /**
   * Get a specific withdrawal by ID
   * @param {string} withdrawalId - ID of the withdrawal to fetch
   */
  const getWithdrawalById = async (withdrawalId) => {
    return await authFetch(`/api/withdrawal/${withdrawalId}`);
  };

  return {
    loading,
    error,
    createWithdrawal,
    getWithdrawals,
    getWithdrawalById,
  };
};

export default useWithdrawal;