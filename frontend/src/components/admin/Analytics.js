import React from 'react';

const Analytics = () => {
  const stats = [
    { label: 'Total Revenue', value: '₹2,45,000', icon: 'payments', change: '+12%', color: 'text-green-600' },
    { label: 'Total Orders', value: '156', icon: 'shopping_bag', change: '+8%', color: 'text-green-600' },
    { label: 'Total Customers', value: '89', icon: 'group', change: '+15%', color: 'text-green-600' },
    { label: 'Avg Order Value', value: '₹15,705', icon: 'trending_up', change: '+5%', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 dark:bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary dark:text-secondary text-2xl">{stat.icon}</span>
              </div>
              <span className={`text-sm font-body font-semibold ${stat.color}`}>{stat.change}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-text-light dark:text-text-dark mb-1">{stat.value}</h3>
            <p className="text-sm text-text-light/60 dark:text-text-dark/60 font-body">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-display font-bold text-primary dark:text-secondary mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-primary/5 dark:bg-secondary/5 rounded-lg">
              <div>
                <p className="font-body font-semibold text-text-light dark:text-text-dark">Order #ORD-00{i}</p>
                <p className="text-sm text-text-light/60 dark:text-text-dark/60">Customer Name - ₹15,000</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-body font-semibold">Completed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
