import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'Priya Sharma',
      email: 'priya@example.com',
      date: '2024-11-20',
      total: 15000,
      status: 'pending',
      items: 2
    },
    {
      id: 'ORD-002',
      customer: 'Anjali Patel',
      email: 'anjali@example.com',
      date: '2024-11-19',
      total: 22000,
      status: 'processing',
      items: 1
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary/10 dark:bg-secondary/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-body font-bold text-primary dark:text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-primary/5 dark:hover:bg-secondary/5">
                <td className="px-6 py-4 font-body font-semibold text-text-light dark:text-text-dark">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="font-body font-semibold text-text-light dark:text-text-dark">{order.customer}</div>
                  <div className="text-sm text-text-light/60 dark:text-text-dark/60">{order.email}</div>
                </td>
                <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{order.date}</td>
                <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{order.items}</td>
                <td className="px-6 py-4 font-body font-semibold text-text-light dark:text-text-dark">₹{order.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${statusColors[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-primary dark:text-secondary hover:text-primary/70 dark:hover:text-secondary/70"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
