import { useState } from 'react';

const useInvestment = () => {
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
   * Get all active investment plans
   * @returns {Promise<Array>} Array of investment plans
   */
  const getInvestmentPlans = async () => {
    return await authFetch('/api/user/plans');
  };

  /**
   * Start a new investment
   * @param {Object} investmentData - Investment details
   * @param {string} investmentData.planId - ID of the investment plan
   * @param {number} investmentData.amount - Amount to invest
   * @returns {Promise<Object>} Investment details and updated user balance
   */
  const startInvestment = async ({ planId, amount }) => {
    return await authFetch('/api/user/invest', {
      method: 'POST',
      body: JSON.stringify({ planId, amount })
    });
  };

  /**
   * Get all active investments for the current user
   * @returns {Promise<Array>} Array of active investments with plan details
   */
  const getActiveInvestments = async () => {
  try {
    // First get the active investments
    const investmentsResponse = await authFetch('/api/user/investments/active');
    if (!investmentsResponse?.success) return { success: false, error: 'Failed to fetch investments' };

    // Then get all plans
    const plansResponse = await authFetch('/api/user/plans');
    if (!plansResponse?.success) return { success: false, error: 'Failed to fetch plans' };

    // Merge plan details with investments
    const investmentsWithPlans = investmentsResponse.data.map(investment => {
      const planDetails = plansResponse.data.find(plan => plan.id === investment.planId);
      return {
        ...investment,
        plan: planDetails || null
      };
    });

    return {
      success: true,
      data: investmentsWithPlans
    };
  } catch (error) {
    console.error('Error fetching active investments:', error);
    return { success: false, error: 'Internal server error' };
  }
};

  return {
    loading,
    error,
    getInvestmentPlans,
    startInvestment,
    getActiveInvestments,
  };
};

export default useInvestment;