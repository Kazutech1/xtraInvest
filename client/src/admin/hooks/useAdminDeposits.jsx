// src/hooks/useAdminDeposits.js
import { useState } from 'react';
import useAdminAuth from './useAdminAuth';

const useAdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [deposit, setDeposit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const { getAdminData } = useAdminAuth();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Get all deposits with pagination and filtering
  const getAllDeposits = async (page = 1, limit = 20, status = '', userId = '') => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      let url = `${baseUrl}/api/admin/deposits?page=${page}&limit=${limit}`;
      if (status) url += `&status=${status}`;
      if (userId) url += `&userId=${userId}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const data = await response.json();
            console.log(data);


      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch deposits');
      }

      setDeposits(data);
      setPagination(data.pagination || {});
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get a single deposit by ID
  const getDepositById = async (depositId) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/deposits/${depositId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const data = await response.json();
      console.log(data);
      

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch deposit');
      }

      setDeposit(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Verify or reject a deposit
  const verifyDeposit = async (depositId, status, adminNote = '') => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/deposits/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({
          depositId,
          status,
          adminNote
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify deposit');
      }

      // Update the deposit in the local state if it exists
      setDeposit(data.deposit);
      setDeposits(deposits.map(d => 
        d.id === depositId ? { ...d, status, verifiedAt: status === 'verified' ? new Date() : null } : d
      ));

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    deposits,
    deposit,
    loading,
    error,
    pagination,
    getAllDeposits,
    getDepositById,
    verifyDeposit,
  };
};

export default useAdminDeposits;