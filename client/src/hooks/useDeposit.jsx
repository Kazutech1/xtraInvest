// src/hooks/useDeposit.js
import { useState } from 'react';

const useDeposit = () => {
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

  // Special handler for file uploads
  const authFileUpload = async (url, formData) => {
    const token = localStorage.getItem('token');
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Upload failed');
      }

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get deposit information (wallets, minimum amount, etc.)
  const getDepositInfo = async () => {
    return await authFetch('/api/deposit/info');
  };

  // Submit deposit proof
  const submitDepositProof = async (depositData) => {
    // Handle file upload separately
    if (depositData.proofImage) {
      const formData = new FormData();
      formData.append('amount', depositData.amount);
      formData.append('currency', depositData.currency);
      if (depositData.txHash) {
        formData.append('txHash', depositData.txHash);
      }
      formData.append('proofImage', depositData.proofImage);

      return await authFileUpload('/api/deposit/submit', formData);
    } else {
      return await authFetch('/api/deposit/submit', {
        method: 'POST',
        body: JSON.stringify(depositData)
      });
    }
  };

  // // Get deposit history
  // const getDepositHistory = async () => {
  //   return await authFetch('/api/deposit/history');
  // };

  // // Get a specific deposit
  // const getDeposit = async (depositId) => {
  //   return await authFetch(`/api/deposit/${depositId}`);
  // };

  return {
    loading,
    error,
    getDepositInfo,
    submitDepositProof,
    // getDepositHistory,
    // getDeposit,
  };
};

export default useDeposit;