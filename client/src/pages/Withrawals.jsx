import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wallet, AlertTriangle, ExternalLink, Copy, Check, X, CheckCircle, XCircle } from 'lucide-react';
import useWithdrawal from '../hooks/useWithdrawals'; // Import the hook
import useUser from '../hooks/useUser';

const WithdrawalPage = () => {
  // State for form inputs
  const [amount, setAmount] = useState("");
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  
  // Popup states
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [withdrawalResult, setWithdrawalResult] = useState(null);

  // Initialize the withdrawal hook
  const {
    loading,
    error,
    createWithdrawal,
    getWithdrawals
  } = useWithdrawal();
  const { getDashboard } = useUser();

  // USDT TRC20 specific data
  const cryptoData = {
    symbol: "USDT",
    name: "Tether USD",
    network: "TRON (TRC20)",
    minWithdrawal: 10,
    fee: 10,
    icon: "₮",
    contractAddress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    explorerUrl: "https://tronscan.org/#/token20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
  };

  // Calculate transaction values
  const withdrawalAmount = Number.parseFloat(amount) || 0;
  const networkFee = cryptoData.fee;
  const totalDeduction = withdrawalAmount + networkFee;
  const remainingBalance = userBalance - totalDeduction;

  // Fetch user balance
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();
        setUserBalance(res.totalProfit);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      }
    };

    fetchDashboard();
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

  const handleMaxAmount = () => {
    const maxAmount = userBalance - networkFee;
    setAmount(maxAmount.toString());
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(cryptoData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showSuccessMessage = (message, result) => {
    setPopupMessage(message);
    setWithdrawalResult(result);
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
    setWithdrawalAddress("");
  };

  const handleSubmit = async () => {
    if (!isValidWithdrawal()) return;

    const withdrawalData = {
      walletAddress: withdrawalAddress,
      amount: withdrawalAmount,
      cryptocurrency: cryptoData.symbol,
      network: cryptoData.network
    };

    try {
      const result = await createWithdrawal(withdrawalData);
      
      if (result) {
        // Update user balance
        setUserBalance(prev => prev - totalDeduction);
        
        showSuccessMessage(
          `Withdrawal request submitted successfully! Your ${withdrawalAmount} ${cryptoData.symbol} withdrawal is being processed.`,
          result
        );
        
        // Reset form
        resetForm();
      }
    } catch (err) {
      showErrorMessage(
        error || "Failed to process withdrawal. Please try again or contact support if the issue persists."
      );
    }
  };

  const isValidWithdrawal = () => {
    return (
      withdrawalAmount > 0 &&
      withdrawalAddress &&
      withdrawalAmount >= cryptoData.minWithdrawal &&
      totalDeduction <= userBalance
    );
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center justify-center rounded-full p-2 hover:bg-gray-200 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">USDT (TRC20) Withdrawal</h1>
            <p className="text-gray-600">Withdraw Tether USD on the TRON network</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Withdrawal Request</h2>
                <p className="text-gray-500">Enter your withdrawal details carefully</p>
              </div>
              
              <form className="space-y-6">
                {/* Network Information */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Network</label>
                  <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cryptoData.icon}</span>
                      <div>
                        <p className="font-medium">{cryptoData.name} ({cryptoData.symbol})</p>
                        <p className="text-sm text-gray-500">{cryptoData.network}</p>
                      </div>
                    </div>
                    <a 
                      href={cryptoData.explorerUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      Explorer <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Wallet className="h-4 w-4" />
                    Available: {userBalance.toFixed(2)} {cryptoData.symbol}
                  </div>
                </div>

                {/* Withdrawal Amount */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Withdrawal Amount</label>
                    <button
                      type="button"
                      onClick={handleMaxAmount}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Max
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 py-2 pl-3 pr-16 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      {cryptoData.symbol}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Minimum withdrawal: {cryptoData.minWithdrawal} {cryptoData.symbol}
                  </p>
                </div>

                {/* Withdrawal Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Withdrawal Address</label>
                  <input
                    placeholder={`Enter address`}
                    value={withdrawalAddress}
                    onChange={(e) => setWithdrawalAddress(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500">
                 
                  </p>
                </div>

                {/* Contract Address (for reference) */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">USDT Contract Address</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cryptoData.contractAddress}
                      readOnly
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 text-sm font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 hover:bg-gray-100"
                      title="Copy contract address"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div> */}

                {/* Transaction Summary */}
                {amount && withdrawalAmount > 0 && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Withdrawal Amount:</span>
                        <span className="font-medium">
                          {withdrawalAmount.toFixed(2)} {cryptoData.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Network Fee:</span>
                        <span className="font-medium">
                          {networkFee} {cryptoData.symbol}
                        </span>
                      </div>
                      <hr className="my-2 border-gray-200" />
                      <div className="flex justify-between font-medium">
                        <span>Total Deduction:</span>
                        <span>
                          {totalDeduction.toFixed(2)} {cryptoData.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining Balance:</span>
                        <span className={remainingBalance < 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                          {remainingBalance.toFixed(2)} {cryptoData.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-lg bg-red-50 p-4 text-red-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {remainingBalance < 0 && (
                  <div className="rounded-lg bg-red-50 p-4 text-red-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">
                        Insufficient balance. You need at least {totalDeduction.toFixed(2)} {cryptoData.symbol} for this
                        withdrawal.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValidWithdrawal() || loading}
                  className={`w-full rounded-lg py-3 px-4 font-medium text-white transition-colors flex items-center justify-center ${
                    isValidWithdrawal()
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md"
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
                    "Submit Withdrawal Request"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Information Sidebar */}
          {/* <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-gray-900">TRC20 Network Info</h2>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    1
                  </div>
                  <p>Only send USDT to TRC20 addresses</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    2
                  </div>
                  <p>Confirm the address supports TRON network</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    3
                  </div>
                  <p>Standard network fee: {cryptoData.fee} {cryptoData.symbol}</p>
                </div>
              </div>
            </div> */}

            {/* <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Important Notice</p>
                  <p className="text-sm">
                    Withdrawals to wrong networks will result in permanent loss. Double-check the address is TRC20 compatible.
                  </p>
                </div>
              </div>
            </div> */}

            <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    Withdrawals typically process within 5-30 minutes. During network congestion, it may take longer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      

    
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
                <h3 className="text-lg font-semibold text-gray-900">Withdrawal Successful!</h3>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p>{popupMessage}</p>
              
              {withdrawalResult && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-xs">{withdrawalResult.id || 'Generated'}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">{withdrawalAmount} {cryptoData.symbol}</span>
                  </div> */}
                  <div className="flex justify-between">
                    <span>Network Fee:</span>
                    <span>{networkFee} {cryptoData.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-yellow-600 font-medium">Processing</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={closePopup}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Got it
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
                <h3 className="text-lg font-semibold text-gray-900">Withdrawal Failed</h3>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p>{popupMessage}</p>
              
              <div className="bg-red-50 rounded-lg p-3 text-red-800">
                <p className="text-sm">
                  <strong>Common issues:</strong><br />
                  • Insufficient balance<br />
                  • Invalid wallet address<br />
                  • Network connectivity issues<br />
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

export default WithdrawalPage;