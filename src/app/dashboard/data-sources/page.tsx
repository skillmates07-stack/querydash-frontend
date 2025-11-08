'use client';

import { useState, useRef } from 'react';
import {
  RiCheckboxCircleLine,
  RiAddLine,
  RiSettings4Line,
  RiDeleteBin6Line,
  RiLockLine,
  RiUploadCloudLine,
  RiFileExcelLine,
  RiFileLine,
  RiGoogleLine,
  RiDatabase2Line,
  RiLinkM,
  RiRefreshLine,
  RiDownloadLine,
  RiErrorWarningLine,
  RiCloseLine
} from 'react-icons/ri';

interface DataSource {
  id: string;
  name: string;
  type: 'excel' | 'csv' | 'sheets' | 'api' | 'database';
  status: 'active' | 'syncing' | 'error';
  rows: number;
  lastSync: string;
  size: string;
}

interface PreviewData {
  name: string;
  rows: number;
  columns: string[];
  preview: any[];
}

export default function DataSourcesPage() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Sales Data 2024.xlsx',
      type: 'excel',
      status: 'active',
      rows: 12500,
      lastSync: '2 min ago',
      size: '2.3 MB'
    },
    {
      id: '2',
      name: 'Customer Database',
      type: 'database',
      status: 'active',
      rows: 45000,
      lastSync: '1 min ago',
      size: '8.7 MB'
    }
  ]);

  const [uploading, setUploading] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Call backend upload endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboards/upload`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Add uploaded file to data sources
        const newSource: DataSource = {
          id: result.data.id,
          name: result.data.name,
          type: result.data.type,
          status: 'active',
          rows: result.data.rows,
          lastSync: 'Just now',
          size: result.data.size
        };
        setDataSources([newSource, ...dataSources]);
        
        // Show preview modal
        setPreviewData({
          name: result.data.name,
          rows: result.data.rows,
          columns: result.data.columns,
          preview: result.data.preview
        });
      } else {
        alert(`❌ Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const deleteSource = (id: string) => {
    if (confirm('Are you sure you want to delete this data source?')) {
      setDataSources(dataSources.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Data Sources</h1>
        <p className="text-gray-400">Upload files or connect to databases</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
          <p className="text-sm text-gray-400 mb-2">Connected</p>
          <p className="text-4xl font-bold text-white mb-1">{dataSources.length}</p>
          <p className="text-sm text-accent">Active integrations</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <p className="text-sm text-gray-400 mb-2">Total Rows</p>
          <p className="text-4xl font-bold text-white mb-1">
            {dataSources.reduce((sum, s) => sum + s.rows, 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Across all sources</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <p className="text-sm text-gray-400 mb-2">Setup Time</p>
          <p className="text-4xl font-bold text-white mb-1">&lt;5m</p>
          <p className="text-sm text-gray-500">Average time</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* File Upload */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative p-8 rounded-2xl border-2 border-dashed border-gray-800 hover:border-accent/50 transition-all cursor-pointer bg-gradient-to-br from-[#1a1a1a] to-[#0f172a]"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              {uploading ? (
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <RiUploadCloudLine className="text-4xl text-accent" />
              )}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {uploading ? 'Uploading...' : 'Upload Excel or CSV'}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Drag & drop files or click to browse
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <RiFileExcelLine className="text-green-500" />
                <span>Excel (.xlsx)</span>
              </div>
              <div className="flex items-center gap-1">
                <RiFileLine className="text-blue-500" />
                <span>CSV (.csv)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Google Sheets */}
        <button className="group p-8 rounded-2xl border-2 border-gray-800 hover:border-accent/50 transition-all text-left bg-gradient-to-br from-[#1a1a1a] to-[#0f172a]">
          <div className="w-16 h-16 mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <RiGoogleLine className="text-4xl text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Connect Google Sheets</h3>
          <p className="text-sm text-gray-400">
            Import data directly from Google Sheets
          </p>
        </button>
      </div>

      {/* Quick Connect Options */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: RiDatabase2Line, name: 'PostgreSQL', color: '#3b82f6' },
          { icon: RiDatabase2Line, name: 'MySQL', color: '#f59e0b' },
          { icon: RiDatabase2Line, name: 'MongoDB', color: '#10b981' },
          { icon: RiLinkM, name: 'REST API', color: '#8b5cf6' }
        ].map((option, i) => {
          const Icon = option.icon;
          return (
            <button
              key={i}
              className="p-4 rounded-xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/50 transition-all flex items-center gap-3 group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: option.color + '20' }}
              >
                <Icon className="text-xl" style={{ color: option.color }} />
              </div>
              <span className="text-white font-medium">{option.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Data Sources */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Active Data Sources</h2>
          <span className="text-sm text-gray-500">{dataSources.length} sources</span>
        </div>

        <div className="space-y-3">
          {dataSources.map((source) => {
            const Icon = source.type === 'excel' 
              ? RiFileExcelLine 
              : source.type === 'csv' 
              ? RiFileLine 
              : source.type === 'sheets'
              ? RiGoogleLine
              : RiDatabase2Line;

            const StatusIcon = source.status === 'active' 
              ? RiCheckboxCircleLine 
              : RiErrorWarningLine;

            return (
              <div
                key={source.id}
                className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-3xl text-accent" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold truncate">{source.name}</h3>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        source.status === 'active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                      }`}>
                        <StatusIcon className="text-xs" />
                        <span>{source.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{source.rows.toLocaleString()} rows</span>
                      <span>•</span>
                      <span>{source.size}</span>
                      <span>•</span>
                      <span>Updated {source.lastSync}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <RiRefreshLine className="text-white" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <RiDownloadLine className="text-white" />
                    </button>
                    <button
                      onClick={() => deleteSource(source.id)}
                      className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 transition-all"
                    >
                      <RiDeleteBin6Line className="text-danger" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Info */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: '🔄',
            title: 'Auto-Sync',
            desc: 'Automatic data refresh every 5 minutes'
          },
          {
            icon: '🔒',
            title: 'Encrypted',
            desc: 'End-to-end encryption for all data'
          },
          {
            icon: '⚡',
            title: 'Fast Import',
            desc: 'Process millions of rows in seconds'
          }
        ].map((feature, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Data Preview Modal */}
      {previewData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gradient-to-r from-accent/10 to-transparent">
              <div>
                <h2 className="text-2xl font-bold text-white">{previewData.name}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {previewData.rows.toLocaleString()} rows • {previewData.columns.length} columns
                </p>
              </div>
              <button
                onClick={() => setPreviewData(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
              >
                <RiCloseLine className="text-2xl text-white" />
              </button>
            </div>

            {/* Column Tags */}
            <div className="p-6 border-b border-gray-800 bg-[#0d0d0d]">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Columns</p>
              <div className="flex flex-wrap gap-2">
                {previewData.columns.map((col: string, i: number) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition-all"
                  >
                    {col}
                  </div>
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#0d0d0d] z-10">
                  <tr>
                    {previewData.columns.map((col: string, i: number) => (
                      <th
                        key={i}
                        className="text-left p-4 font-semibold text-gray-300 border-b-2 border-accent/20 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.preview.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      {previewData.columns.map((col: string, j: number) => (
                        <td key={j} className="p-4 text-gray-300 whitespace-nowrap">
                          {row[col] !== null && row[col] !== undefined ? String(row[col]) : '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-800 bg-[#0d0d0d]">
              <p className="text-sm text-gray-500">
                Showing first {Math.min(10, previewData.preview.length)} rows of {previewData.rows.toLocaleString()}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setPreviewData(null)}
                  className="px-6 py-2 rounded-lg bg-white/5 border border-gray-800 text-white hover:border-accent transition-all"
                >
                  Close
                </button>
                <button className="px-6 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                  Use This Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
