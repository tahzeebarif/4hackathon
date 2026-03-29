import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import { FaUsers, FaVideo, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    videos: 0,
    activeSubscriptions: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, videosRes] = await Promise.all([
        API.get('/users'),
        API.get('/videos/admin/all')
      ]);

      const users = usersRes.data.users || [];
      const videos = videosRes.data.videos || [];
      const activeSubs = users.filter(u => u.subscription?.status === 'active').length;
      
      // Simple revenue logic for demo (Basic $10, Standard $15, Premium $20)
      const revenue = users.reduce((acc, u) => {
        if (u.subscription?.status === 'active') {
          if (u.subscription.plan === 'basic') return acc + 10;
          if (u.subscription.plan === 'standard') return acc + 15;
          if (u.subscription.plan === 'premium') return acc + 20;
        }
        return acc;
      }, 0);

      setStats({
        users: users.length,
        videos: videos.length,
        activeSubscriptions: activeSubs,
        revenue
      });
    } catch (err) {
      console.error('Error fetching admin stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Super Admin. Here's what's happening on StreamVibe.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users-icon"><FaUsers /></div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.users}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon video-icon"><FaVideo /></div>
          <div className="stat-info">
            <h3>Total Videos</h3>
            <p className="stat-value">{stats.videos}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon subs-icon"><FaChartLine /></div>
          <div className="stat-info">
            <h3>Active Subscriptions</h3>
            <p className="stat-value">{stats.activeSubscriptions}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue-icon"><FaMoneyBillWave /></div>
          <div className="stat-info">
            <h3>Monthly Revenue</h3>
            <p className="stat-value">${stats.revenue}</p>
          </div>
        </div>
      </div>

      <div className="admin-sections-preview">
        <div className="preview-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="btn-secondary" onClick={() => window.location.href='/admin/videos'}>Upload New Video</button>
            <button className="btn-secondary" onClick={() => window.location.href='/admin/users'}>Manage Users</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
