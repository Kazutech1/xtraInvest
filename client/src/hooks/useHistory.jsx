// src/hooks/useTransactions.js
import { useState } from 'react';

const useTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    totalCount: 0
  });
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
        throw new Error(data.message || 'Request failed');
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
   * Fetch transaction history
   * @param {Object} params - Query parameters
   * @param {string} [params.type] - Transaction type (deposit, withdrawal, investment, all)
   * @param {number} [params.page] - Page number
   * @param {number} [params.limit] - Items per page
   */
  const getTransactions = async ({ type, page = 1, limit = 20 } = {}) => {
    const queryParams = new URLSearchParams();
    if (type) queryParams.append('type', type);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);

    const data = await authFetch(`/api/user/transactions?${queryParams.toString()}`);

    console.log(data);
    
    
    if (data) {
      setTransactions(data.transactions);
      setPagination({
        page: data.page,
        pages: data.pages,
        totalCount: data.totalCount
      });
    }

    return data;
  };

  // Get more transactions (next page)
  const getMoreTransactions = async () => {
    if (pagination.page >= pagination.pages) return;
    
    const nextPage = pagination.page + 1;
    const queryParams = new URLSearchParams();
    queryParams.append('page', nextPage);

    const data = await authFetch(`/api/user/transactions?${queryParams.toString()}`);
    
    if (data) {
      setTransactions(prev => [...prev, ...data.transactions]);
      setPagination({
        page: data.page,
        pages: data.pages,
        totalCount: data.totalCount
      });
    }

    return data;
  };

  // Filter transactions by type
  const filterTransactions = async (type) => {
    return await getTransactions({ type, page: 1 });
  };

  return {
    loading,
    error,
    transactions,
    pagination,
    getTransactions,
    getMoreTransactions,
    filterTransactions,
    refetch: () => getTransactions({ page: pagination.page })
  };
};

export default useTransactions;