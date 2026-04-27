import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import DashboardView from './views/DashboardView';
import SearchView from './views/SearchView';
import SmartView from './views/SmartView';
import WasteView from './views/WasteView';
import InfoPanel from './components/InfoPanel';
import './styles/index.css';
import './styles/App.css';

// Star Background Component
const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  return (
    <div className="stars-container">
      {stars.map(star => (
        <div 
          key={star.id} 
          className="star" 
          style={{ 
            top: star.top, 
            left: star.left, 
            width: star.size, 
            height: star.size,
            '--duration': star.duration,
            animationDelay: star.delay
          }} 
        />
      ))}
    </div>
  );
};

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [smartData, setSmartData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [stats, setStats] = useState({ total: 0, waste: 0, expired: 0 });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);

  // System Status: 'active' | 'processing' | 'error'
  const [systemStatus, setSystemStatus] = useState('active');

  useEffect(() => {
    fetchGlobalStats();
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarCollapsed(true);
      else setIsSidebarCollapsed(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchGlobalStats = async () => {
    setSystemStatus('processing');
    try {
      const [itemsRes, wasteRes, expiredRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/items'),
        fetch('http://127.0.0.1:8000/waste'),
        fetch('http://127.0.0.1:8000/waste/expired')
      ]);
      const [itemsData, wasteData, expiredData] = await Promise.all([
        itemsRes.json(), wasteRes.json(), expiredRes.json()
      ]);
      setStats({
        total: itemsData.items?.length || 0,
        waste: wasteData.waste_items?.length || 0,
        expired: expiredData.expired_items?.length || 0
      });
      setSystemStatus('active');
    } catch (err) {
      setSystemStatus('error');
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setSystemStatus('processing');
    setError(null);
    setHasSearched(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/search/${query}`);
      const data = await response.json();
      setResults(data.results || []);
      setSystemStatus('active');
    } catch (err) {
      setError('COMMUNICATION_FAILURE');
      setSystemStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSmartLocate = async (itemId) => {
    setSystemStatus('processing');
    try {
      const response = await fetch(`http://127.0.0.1:8000/smart-search/${itemId}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setSmartData(data);
      setSystemStatus('active');
    } catch (err) {
      showNotification(`ERROR: ${err.message.toUpperCase()}`, 'error');
      setSystemStatus('error');
    }
  };

  const handleRetrieve = async (itemId) => {
    setSystemStatus('processing');
    try {
      const response = await fetch(`http://127.0.0.1:8000/retrieve/${itemId}`, { method: 'POST' });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      showNotification(`SUCCESS: ITEM ${itemId} RETRIEVED`, 'success');
      setResults(prev => prev.filter(item => item.item_id !== itemId));
      fetchGlobalStats();
    } catch (err) {
      showNotification(`RETRIEVAL_FAILED`, 'error');
      setSystemStatus('error');
    }
  };

  const showNotification = (msg, type) => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView stats={stats} />;
      case 'search':
        return (
          <SearchView 
            results={results} 
            isLoading={isLoading} 
            error={error} 
            hasSearched={hasSearched} 
            onSearch={handleSearch}
            onSmartLocate={handleSmartLocate}
            onRetrieve={handleRetrieve}
          />
        );
      case 'smart':
        return <SmartView onSmartLocate={handleSmartLocate} />;
      case 'waste':
        return <WasteView />;
      default:
        return <DashboardView stats={stats} />;
    }
  };

  return (
    <div className={`app-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <StarField />
      <div className="scanning-line"></div>
      
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="main-layout">
        <Header status={systemStatus} />
        <main className="content-area">
          {renderView()}
        </main>
      </div>

      <InfoPanel data={smartData} onClose={() => setSmartData(null)} />

      {notification && (
        <div className={`notification glass-panel ${notification.type}`}>
          <div className="notif-bar"></div>
          <p>{notification.msg}</p>
        </div>
      )}
    </div>
  );
}

export default App;