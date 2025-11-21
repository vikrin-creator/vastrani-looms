import React from 'react';

const CustomerManagement = () => {
  const customers = [
    { id: 1, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', orders: 5, spent: 75000 },
    { id: 2, name: 'Anjali Patel', email: 'anjali@example.com', phone: '+91 98765 43211', orders: 3, spent: 45000 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary/10 dark:bg-secondary/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Total Spent</th>
              <th className="px-6 py-3 text-right text-xs font-body font-bold text-primary dark:text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-primary/5 dark:hover:bg-secondary/5">
                <td className="px-6 py-4 font-body font-semibold text-text-light dark:text-text-dark">{customer.name}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-light dark:text-text-dark">{customer.email}</div>
                  <div className="text-sm text-text-light/60 dark:text-text-dark/60">{customer.phone}</div>
                </td>
                <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{customer.orders}</td>
                <td className="px-6 py-4 font-body font-semibold text-text-light dark:text-text-dark">₹{customer.spent.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary dark:text-secondary hover:text-primary/70 dark:hover:text-secondary/70">
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

export default CustomerManagement;
