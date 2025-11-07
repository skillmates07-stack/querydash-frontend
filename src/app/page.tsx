'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
        if (response.ok) {
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      } catch (error) {
        setApiStatus('offline');
      }
    };

    checkAPI();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
            QueryDash
          </h1>
          <p className="text-2xl text-gray-300">
            Real-Time Business Intelligence Platform
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            English queries. Live dashboards. Smart alerts. Real-time user tracking.
            <br />
            <span className="text-accent font-semibold">90% cheaper</span> than Power BI + Datadog + Mixpanel combined.
          </p>
        </div>

        {/* API Status */}
        <div className="bg-secondary rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Backend Status</h3>
              <p className="text-sm text-gray-400">
                API Endpoint: {process.env.NEXT_PUBLIC_API_URL}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  apiStatus === 'online'
                    ? 'bg-success animate-pulse'
                    : apiStatus === 'offline'
                    ? 'bg-danger'
                    : 'bg-warning animate-pulse'
                }`}
              />
              <span className="text-sm font-semibold">
                {apiStatus === 'online'
                  ? 'Online'
                  : apiStatus === 'offline'
                  ? 'Offline'
                  : 'Checking...'}
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-secondary rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">✨ Natural Language Queries</h3>
            <p className="text-sm text-gray-400">
              Ask questions in plain English. No SQL required.
            </p>
          </div>
          <div className="bg-secondary rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">📊 Live Dashboards</h3>
            <p className="text-sm text-gray-400">
              Real-time metrics updating every 5 seconds.
            </p>
          </div>
          <div className="bg-secondary rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">🔔 Smart Alerts</h3>
            <p className="text-sm text-gray-400">
              AI explains why metrics changed and suggests fixes.
            </p>
          </div>
          <div className="bg-secondary rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">👥 User Tracking</h3>
            <p className="text-sm text-gray-400">
              See who's on your site right now, live heatmaps.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <button className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            Start Free Trial
          </button>
          <p className="text-sm text-gray-500">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>
    </main>
  );
}
