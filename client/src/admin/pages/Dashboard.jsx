import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';

const AdminLayout = () => {
  const { isAuthenticated, logoutAdmin, getAdminData } = useAdminAuth();
  const navigate = useNavigate();
  const adminData = getAdminData();

  if (!isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500">Welcome, {adminData?.username}</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {/* <li>
              <NavLink 
                to="/admin/dashboard" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                Dashboard
              </NavLink>
            </li> */}
            <li>
              <NavLink 
                to="/admin/users" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
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
              >
                WIthdrawal Management
              </NavLink>
            </li>
              <li>
              <NavLink 
                to="/admin/plans" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
                }
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
              >
                Address Management
              </NavLink>
            </li>
            <li>
              <button
                onClick={logoutAdmin}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Admin Dashboard
              </h2>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;