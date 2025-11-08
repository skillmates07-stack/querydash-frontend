'use client';

import { useState } from 'react';
import {
  RiCheckboxCircleLine,
  RiAddLine,
  RiSettings4Line,
  RiDeleteBinLine,
  RiLockLine
} from 'react-icons/ri';

interface Connector {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: 'connected' | 'disconnected';
  category: string;
  setupTime: string;
}

export default function ConnectorsPage() {
  const [connectors] = useState<Connector[]>([
    {
      id: '1',
      name: 'Stripe',
      description: 'Payment processing and revenue tracking',
      logo: '💳',
      status: 'connected',
      category: 'Payment',
      setupTime: '1 min'
    },
    {
      id: '2',
      name: 'Shopify',
      description: 'E-commerce store analytics',
      logo: '🛍️',
      status: 'connected',
      category: 'E-commerce',
      setupTime: '2 min'
    },
    {
      id: '3',
      name: 'PostgreSQL',
      description: 'Custom database connection',
      logo: '🐘',
      status: 'connected',
      category: 'Database',
      setupTime: '5 min'
    },
    {
      id: '4',
      name: 'Google Analytics',
      description: 'Website traffic and user behavior',
      logo: '📊',
      status: 'disconnected',
      category: 'Analytics',
      setupTime: '3 min'
    },
    {
      id: '5',
      name: 'MongoDB',
      description: 'NoSQL database integration',
      logo: '🍃',
      status: 'disconnected',
      category: 'Database',
      setupTime: '5 min'
    },
    {
      id: '6',
      name: 'Salesforce',
      description: 'CRM data and customer insights',
      logo: '☁️',
      status: 'disconnected',
      category: 'CRM',
      setupTime: '10 min'
    },
    {
      id: '7',
      name: 'HubSpot',
      description: 'Marketing and sales automation',
      logo: '🎯',
      status: 'disconnected',
      category: 'CRM',
      setupTime: '8 min'
    },
    {
      id: '8',
      name: 'AWS RDS',
      description: 'Amazon relational database service',
      logo: '☁️',
      status: 'disconnected',
      category: 'Database',
      setupTime: '7 min'
    },
    {
      id: '9',
      name: 'MySQL',
      description: 'Open source relational database',
      logo: '🐬',
      status: 'disconnected',
      category: 'Database',
      setupTime: '5 min'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Payment', 'E-commerce', 'Database', 'Analytics', 'CRM'];

  const filteredConnectors = selectedCategory === 'All'
    ? connectors
    : connectors.filter(c => c.category === selectedCategory);

  const connectedCount = connectors.filter(c => c.status === 'connected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Data Connectors</h1>
        <p className="text-gray-400">One-click integrations with your business tools</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
          <p className="text-sm text-gray-400 mb-2">Connected</p>
          <p className="text-4xl font-bold text-white mb-1">{connectedCount}</p>
          <p className="text-sm text-accent">Active integrations</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <p className="text-sm text-gray-400 mb-2">Available</p>
          <p className="text-4xl font-bold text-white mb-1">{connectors.length}</p>
          <p className="text-sm text-gray-500">Total connectors</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <p className="text-sm text-gray-400 mb-2">Setup Time</p>
          <p className="text-4xl font-bold text-white mb-1">&lt;10m</p>
          <p className="text-sm text-gray-500">Average time</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-accent text-white'
                : 'bg-[#1a1a1a] border border-gray-800 text-gray-400 hover:border-accent'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Connectors grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConnectors.map((connector) => (
          <div
            key={connector.id}
            className="group p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {connector.logo}
              </div>
              {connector.status === 'connected' && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                  <RiCheckboxCircleLine />
                  <span>Active</span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{connector.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{connector.description}</p>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <RiLockLine />
              <span>Secure • {connector.setupTime} setup</span>
            </div>

            <div className="flex items-center gap-2">
              {connector.status === 'connected' ? (
                <>
                  <button className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-gray-800 text-white hover:border-accent transition-all flex items-center justify-center gap-2">
                    <RiSettings4Line />
                    <span>Configure</span>
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-danger/10 border border-danger/20 text-danger hover:bg-danger/20 transition-all">
                    <RiDeleteBinLine />
                  </button>
                </>
              ) : (
                <button className="w-full px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-accent/20">
                  <RiAddLine />
                  <span>Connect</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Help section */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0">
            💡
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Need Help Connecting?</h3>
            <p className="text-gray-400 mb-4">
              Our team can help you set up custom integrations or migrate data from existing tools. 
              Setup takes less than 10 minutes for most connectors.
            </p>
            <button className="px-6 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
