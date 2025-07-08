// src/hooks/useAdminWallets.js
import { useState } from 'react';

const useAdminWallets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('adminToken');
    
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
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAdminWallets = async () => {
    try {
      return await authFetch('/api/admin/wallets');
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
      return [];
    }
  };

  const addAdminWallet = async (walletData) => {
    try {
      return await authFetch('/api/admin/wallets', {
        method: 'POST',
        body: JSON.stringify({
          currency: walletData.currency,
          address: walletData.address,
          network: walletData.network,
          isActive: walletData.isActive
        })
      });
    } catch (error) {
      console.error("Failed to add wallet:", error);
      throw error;
    }
  };

  const updateAdminWallet = async (walletId, walletData) => {
    try {
      return await authFetch(`/api/admin/wallets/${walletId}`, {
        method: 'PUT',
        body: JSON.stringify({
          currency: walletData.currency,
          address: walletData.address,
          network: walletData.network,
          isActive: walletData.isActive
        })
      });
    } catch (error) {
      console.error("Failed to update wallet:", error);
      throw error;
    }
  };

  const deleteAdminWallet = async (walletId) => {
    try {
      return await authFetch(`/api/admin/wallets/${walletId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error("Failed to delete wallet:", error);
      throw error;
    }
  };

  return {
    loading,
    error,
    getAdminWallets,
    addAdminWallet,
    updateAdminWallet,
    deleteAdminWallet,
  };
};

export default useAdminWallets;