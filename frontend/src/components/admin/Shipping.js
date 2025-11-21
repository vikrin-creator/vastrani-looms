import React, { useState } from 'react';

const Shipping = () => {
  // eslint-disable-next-line no-unused-vars
  const [shippingZones, setShippingZones] = useState([
    { id: 1, zone: 'Local (Within City)', rate: 50, days: '2-3 days' },
    { id: 2, zone: 'Regional (Within State)', rate: 100, days: '3-5 days' },
    { id: 3, zone: 'National (All India)', rate: 150, days: '5-7 days' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-display font-bold text-primary dark:text-secondary">Shipping Configuration</h2>
        <button className="flex items-center gap-2 bg-primary dark:bg-secondary text-white dark:text-primary px-4 py-2 rounded-lg hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors font-body font-semibold">
          <span className="material-symbols-outlined">add</span>
          Add Zone
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary/10 dark:bg-secondary/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Zone</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Shipping Rate</th>
              <th className="px-6 py-3 text-left text-xs font-body font-bold text-primary dark:text-secondary uppercase">Delivery Time</th>
              <th className="px-6 py-3 text-right text-xs font-body font-bold text-primary dark:text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {shippingZones.map((zone) => (
              <tr key={zone.id} className="hover:bg-primary/5 dark:hover:bg-secondary/5">
                <td className="px-6 py-4 font-body font-semibold text-text-light dark:text-text-dark">{zone.zone}</td>
                <td className="px-6 py-4 font-body text-text-light dark:text-text-dark">₹{zone.rate}</td>
                <td className="px-6 py-4 font-body text-sm text-text-light dark:text-text-dark">{zone.days}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-primary dark:text-secondary hover:text-primary/70 dark:hover:text-secondary/70">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <span className="material-symbols-outlined">delete</span>
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

export default Shipping;
