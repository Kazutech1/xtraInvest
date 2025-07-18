import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import WithdrawalPage from './pages/Withrawals';
import DepositPage from './pages/Deposit';
import TransactionHistory from './pages/History';
import ProfilePage from './pages/Profile';
import AdminLogin from './admin/pages/Auth';
import AdminLayout from './admin/pages/Dashboard';
import AdminDashboard from './admin/pages/AdminDashboard';
import UserManagement from './admin/pages/UserManagement';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import AdminDeposits from './admin/pages/DepositMangement';
import AdminWithdrawals from './admin/pages/WithdrawalManagement';
import AdminPlans from './admin/pages/PlanManagement';
import AdminWallets from './admin/pages/AddressManagement';
import InvestmentPage from './pages/Investment';
import Mobile from './components/Mobile';
import useIsMobile from './hooks/useIsMobile';
import ZohoChat from './components/ZohoChat';
import { MessageCircle } from 'lucide-react';

const App = () => {

    const isMobile = useIsMobile(); // 👈 check screen width


  return (
    <Router>
        <ZohoChat /> 
     <a
      href="https://wa.me/14322848148?text=Hi%20there%2C%20I%20need%20help%20with%20your%20website"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "100px",
        right: "10px",
        zIndex: 999,
        backgroundColor: "#25D366",
        padding: "12px",
        borderRadius: "50%",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        color: "white",
      }}
    >
      <MessageCircle size={28} strokeWidth={2.5} />
    </a>



      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
             {isMobile ? (
              <Route path="/" element={<Mobile />} />
            ) : (
              <Route path="/" element={<Home />} />
            )}


            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin/adlog" element={<AdminLogin />} />

            {/* User Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/withdrawal" element={<WithdrawalPage />} />
              <Route path="/deposit" element={<DepositPage />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/invest" element={<InvestmentPage />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                    <Route path="deposits" element={<AdminDeposits />} />
                <Route path="withdrawal" element={<AdminWithdrawals />} />
<Route path="plans" element={<AdminPlans />} />
<Route path="address" element={<AdminWallets />} />


                {/* Add other admin routes here */}
              </Route>
            </Route>

            {/* Catch-all route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;