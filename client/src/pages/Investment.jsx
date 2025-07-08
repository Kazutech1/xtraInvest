import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Wallet, AlertTriangle, ExternalLink, Copy, Check, X, 
  CheckCircle, XCircle, TrendingUp, Clock, Calendar, Zap, ChevronDown, ChevronUp 
} from 'lucide-react';
import useUser from '../hooks/useUser';
import useInvestment from '../hooks/usePlans';

const InvestmentPage = () => {
  // Form states
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  
  // Popup states
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [investmentResult, setInvestmentResult] = useState(null);

  // Mobile states
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' or 'active'
  const [showMobilePlanDetails, setShowMobilePlanDetails] = useState(null);

  // Initialize hooks
  const {
    loading,
    error,
    getInvestmentPlans,
    startInvestment,
    getActiveInvestments
  } = useInvestment();
  const { getDashboard } = useUser();

  // Data states
  const [plans, setPlans] = useState([]);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [dashboardRes, plansRes, investmentsRes] = await Promise.all([
          getDashboard(),
          getInvestmentPlans(),
          getActiveInvestments()
        ]);
        
        setUserBalance(dashboardRes.totalBalance);
        if (plansRes?.success) setPlans(plansRes.data);
        if (investmentsRes?.success) setActiveInvestments(investmentsRes.data);
        console.log(investmentsRes.data);
        
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-hide popups after 5 seconds
  useEffect(() => {
    if (showSuccessPopup || showErrorPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup, showErrorPopup]);

  // Helper functions
  const handleMaxAmount = () => setAmount(userBalance.toString());

  const showSuccessMessage = (message, result) => {
    setPopupMessage(message);
    setInvestmentResult(result);
    setShowSuccessPopup(true);
    setShowErrorPopup(false);
  };

  const showErrorMessage = (message) => {
    setPopupMessage(message);
    setShowErrorPopup(true);
    setShowSuccessPopup(false);
  };

  const resetForm = () => {
    setAmount("");
    setSelectedPlan(null);
  };

  const handleSubmit = async () => {
    if (!isValidInvestment()) return;

    try {
      const result = await startInvestment({
        planId: selectedPlan.id,
        amount: parseFloat(amount)
      });
      
      if (result) {
        // Update user balance and active investments
        setUserBalance(prev => prev - parseFloat(amount));
        const investmentsRes = await getActiveInvestments();
        if (investmentsRes?.success) setActiveInvestments(investmentsRes.data);
        
        showSuccessMessage(
          `Investment started successfully! Your ${amount} USD will earn ${selectedPlan.profitRate}% daily for ${selectedPlan.duration} hours.`,
          result
        );
        
        resetForm();
      }
    } catch (err) {
      showErrorMessage(
        error || "Failed to start investment. Please try again or contact support."
      );
    }
  };

  const isValidInvestment = () => {
    if (!selectedPlan) return false;
    const investmentAmount = parseFloat(amount) || 0;
    return (
      investmentAmount > 0 &&
      investmentAmount >= selectedPlan.minAmount &&
      (!selectedPlan.maxAmount || investmentAmount <= selectedPlan.maxAmount) &&
      investmentAmount <= userBalance
    );
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  const formatDuration = (hours) => {
    if (hours < 24) return `${hours} hours`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center justify-center rounded-full p-2 hover:bg-gray-200 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Investment Plans</h1>
            <p className="text-gray-600">Choose a plan or view active investments</p>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 font-medium ${activeTab === 'plans' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('plans')}
          >
            Investment Plans
          </button>
          <button
            className={`flex-1 py-3 font-medium ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('active')}
          >
            Active ({activeInvestments.length})
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Plans List - Desktop */}
          <div className="hidden md:block lg:col-span-2">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`rounded-xl p-6 shadow-lg transition-all cursor-pointer border-2 ${
                      selectedPlan?.id === plan.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-transparent bg-white hover:border-blue-200'
                    }`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        <TrendingUp className="h-4 w-4" />
                        {plan.profitRate}% daily
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Duration: {formatDuration(plan.duration)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-gray-500" />
                        <span>
                          Amount: ${plan.minAmount} - {plan.maxAmount ? `$${plan.maxAmount}` : 'Unlimited'}
                        </span>
                      </div>
                      {plan.description && (
                        <p className="pt-2 text-gray-700">{plan.description}</p>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Expected Profit</span>
                        <span className="font-medium">
                          ${(plan.minAmount * (plan.profitRate / 100) * (plan.duration / 24)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Investments - Desktop */}
          <div className="hidden md:block">
            <div className="rounded-xl bg-white p-6 shadow-lg sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Active Investments</h2>
              {isLoading ? (
                <LoadingSpinner />
              ) : activeInvestments.length > 0 ? (
                <div className="space-y-4">
                  {activeInvestments.map((investment) => (
                    <div key={investment.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{investment.plan.name}</h3>
                          <p className="text-sm text-gray-600">${investment.amount}</p>
                        </div>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          Active
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 space-y-1">
                        <p>Started: {formatDate(investment.startDate)}</p>
                        <p>Ends: {formatDate(investment.endDate)}</p>
                        <p>Expected: ${investment.expectedProfit.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No active investments</p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Views */}
          <div className="md:hidden">
            {activeTab === 'plans' ? (
              isLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="rounded-xl bg-white p-4 shadow">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowMobilePlanDetails(showMobilePlanDetails === plan.id ? null : plan.id)}
                      >
                        <h3 className="font-bold text-gray-900">{plan.name}</h3>
                        {showMobilePlanDetails === plan.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      
                      {showMobilePlanDetails === plan.id && (
                        <div className="mt-3 space-y-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            <span>{plan.profitRate}% daily profit</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Duration: {formatDuration(plan.duration)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-gray-500" />
                            <span>Amount: ${plan.minAmount} - {plan.maxAmount ? `$${plan.maxAmount}` : 'Unlimited'}</span>
                          </div>
                          
                          <button
                            onClick={() => setSelectedPlan(plan)}
                            className="w-full mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                          >
                            Select Plan
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              isLoading ? (
                <LoadingSpinner />
              ) : activeInvestments.length > 0 ? (
                <div className="space-y-4">
                  {activeInvestments.map((investment) => (
                    <div key={investment.id} className="rounded-xl bg-white p-4 shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{investment.plan.name}</h3>
                          <p className="text-sm text-gray-600">${investment.amount}</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Active
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 space-y-1">
                        <p>Started: {formatDate(investment.startDate)}</p>
                        <p>Ends: {formatDate(investment.endDate)}</p>
                        <p>Expected: ${investment.expectedProfit.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No active investments</p>
                </div>
              )
            )}
          </div>

          {/* Investment Form (Desktop and Mobile) */}
          {selectedPlan && (
            <div className="md:col-span-3 lg:col-span-1">
              <div className="rounded-xl bg-white p-6 shadow-lg md:sticky md:top-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Start Investment</h2>
                  <p className="text-gray-500">
                    Configure your {selectedPlan.name} investment
                  </p>
                </div>
                
                <div className="space-y-6">
                  {/* Selected Plan Summary */}
                  <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-blue-800">{selectedPlan.name}</h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {selectedPlan.profitRate}% daily
                      </span>
                    </div>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>Duration: {formatDuration(selectedPlan.duration)}</p>
                      <p>Min: ${selectedPlan.minAmount}</p>
                      {selectedPlan.maxAmount && <p>Max: ${selectedPlan.maxAmount}</p>}
                    </div>
                  </div>

                  {/* Investment Amount */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">Investment Amount ($)</label>
                      <button
                        type="button"
                        onClick={handleMaxAmount}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Max: ${userBalance.toFixed(2)}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 py-2 pl-3 pr-12 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        USD
                      </div>
                    </div>
                    {amount && (
                      <p className="text-xs text-gray-500">
                        {parseFloat(amount) < selectedPlan.minAmount ? (
                          <span className="text-red-600">
                            Minimum investment: ${selectedPlan.minAmount}
                          </span>
                        ) : selectedPlan.maxAmount && parseFloat(amount) > selectedPlan.maxAmount ? (
                          <span className="text-red-600">
                            Maximum investment: ${selectedPlan.maxAmount}
                          </span>
                        ) : (
                          <span>
                            You'll earn: ${(parseFloat(amount) * (selectedPlan.profitRate / 100) * (selectedPlan.duration / 24)).toFixed(2)}
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* User Balance */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Wallet className="h-4 w-4" />
                    Available Balance: ${userBalance.toFixed(2)}
                  </div>

                  {parseFloat(amount) > userBalance && (
                    <div className="rounded-lg bg-red-50 p-3 text-red-800">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">
                          Insufficient balance. You need ${(parseFloat(amount) - userBalance).toFixed(2)} more.
                        </p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-red-800">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isValidInvestment() || loading}
                    className={`w-full rounded-lg py-3 px-4 font-medium text-white transition-colors flex items-center justify-center ${
                      isValidInvestment()
                        ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      `Invest in ${selectedPlan.name}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Investment Started!</h3>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p>{popupMessage}</p>
              
              {investmentResult && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>${amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{formatDuration(selectedPlan.duration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Profit:</span>
                    <span className="text-green-600 font-medium">
                      ${(parseFloat(amount) * (selectedPlan.profitRate / 100) * (selectedPlan.duration / 24)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>End Date:</span>
                    <span>
                      {new Date(Date.now() + selectedPlan.duration * 60 * 60 * 1000).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={closePopup}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Investment Failed</h3>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p>{popupMessage}</p>
              
              <div className="bg-red-50 rounded-lg p-3 text-red-800">
                <p className="text-sm">
                  <strong>Possible reasons:</strong><br />
                  • Insufficient balance<br />
                  • Invalid plan selection<br />
                  • Amount outside plan limits<br />
                  • Server temporarily unavailable
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={closePopup}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPage;