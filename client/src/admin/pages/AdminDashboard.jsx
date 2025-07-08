import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">Total Users</h3>
          <p className="text-2xl font-bold">Loading...</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Active Users</h3>
          <p className="text-2xl font-bold">Loading...</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-purple-800">Recent Activity</h3>
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;