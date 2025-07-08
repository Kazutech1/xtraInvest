import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminWithdrawals from '../hooks/useAdminWithdrawals';
import { EyeIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon, NoSymbolIcon, ClockIcon, ArrowPathRoundedSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const AdminWithdrawals = () => {
  const {
    withdrawals,
    loading,
    error,
    pagination,
    getAllWithdrawals,
    updateWithdrawalStatus,
    deleteWithdrawal
  } = useAdminWithdrawals();

  const [filters, setFilters] = useState({
    status: '',
    userId: '',
    page: 1,
    limit: 10
  });
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllWithdrawals(filters.page, filters.limit, filters.status, filters.userId);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1
    }));
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (window.confirm(`Are you sure you want to update this withdrawal to ${newStatus}?`)) {
      await updateWithdrawalStatus(id, newStatus);
      getAllWithdrawals(filters.page, filters.limit, filters.status, filters.userId);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this withdrawal?')) {
      await deleteWithdrawal(id);
      if (selectedWithdrawal?.id === id) {
        setSelectedWithdrawal(null);
      }
      getAllWithdrawals(filters.page, filters.limit, filters.status, filters.userId);
    }
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const statusOptions = ['pending', 'completed', 'rejected', 'processing', 'completed', 'failed'];

  const statusIcons = {
    pending: <ClockIcon className="h-4 w-4 text-yellow-500" />,
    completed: <CheckBadgeIcon className="h-4 w-4 text-green-500" />,
    rejected: <NoSymbolIcon className="h-4 w-4 text-red-500" />,
    processing: <ArrowPathRoundedSquareIcon className="h-4 w-4 text-blue-500" />,
    completed: <CheckBadgeIcon className="h-4 w-4 text-purple-500" />,
    failed: <NoSymbolIcon className="h-4 w-4 text-gray-500" />
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Withdrawal Requests</h2>
          
          <div className="flex space-x-3">
            <button
              onClick={() => getAllWithdrawals(filters.page, filters.limit, filters.status, filters.userId)}
              className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 transition-colors"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-200"
            >
              <option value="">All Statuses</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User ID</label>
            <input
              type="text"
              name="userId"
              placeholder="Filter by user ID"
              value={filters.userId}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({
                status: '',
                userId: '',
                page: 1,
                limit: 10
              })}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Withdrawals Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading && !withdrawals.length ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  </td>
                </tr>
              ) : withdrawals.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No withdrawals found
                  </td>
                </tr>
              ) : (
                withdrawals.map((withdrawal) => (
                  <tr 
                    key={withdrawal.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{withdrawal.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300">
                          {withdrawal.user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {withdrawal.user?.username || withdrawal.userId.slice(0, 6)}...
                          </div>
                          {withdrawal.user?.email && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {withdrawal.user.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                      ${withdrawal.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {withdrawal.method || withdrawal.cryptocurrency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {statusIcons[withdrawal.status]}
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            withdrawal.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                            withdrawal.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                            withdrawal.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                            'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                          }`}
                        >
                          {withdrawal.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 items-center">
                        <button
                          onClick={() => setSelectedWithdrawal(withdrawal)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="View details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {withdrawal.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(withdrawal.id, 'completed')}
                              className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckBadgeIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(withdrawal.id, 'rejected')}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <NoSymbolIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(withdrawal.id)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing page {pagination.currentPage} of {pagination.totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={`px-4 py-2 rounded-lg flex items-center ${pagination.currentPage === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={`px-4 py-2 rounded-lg flex items-center ${pagination.currentPage === pagination.totalPages ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Withdrawal Details Modal */}
      {selectedWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Withdrawal Details</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    #{selectedWithdrawal.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedWithdrawal(null)}
                  className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* User Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">USER INFORMATION</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedWithdrawal.user?.username || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedWithdrawal.user?.email || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                        {selectedWithdrawal.userId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transaction Section */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">TRANSACTION DETAILS</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
                      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        ${selectedWithdrawal.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Method</p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedWithdrawal.method || selectedWithdrawal.cryptocurrency || 'N/A'}
                      </p>
                    </div>
                    {selectedWithdrawal.walletAddress && (
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Address</p>
                        <p className="mt-1 text-sm font-mono text-gray-900 dark:text-white break-all bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          {selectedWithdrawal.walletAddress}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                      <div className="mt-1 flex items-center">
                        {statusIcons[selectedWithdrawal.status]}
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedWithdrawal.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                            selectedWithdrawal.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                            selectedWithdrawal.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                            'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                          }`}
                        >
                          {selectedWithdrawal.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {new Date(selectedWithdrawal.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {selectedWithdrawal.updatedAt && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {new Date(selectedWithdrawal.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Details */}
                {selectedWithdrawal.details && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">ADDITIONAL DETAILS</h4>
                    <pre className="text-sm text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800 p-3 rounded overflow-x-auto">
                      {JSON.stringify(selectedWithdrawal.details, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Status Update (if pending) */}
                {selectedWithdrawal.status === 'pending' && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">UPDATE STATUS</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedWithdrawal.id, 'completed');
                          setSelectedWithdrawal(null);
                        }}
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <CheckBadgeIcon className="h-5 w-5 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedWithdrawal.id, 'rejected');
                          setSelectedWithdrawal(null);
                        }}
                        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <NoSymbolIcon className="h-5 w-5 mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedWithdrawal.id, 'processing');
                          setSelectedWithdrawal(null);
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <ArrowPathRoundedSquareIcon className="h-5 w-5 mr-2" />
                        Mark as Processing
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWithdrawals;