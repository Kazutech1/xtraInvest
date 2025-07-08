import { useState } from 'react';
import useAdminAuth from './useAdminAuth';

const useAdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const { getAdminData } = useAdminAuth();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const getAllWithdrawals = async (page = 1, limit = 20, status = '', userId = '') => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(
        `${baseUrl}/api/admin/withdrawals?page=${page}&limit=${limit}&status=${status}&userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch withdrawals');
      }

      setWithdrawals(data.data);
      setPagination(data.pagination);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateWithdrawalStatus = async (id, status) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/withdrawals/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update withdrawal status');
      }

      // Update the withdrawal in the local state
      setWithdrawals(withdrawals.map(withdrawal => 
        withdrawal.id === id ? { ...withdrawal, status } : withdrawal
      ));

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteWithdrawal = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/withdrawals/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete withdrawal');
      }

      // Remove the withdrawal from the local state
      setWithdrawals(withdrawals.filter(withdrawal => withdrawal.id !== id));

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    withdrawals,
    loading,
    error,
    pagination,
    getAllWithdrawals,
    updateWithdrawalStatus,
    deleteWithdrawal,
  };
};

export default useAdminWithdrawals;