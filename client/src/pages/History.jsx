import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  ChevronDown, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  ArrowUpRight, 
  ArrowDownLeft,
  TrendingUp
} from 'lucide-react';
import useTransactions from '../hooks/useHistory';

const TransactionHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [localFilter, setLocalFilter] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    loading,
    error,
    transactions,
    pagination,
    getTransactions,
    filterTransactions
  } = useTransactions();

  // Initial data fetch
  useEffect(() => {
    getTransactions({ page, limit });
  }, []);

  // Handle filter change
  const handleFilterChange = (filter) => {
    setLocalFilter(filter);
    const type = filter === 'all' ? undefined : filter;
    filterTransactions(type);
    setPage(1);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    getTransactions({ page: newPage, limit });
  };

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.id?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (tx.currency || tx.cryptocurrency)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.txHash?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.walletAddress?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'verified':
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Pending
          </span>
        );
      case 'rejected':
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status || 'Unknown'}
          </span>
        );
    }
  };

  // Get transaction icon
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return (
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <ArrowDownLeft className="h-5 w-5" />
          </div>
        );
      case 'withdrawal':
        return (
          <div className="p-2 rounded-full bg-purple-100 text-purple-600">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        );
      case 'investment':
        return (
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <TrendingUp className="h-5 w-5" />
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-gray-100 text-gray-600">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        );
    }
  };

  // Format amount with currency
  const formatAmount = (tx) => {
    const amount = tx.amount || 0;
    const currency = tx.currency || tx.cryptocurrency || '';
    const sign = tx.type === 'deposit' ? '+' : tx.type === 'withdrawal' ? '-' : '';
    return `${sign}${amount.toLocaleString()} ${currency}`;
  };

  // Get transaction details for display
  const getTransactionDetails = (tx) => {
    switch (tx.type) {
      case 'deposit':
        return {
          title: 'Deposit',
          subtitle: tx.txHash ? `TX: ${tx.txHash.substring(0, 8)}...` : 'Deposit',
          address: tx.txHash || 'N/A'
        };
      case 'withdrawal':
        return {
          title: 'Withdrawal',
          subtitle: tx.walletAddress ? `To: ${tx.walletAddress.substring(0, 8)}...` : 'Withdrawal',
          address: tx.walletAddress || 'N/A'
        };
      case 'investment':
        return {
          title: 'Investment',
          subtitle: `Plan: ${tx.planId?.substring(0, 8)}...` || 'Investment',
          address: `Ends: ${formatDate(tx.endDate)}`
        };
      default:
        return {
          title: 'Transaction',
          subtitle: tx.id,
          address: 'N/A'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
                       onClick={() => window.history.back()}
                       className="flex items-center justify-center rounded-full p-2 hover:bg-gray-200 transition-colors"
                     >
                       <ArrowLeft className="h-5 w-5" />
                     </button>  
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
              <p className="text-gray-600">View all your transaction activities</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'verified', 'pending', 'rejected', 'active'].map((item) => (
              <button
                key={item}
                onClick={() => handleFilterChange(item)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
                  localFilter === item
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item}
              </button>
            ))}
          </div> */}
          
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={handleSearch}
              className="block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && !transactions.length && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading transactions</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        {!loading && !error && (
          <div className="overflow-hidden rounded-xl bg-white shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => {
                      const details = getTransactionDetails(transaction);
                      return (
                        <tr key={`${transaction.type}-${transaction.id}`} className="hover:bg-gray-50 transition-colors">
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              {getTransactionIcon(transaction.type)}
                              <div className="ml-4">
                                <div className="font-medium text-gray-900 capitalize">{details.title}</div>
                                <div className="text-sm text-gray-500">{details.subtitle}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className={`text-sm font-medium ${
                              transaction.type === 'deposit' ? 'text-green-600' : 
                              transaction.type === 'withdrawal' ? 'text-red-600' : 'text-gray-900'
                            }`}>
                              {formatAmount(transaction)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {getStatusBadge(transaction.status)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="mr-1 h-3 w-3" />
                              {formatDate(transaction.createdAt || transaction.startDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 font-mono truncate max-w-[150px]">
                              {details.address}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No transactions found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination.pages > 1 && (
          <div className="flex items-center justify-between rounded-lg bg-white px-6 py-3 shadow">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(page * limit, pagination.totalCount)}</span> of{' '}
                  <span className="font-medium">{pagination.totalCount}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                  </button>
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          page === pageNum
                            ? 'bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button 
                    onClick={() => handlePageChange(Math.min(pagination.pages, page + 1))}
                    disabled={page === pagination.pages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;