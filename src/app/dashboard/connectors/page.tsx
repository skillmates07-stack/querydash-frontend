'use client';

import { useState } from 'react';
import {
  RiCheckboxCircleLine,
  RiAddLine,
  RiSettings4Line,
  RiDeleteBinLine
} from 'react-icons/ri';

interface Connector {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: 'connected' | 'disconnected';
  category: string;
}

export default function ConnectorsPage() {
  const [connectors, setConnectors] = useState<Connector[]>([
    {
      id: '1',
      name: 'Stripe',
      description: 'Payment processing and revenue tracking',
      logo: '💳',
      status: 'connected',
      category: 'Payment'
    },
    {
      id: '2',
      name: 'Shopify',
      description: 'E-commerce store analytics',
      logo: '🛍️',
      status: 'connected',
      category: 'E-commerce'
    },
    {
      id: '3',
      name: 'PostgreSQL',
      description: 'Custom database connection',
      logo: '🐘',
      status: 'connected',
      category: 'Database'
    },
    {
      id: '4',
      name: 'Google Analytics',
      description: 'Website traffic and user behavior',
      logo: '📊',
      status: 'disconnected',
      category: 'Analytics'
    },
    {
      id: '5',
      name: 'MongoDB',
      description: 'NoSQL database integration',
      logo: '🍃',
      status: 'disconnected',
      category: 'Database'
    },
    {
      id: '6',
      name: 'Salesforce',
      description: 'CRM data and customer insights',
      logo: '☁️',
      status: 'disconnected',
      category: 'CRM'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Payment', 'E-commerce', 'Database', 'Analytics', 'CRM'];

  const filteredConnectors = selectedCategory === 'All'
    ? connectors
    : connectors.filter(c => c.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Data Connectors</h1>
        <p className="text-gray-400">One-click integrations with your business tools</p>
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
            className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-3xl">
                {connector.logo}
              </div>
              {connector.status === 'connected' && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                  <RiCheckboxCircleLine />
                  <span>Connected</span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{connector.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{connector.description}</p>

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
                <button className="w-full px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all flex items-center justify-center gap-2">
                  <RiAddLine />
                  <span>Connect</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
