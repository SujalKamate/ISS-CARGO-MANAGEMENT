import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ activeView, setActiveView, isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '📊' },
    { id: 'search', label: 'SEARCH SYSTEM', icon: '🔍' },
    { id: 'smart', label: 'SMART RETRIEVAL', icon: '⚡' },
    { id: 'waste', label: 'WASTE MONITOR', icon: '♻️' },
  ];

  return (
    <aside className={`sidebar glass-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">{isCollapsed ? 'IC' : 'ICCS'}</div>
        {!isCollapsed && <span className="brand-ver">v3.5.0</span>}
      </div>
      
      <button className="collapse-toggle" onClick={toggleSidebar}>
        {isCollapsed ? '»' : '«'}
      </button>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''} btn-ripple`}
            onClick={() => setActiveView(item.id)}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
            {activeView === item.id && <div className="nav-indicator"></div>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="connection-status">
          <span className="dot online"></span>
          {!isCollapsed && 'STATION LINK: STABLE'}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
