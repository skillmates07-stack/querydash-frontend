'use client';

import { useState, useRef } from 'react';
import { useVisualization } from '@/contexts/VisualizationContext';
import {
  RiUploadCloudLine,
  RiFileExcelLine,
  RiCloseLine,
  RiCheckLine,
} from 'react-icons/ri';

export default function DataSourceManager() {
  const { dataSources, activeDataSource, addDataSource, setActiveDataSource } = useVisualization();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      // Upload all files one by one (enhance as needed)
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboards/upload`, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          addDataSource({
            id: result.data.id,
            name: result.data.name,
            rows: result.data.rows,
            columns: result.data.columns,
            data: result.data.preview,
          });

          // Auto-activate the last uploaded file
          if (i === files.length - 1) {
            setActiveDataSource(result.data.id);
          }
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Upload Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full p-6 rounded-xl border-2 border-dashed border-gray-800 hover:border-accent/50 transition-all text-center disabled:opacity-50"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
        {uploading ? (
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        ) : (
          <RiUploadCloudLine className="text-4xl text-accent mx-auto mb-3" />
        )}
        <p className="text-sm text-white font-medium">
          {uploading ? 'Uploading...' : 'Upload CSV or Excel (multiple files allowed)'}
        </p>
      </button>

      {/* Data Sources List */}
      <div className="space-y-2 max-h-[40vh] overflow-auto">
        {dataSources.length === 0 && (
          <p className="text-gray-500 text-sm">No data sources uploaded</p>
        )}
        {dataSources.map((source) => (
          <div
            key={source.id}
            onClick={() => setActiveDataSource(source.id)}
            className={`p-4 rounded-xl cursor-pointer transition-all select-none ${
              activeDataSource?.id === source.id
                ? 'bg-accent/20 border-2 border-accent'
                : 'bg-[#1a1a1a] border-2 border-gray-800 hover:border-gray-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <RiFileExcelLine className="text-2xl text-accent flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{source.name}</p>
                <p className="text-xs text-gray-500">
                  {source.rows} rows • {source.columns.length} columns
                </p>
              </div>
              {activeDataSource?.id === source.id && (
                <RiCheckLine className="text-accent text-xl flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
