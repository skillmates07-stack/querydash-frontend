'use client';

import { useState } from 'react';
import { RiUserLocationLine, RiEyeLine, RiMapPinLine } from 'react-icons/ri';

export default function TrackingPage() {
  const [liveUsers] = useState(1234);
  const [regions] = useState([
    { name: 'United States', users: 518, percentage: 42 },
    { name: 'Europe', users: 345, percentage: 28 },
    { name: 'Asia', users: 185, percentage: 15 },
    { name: 'Other', users: 186, percentage: 15 }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">User Tracking</h1>
        <p className="text-gray-400">Real-time visitor analytics</p>
      </div>

      {/* Live users counter */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-2">Users Online Now</p>
            <p className="text-5xl font-bold text-white">{liveUsers.toLocaleString()}</p>
          </div>
          <RiUserLocationLine className="text-6xl text-accent" />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-gray-400">Updating in real-time</span>
        </div>
      </div>

      {/* Geographic distribution */}
      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-6">Geographic Distribution</h2>
        <div className="space-y-4">
          {regions.map((region, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <RiMapPinLine className="text-accent" />
                  <span className="text-white font-medium">{region.name}</span>
                </div>
                <span className="text-gray-400">{region.users} users</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${region.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
