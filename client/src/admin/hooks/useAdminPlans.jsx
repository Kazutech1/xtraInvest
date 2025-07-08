import { useState } from 'react';
import useAdminAuth from './useAdminAuth';

const useAdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getAdminData } = useAdminAuth();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const getAllPlans = async (isActive) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const url = `${baseUrl}/api/admin/plans${isActive !== undefined ? `?isActive=${isActive}` : ''}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch investment plans');
      }

      setPlans(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPlan = async (planData) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(planData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create investment plan');
      }

      // Add the new plan to the local state
      setPlans([...plans, data.plan]);

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (id, planData) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/plans/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(planData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update investment plan');
      }

      // Update the plan in the local state
      setPlans(plans.map(plan => 
        plan.id === id ? { ...plan, ...planData } : plan
      ));

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const admin = getAdminData();
      if (!admin) throw new Error('Not authenticated');

      const response = await fetch(`${baseUrl}/api/admin/plans/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete investment plan');
      }

      // Remove the plan from the local state
      setPlans(plans.filter(plan => plan.id !== id));

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    plans,
    loading,
    error,
    getAllPlans,
    createPlan,
    updatePlan,
    deletePlan,
  };
};

export default useAdminPlans;