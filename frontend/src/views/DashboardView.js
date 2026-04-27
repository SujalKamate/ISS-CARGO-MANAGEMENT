import React from 'react';
import StatsCard from '../components/StatsCard';
import '../styles/Views.css';

const DashboardView = ({ stats }) => {
  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <h2>MISSION OVERVIEW</h2>
        <p>Operational health and resource tracking</p>
      </div>

      <div className="stats-grid">
        <StatsCard label="Total Items" value={stats.total} color="cyan" icon="📦" />
        <StatsCard label="Waste Items" value={stats.waste} color="purple" icon="♻" />
        <StatsCard label="Expired Items" value={stats.expired} color="red" icon="⌛" />
      </div>

      <div className="dashboard-content-grid">
        <div className="glass-panel summary-panel">
          <h3>SYSTEM STATUS REPORT</h3>
          <div className="status-grid">
            <div className="status-row">
              <span>Database Integrity:</span>
              <span className="online">100% SECURE</span>
            </div>
            <div className="status-row">
              <span>Sensor Network:</span>
              <span className="online">OPERATIONAL</span>
            </div>
            <div className="status-row">
              <span>Station Link:</span>
              <span className="online">STABLE (408 KM)</span>
            </div>
          </div>
        </div>

        <div className="glass-panel activity-panel">
          <h3>RECENT ACTIVITY</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="time">12:45</span>
              <span className="event">CARGO SCAN COMPLETED</span>
            </div>
            <div className="activity-item">
              <span className="time">11:20</span>
              <span className="event">WASTE AUDIT INITIATED</span>
            </div>
            <div className="activity-item">
              <span className="time">09:15</span>
              <span className="event">SMART LOCATOR RE-CALIBRATED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
