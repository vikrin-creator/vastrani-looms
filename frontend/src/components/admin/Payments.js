import React, { useState } from 'react';

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'UPI', enabled: true, icon: 'qr_code_scanner' },
    { id: 2, name: 'Credit/Debit Card', enabled: true, icon: 'credit_card' },
    { id: 3, name: 'Net Banking', enabled: true, icon: 'account_balance' },
    { id: 4, name: 'Cash on Delivery', enabled: false, icon: 'local_atm' },
  ]);

  const transactions = [
    { id: 'TXN-001', orderId: 'ORD-001', amount: 15000, method: 'UPI', status: 'success', date: '2024-11-20' },
    { id: 'TXN-002', orderId: 'ORD-002', amount: 22000, method: 'Card', status: 'success', date: '2024-11-19' },
  ];

  const toggleMethod = (id) => {
    setPaymentMethods(paymentMethods.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div>
        <h2 className="text-xl font-display font-bold text-primary dark:text-secondary mb-4">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary dark:text-secondary">{method.icon}</span>
                </div>
                <button
                  onClick={() => toggleMethod(method.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    method.enabled ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  <span className="material-symbols-outlined">{method.enabled ? 'toggle_on' : 'toggle_off'}</span>
                </button>
              </div>
              <p className="font-body font-semibold text-text-light dark:text-text-dark">{method.name}</p>
              <p className="text-xs text-text-light/60 dark:text-text-dark/60">{method.enabled ? 'Active' : 'Disabled'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-xl font-display font-bold text-primary dark:text-secondary mb-4">Recent Transactions</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary/10 dark:bg-secondary/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-primary/5 dark:hover:bg-secondary/5">
                  <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{txn.id}</td>
                  <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{txn.orderId}</td>
                  <td className="px-6 py-4 font-body font-semibold text-text-light dark:text-text-dark">₹{txn.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{txn.method}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-body font-semibold">
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
