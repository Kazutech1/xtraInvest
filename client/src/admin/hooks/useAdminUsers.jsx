import { useState } from 'react';
import useAdminAuth from './useAdminAuth';

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const { getAdminData } = useAdminAuth();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const getAllUsers = async (page = 1, limit = 20, search = '') => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(
        `${baseUrl}/api/admin/users?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch users');
      }

      setUsers(data.data);
      setPagination(data.pagination);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch user');
      }

      setUser(data.data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user');
      }

      // Update the user in the local state if it exists
      setUser(data.data);
      setUsers(users.map(u => u.id === id ? data.data : u));

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      // Remove the user from the local state
      setUsers(users.filter(u => u.id !== id));
      setUser(null);

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    user,
    loading,
    error,
    pagination,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  };
};

export default useAdminUsers;