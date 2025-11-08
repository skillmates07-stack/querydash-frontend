'use client';

import { useState } from 'react';
import { RiBellLine, RiAddLine, RiToggleLine } from 'react-icons/ri';

export default function AlertsPage() {
  const [alerts] = useState([
    { id: '1', name: 'Revenue Drop Alert', condition: 'Revenue drops >30%', active: true },
    { id: '2', name: 'High Traffic Alert', condition: 'Users >1000', active: true },
    { id: '3', name: 'Low Conversion Alert', condition: 'Conversion rate <2%', active: false }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Alerts</h1>
          <p className="text-gray-400">Smart notifications for your metrics</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all flex items-center gap-2">
          <RiAddLine />
          New Alert
        </button>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${alert.active ? 'bg-accent/10' : 'bg-gray-800'}`}>
                <RiBellLine className={`text-2xl ${alert.active ? 'text-accent' : 'text-gray-500'}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{alert.name}</h3>
                <p className="text-sm text-gray-400">{alert.condition}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${alert.active ? 'text-success' : 'text-gray-500'}`}>
                {alert.active ? 'Active' : 'Inactive'}
              </span>
              <RiToggleLine className={`text-3xl cursor-pointer ${alert.active ? 'text-accent' : 'text-gray-600'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
