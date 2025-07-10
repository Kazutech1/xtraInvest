import React, { useState, useEffect } from "react";
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  DollarSign, 
  Headphones, 
  TrendingUp, 
  Users, 
  Wallet,
  Plus,
  Minus,
  ChevronRight,
  Link as LinkIcon,
  User,
  Check,
  Copy,
  Loader2
} from "lucide-react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import useTransactions from "../hooks/useHistory";

const Dashboard = () => {
  const [copied, setCopied] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  
  // Use the transactions hook
  const { 
    loading: transactionsLoading, 
    error: transactionsError, 
    transactions, 
    pagination,
    getTransactions 
  } = useTransactions();

  const { loading, error, getDashboard } = useUser();

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      const data = await getDashboard();
      if (data) {
        setDashboardData(data);
      }
    };

    fetchDashboardData();
    
    // Fetch recent transactions (first page, limit to 5)
    getTransactions({ page: 1, limit: 5 });
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper functions
  const getTransactionIcon = (type) => {
    const icons = {
      deposit: <ArrowDownLeft className="h-5 w-5 text-white" />,
      withdrawal: <ArrowUpRight className="h-5 w-5 text-white" />,
      referral: <Users className="h-5 w-5 text-white" />,
      profit: <TrendingUp className="h-5 w-5 text-white" />,
      investment: <TrendingUp className="h-5 w-5 text-white" />,
    };
    return icons[type] || <DollarSign className="h-5 w-5 text-white" />;
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      completed: "bg-emerald-100 text-emerald-800",
      pending: "bg-amber-100 text-amber-800",
      failed: "bg-rose-100 text-rose-800",
      rejected: "bg-rose-100 text-rose-800",
      verified: "bg-emerald-100 text-emerald-800",
      active: "bg-blue-100 text-blue-800",
    };
    
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-800"}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase()}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const levelStyles = {
      Bronze: "bg-amber-600 text-white",
      Silver: "bg-gray-400 text-white",
      Gold: "bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-900",
      Platinum: "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800",
    };
    
    return (
      <span className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-bold ${levelStyles[level] || "bg-blue-100 text-blue-800"}`}>
        {level}
      </span>
    );
  };

  // Format amount with currency
  const formatAmount = (tx) => {
    const amount = tx.amount || 0;
    const currency = tx.currency || tx.cryptocurrency || '';
    const sign = tx.type === 'deposit' ? '+' : tx.type === 'withdrawal' ? '-' : '';
    return `${sign}${amount.toLocaleString()} ${currency}`;
  };

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading dashboard</h3>
          <p className="mt-1 text-gray-500">{error}</p>
          <Link to='/auth'>
           <button
  onClick={() => {
    localStorage.removeItem('token');
    // Optional: redirect to login page or refresh the page
  }}
  className="mt-4 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Try Again
</button>
          </Link>
        </div>
      </div>
    );
  }

const referralLink = `https://www.xtrainvest.top/auth?ref=${dashboardData?.referralCode || 'yourcode'}`;
  const referralCode = dashboardData?.referralCode || 'YOURCODE';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, <span className="text-blue-600">{dashboardData?.fullName || 'User'}</span></h1>
            <div className="mt-2 flex items-center gap-3">
              {getLevelBadge(dashboardData?.currentInvestmentPlan || 'Gold')}
              <p className="text-gray-600">
                Member since {new Date(dashboardData?.memberCreationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
          {/* <button className="rounded-full bg-white p-3 text-blue-600 hover:bg-blue-50 transition-all shadow-md hover:shadow-lg">
            <Headphones className="h-5 w-5" />
          </button> */}
        </div>

        {/* Metrics Grid */}
        <div className="space-y-6">
          {/* Metrics Cards - Professional Gradient Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Balance Card */}
            <div className="rounded-xl bg-gradient-to-br from-blue-700 to-blue-600 p-5 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-blue-100">Total Balance</h3>
                <Wallet className="h-5 w-5 text-blue-200 opacity-80" />
              </div>
              <div className="mt-3">
                <p className="text-2xl font-semibold tracking-tight">${dashboardData?.totalBalance?.toLocaleString() || '0.00'}</p>
                <p className="mt-1 text-xs font-light text-blue-100">Available funds</p>
              </div>
            </div>

            {/* Profit Card */}
            <div className="rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-600 p-5 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-emerald-100">Total Profit</h3>
                <TrendingUp className="h-5 w-5 text-emerald-200 opacity-80" />
              </div>
              <div className="mt-3">
                <p className="text-2xl font-semibold tracking-tight">+${dashboardData?.totalProfit?.toLocaleString() || '0.00'}</p>
                <p className="mt-1 text-xs font-light text-emerald-100">All-time earnings</p>
              </div>
            </div>

            {/* Referral Earnings */}
            <div className="rounded-xl bg-gradient-to-br from-violet-700 to-violet-600 p-5 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-violet-100">Referral Earnings</h3>
                <DollarSign className="h-5 w-5 text-violet-200 opacity-80" />
              </div>
              <div className="mt-3">
                <p className="text-2xl font-semibold tracking-tight">${dashboardData?.referralEarnings?.toLocaleString() || '0.00'}</p>
                <p className="mt-1 text-xs font-light text-violet-100">From referrals</p>
              </div>
            </div>

            {/* Referral Count */}
            <div className="rounded-xl bg-gradient-to-br from-amber-700 to-amber-600 p-5 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-amber-100">Total Referrals</h3>
                <Users className="h-5 w-5 text-amber-200 opacity-80" />
              </div>
              <div className="mt-3">
                <p className="text-2xl font-semibold tracking-tight">{dashboardData?.referralNumber || '0'}</p>
                <p className="mt-1 text-xs font-light text-amber-100">Active referrals</p>
              </div>
            </div>
          </div>

          {/* Referral Section */}
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Referral Link</label>
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(referralLink)}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Share this link to earn referral bonuses</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="text"
                    readOnly
                    value={referralCode}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(referralCode)}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Or share this code directly</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-2 rounded-lg bg-gray-50 p-2">
              <Link to='/deposit'>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  <Plus className="h-4 w-4" />
                  Deposit
                </button>
              </Link>
              <Link to='/withdrawal'>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                  <Minus className="h-4 w-4" />
                  Withdraw
                </button>
              </Link>
              <Link to='/invest'>
                <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                  <TrendingUp className="h-4 w-4" />
                  Invest
                </button>
              </Link>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-wrap items-center gap-2 rounded-lg bg-gray-50 p-2">
              <Link to='/profile'>
                <button className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                  <User className="h-4 w-4" />
                  Profile
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="rounded-2xl bg-white p-6 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
              <p className="text-gray-500">Your latest activities</p>
            </div>
            <Link to='/history'>
              <button className="flex items-center text-blue-600 font-medium hover:text-blue-800">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </Link>
          </div>
          
          {transactionsLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : transactionsError ? (
            <div className="rounded-lg bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading transactions</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {transactionsError}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={`recent-${transaction.id}`} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                      transaction.type === "deposit" ? "bg-emerald-500" :
                      transaction.type === "withdrawal" ? "bg-rose-500" :
                      transaction.type === "investment" ? "bg-blue-500" :
                      "bg-purple-500"
                    }`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 capitalize">
                        {transaction.type === 'deposit' ? 'Deposit' : 
                         transaction.type === 'withdrawal' ? 'Withdrawal' : 
                         transaction.type === 'investment' ? 'Investment' : 'Transaction'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(transaction.createdAt || transaction.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      transaction.type === "withdrawal" ? "text-rose-600" : "text-emerald-600"
                    }`}>
                      {formatAmount(transaction)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;