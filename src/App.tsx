import React, { useState, useEffect } from 'react';
import Lookup from './components/Lookup';
import DataEntry from './components/DataEntry';
import DataManagement from './components/DataManagement';
import KiMonDonGiap from './components/KiMonDonGiap';
import { FengShuiData, Category } from './types';
import { Compass, Upload, Download, RefreshCw } from 'lucide-react';
import databaseData from './database.json';

function App() {
  const [data, setData] = useState<Record<Category, FengShuiData[]>>(() => {
    const savedData = localStorage.getItem('fengShuiData');
    return savedData ? JSON.parse(savedData) : databaseData;
  });
  const [activeTab, setActiveTab] = useState<'lookup' | 'dataEntry' | 'dataManagement' | 'kiMonDonGiap'>('lookup');

  // ... (phần còn lại của component không thay đổi)

  return (
    <div className="min-h-screen bg-amber-50">
      {/* ... (phần header không thay đổi) */}
      <nav className="bg-amber-600 text-white">
        <div className="container mx-auto flex">
          <button
            className={`px-4 py-2 ${activeTab === 'lookup' ? 'bg-amber-700' : ''}`}
            onClick={() => setActiveTab('lookup')}
          >
            Tra cứu
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'dataEntry' ? 'bg-amber-700' : ''}`}
            onClick={() => setActiveTab('dataEntry')}
          >
            Nhập dữ liệu
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'dataManagement' ? 'bg-amber-700' : ''}`}
            onClick={() => setActiveTab('dataManagement')}
          >
            Quản lý dữ liệu
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'kiMonDonGiap' ? 'bg-amber-700' : ''}`}
            onClick={() => setActiveTab('kiMonDonGiap')}
          >
            Kỳ Môn Độn Giáp
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-8">
        {activeTab === 'lookup' && <Lookup data={data} />}
        {activeTab === 'dataEntry' && <DataEntry onSave={handleSave} />}
        {activeTab === 'dataManagement' && (
          <DataManagement data={data} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        {activeTab === 'kiMonDonGiap' && <KiMonDonGiap />}
      </main>
    </div>
  );
}

export default App;