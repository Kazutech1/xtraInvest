// src/pages/DepositPage.js
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Copy, CheckCircle, ChevronDown, AlertTriangle } from 'lucide-react';
import useDeposit from '../hooks/useDeposit';

const DepositPage = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  
  const { loading, error, getDepositInfo, submitDepositProof } = useDeposit();

  useEffect(() => {
    const fetchDepositInfo = async () => {
      try {
        const response = await getDepositInfo();
        if (response && response.depositWallets) {
          setCryptocurrencies(response.depositWallets.map(addr => ({
            symbol: addr.currency,
            name: addr.currency,
            address: addr.address,
            network: addr.network,
            minDeposit: getMinDeposit(addr.currency),
            icon: getIcon(addr.currency)
          })));
        }
      } catch (err) {
        console.error("Failed to fetch deposit info:", err);
      }
    };

    fetchDepositInfo();
  }, []);

  const getMinDeposit = (currency) => {
    const minDeposits = {
      BTC: 0.001,
      ETH: 0.01,
      USDT: 10,
      BNB: 0.1,
      ADA: 10,
      DOT: 1
    };
    return minDeposits[currency] || 0;
  };

  const getIcon = (currency) => {
    const icons = {
      BTC: "₿",
      ETH: "Ξ",
      USDT: "₮",
      BNB: "⬡",
      ADA: "₳",
      DOT: "●"
    };
    return icons[currency] || currency;
  };

  const selectedCryptoData = cryptocurrencies.find((crypto) => crypto.symbol === selectedCrypto);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
    }
  };

  const copyAddress = async () => {
    if (selectedCryptoData) {
      await navigator.clipboard.writeText(selectedCryptoData.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCrypto || !amount || (!txHash && !proofFile)) {
      return;
    }
    
    try {
      const depositData = {
        amount,
        currency: selectedCrypto,
        txHash: txHash || undefined,
        proofImage: proofFile
      };
      
      const result = await submitDepositProof(depositData);
      
      if (result) {
        setSuccessMessage("Deposit submitted for verification!");
        setSelectedCrypto("");
        setAmount("");
        setProofFile(null);
        setTxHash("");
        
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (err) {
      console.error("Deposit submission error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center rounded-full p-2 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Deposit Funds</h1>
            <p className="text-gray-600">Add cryptocurrency to your account</p>
          </div>
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <div className="rounded-lg bg-green-50 p-4 text-green-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <p>{successMessage}</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Deposit Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Make a Deposit</h2>
                <p className="text-gray-500">Select your cryptocurrency and enter the deposit details</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cryptocurrency Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Cryptocurrency</label>
                  <div className="relative">
                    <select
                      value={selectedCrypto}
                      onChange={(e) => setSelectedCrypto(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      required
                    >
                      <option value="">Choose a cryptocurrency</option>
                      {cryptocurrencies.map((crypto) => (
                        <option key={crypto.symbol} value={crypto.symbol}>
                          {crypto.name} ({crypto.symbol})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Deposit Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.00000001"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 py-2 pl-3 pr-16 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      required
                      min={selectedCryptoData?.minDeposit || 0}
                    />
                    {selectedCrypto && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                       USD
                      </div>
                    )}
                  </div>
                  {selectedCryptoData && (
                    <p className="text-sm text-gray-500">
                      Minimum deposit: {selectedCryptoData.minDeposit} USD
                    </p>
                  )}
                </div>

                {/* Transaction Hash */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Transaction Hash (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter transaction hash if available"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>

                {/* Payment Proof Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {txHash ? "Upload Payment Proof (Optional)" : "Upload Payment Proof (Required)"}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input 
                      id="proof" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                      required={!txHash}
                    />
                    <label htmlFor="proof" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-blue-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        {proofFile ? (
                          <span className="font-medium text-blue-600">{proofFile.name}</span>
                        ) : (
                          <>
                            <span className="text-blue-600 font-medium">Click to upload</span> screenshot or photo
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    {txHash 
                      ? "Either transaction hash or payment proof is required"
                      : "Payment proof is required if no transaction hash is provided"}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={(!selectedCrypto || !amount || (!txHash && !proofFile)) || loading}
                  className={`w-full rounded-lg py-3 px-4 font-medium text-white transition-colors ${
                    selectedCrypto && amount && (txHash || proofFile) && !loading
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Submit Deposit Request'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Deposit Instructions */}
          <div className="space-y-6">
            {selectedCryptoData && (
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{selectedCryptoData.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedCryptoData.name}</h3>
                    <p className="text-gray-500">{selectedCryptoData.network}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Address</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-lg bg-gray-100 p-3 overflow-x-auto">
                        <code className="text-xs break-all">{selectedCryptoData.address}</code>
                      </div>
                      <button
                        onClick={copyAddress}
                        className="flex items-center justify-center rounded-lg p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        {copied ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-3 text-center">
                    <p className="text-sm font-medium text-blue-800">
                      Minimum: {selectedCryptoData.minDeposit} {selectedCrypto}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Deposit Instructions</h3>
              <div className="space-y-4 text-sm">
                {[
                  "Select your preferred cryptocurrency",
                  "Copy the deposit address and send your funds",
                  "Enter transaction details and/or upload proof",
                  "Submit the form and wait for verification"
                ].map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  <strong className="font-medium">Important:</strong> Only send the selected cryptocurrency to the provided address. Sending other
                  cryptocurrencies may result in permanent loss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;