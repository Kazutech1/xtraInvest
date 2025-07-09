import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';
import { FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
  const { isAuthenticated, logoutAdmin, getAdminData } = useAdminAuth();
  const navigate = useNavigate();
  const adminData = getAdminData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm md:hidden">
        <div className="px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative inset-0 z-20 w-64 bg-white shadow-md md:shadow-none`}
        style={{ zIndex: 1000 }}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800 hidden md:block">Admin Panel</h1>
          <p className="text-sm text-gray-500">Welcome, {adminData?.username}</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/deposits" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                Deposit Management
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/withdrawal" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                Withdrawal Management
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/plans" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                Plans Management
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/address" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                Address Management
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  logoutAdmin();
                  setSidebarOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="bg-white shadow-sm hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Admin Dashboard
              </h2>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;