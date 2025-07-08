import { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Edit2, Check, X, CreditCard, Shield, Calendar, Gift, TrendingUp, Wallet, Users, ArrowLeft } from 'lucide-react';
import useProfile from '../hooks/useProfile';

const ProfilePage = () => {
  const { loading, error, getProfile, updateProfile } = useProfile();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const profileData = await getProfile();
      if (profileData) {
        setUser(profileData);
        setTempData({
          fullName: profileData.fullName,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
          password: ''
        });
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Only update changed fields
      const updateData = {};
      if (tempData.fullName !== user.fullName) updateData.fullName = tempData.fullName;
      if (tempData.email !== user.email) updateData.email = tempData.email;
      if (tempData.phoneNumber !== user.phoneNumber) updateData.phoneNumber = tempData.phoneNumber;
      if (tempData.password) updateData.password = tempData.password;

      if (Object.keys(updateData).length > 0) {
        const updatedUser = await updateProfile(updateData);
        if (updatedUser) {
          setUser(updatedUser.user || updatedUser); // Handle both response formats
          setSuccessMessage('Profile updated successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
          setEditMode(false);
        }
      } else {
        setEditMode(false);
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Failed to load profile. {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
       
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 w-full md:w-1/3">
            <button 
                    onClick={() => window.history.back()}
                    className="flex items-center justify-center rounded-full p-2 bg-gray-200 hover:bg-gray-600 transition-colors"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <User size={48} className="text-blue-500" />
                </div>
                {editMode && (
                  <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md">
                    <Edit2 size={16} />
                  </button>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-center">
                {editMode ? (
                  <input
                    type="text"
                    name="fullName"
                    value={tempData.fullName}
                    onChange={handleInputChange}
                    className="text-center bg-gray-100 rounded px-2 py-1 w-full"
                  />
                ) : (
                  user.fullName
                )}
              </h1>
              <p className="text-gray-500">@{user.username}</p>
              
              <div className="mt-4 flex gap-2">
                {editMode ? (
                  <>
                    <button 
                      onClick={() => {
                        setEditMode(false);
                        setTempData({
                          fullName: user.fullName,
                          email: user.email,
                          phoneNumber: user.phoneNumber,
                          password: ''
                        });
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg flex items-center gap-2"
                    >
                      <X size={16} /> Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                    >
                      <Check size={16} /> Save
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex-1">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <Check size={16} className="flex-shrink-0" />
                  <p className="text-sm font-medium">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 text-red-800">
                  <X size={16} className="flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 font-medium ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`px-4 py-2 font-medium ${activeTab === 'payment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Payment
              </button>
            </div>
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={tempData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={18} className="text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                    {editMode ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={tempData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone size={18} className="text-gray-400" />
                        <span>{user.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar size={18} className="text-gray-400" />
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Password</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Lock size={18} className="text-gray-400" />
                    <span>••••••••</span>
                    <button className="ml-auto text-blue-600 text-sm font-medium">
                      Change Password
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Two-Factor Authentication</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield size={18} className="text-gray-400" />
                      <span>Not enabled</span>
                    </div>
                    <button className="text-blue-600 text-sm font-medium">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Payment Methods</label>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-gray-400" />
                        <span>No payment methods added</span>
                      </div>
                      <button className="text-blue-600 text-sm font-medium">
                        Add Payment
                      </button>
                    </div>
                  </div>
                </div>
                 */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Referral Code</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Gift size={18} className="text-gray-400" />
                    <code className="font-mono">{user.referralCode}</code>
                    <button className="ml-auto text-blue-600 text-sm font-medium">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Total Balance</h3>
              <Wallet size={20} className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold mt-2">${user.totalBalance}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Total Profit</h3>
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-2 text-green-600">${user.totalProfit}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Referral Earnings</h3>
              <Users size={20} className="text-purple-500" />
            </div>
            <p className="text-2xl font-bold mt-2">${user.referralBalance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;