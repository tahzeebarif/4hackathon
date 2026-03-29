import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { FaUserSlash, FaUserCheck, FaSearch } from 'react-icons/fa';
import './Admin.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async (id, isCurrentlyBlocked) => {
    try {
      const endpoint = isCurrentlyBlocked ? `/users/${id}/unblock` : `/users/${id}/block`;
      await API.patch(endpoint);
      setUsers(users.map(u => u._id === id ? { ...u, isBlocked: !isCurrentlyBlocked } : u));
    } catch (err) {
      alert('Action failed');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>User Management</h1>
        <p>View and manage platform users. Block or unblock access.</p>
      </div>

      <div className="admin-actions-bar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Subscription</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="user-info-cell">
                    <div className="avatar-sm">{user.name.charAt(0)}</div>
                    <div>
                      <p className="user-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${user.isBlocked ? 'blocked' : 'active'}`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td>
                  <span className="plan-badge">
                    {user.subscription?.plan?.toUpperCase() || 'NONE'}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className={`action-icon-btn ${user.isBlocked ? 'unblock' : 'block'}`}
                    onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                    title={user.isBlocked ? 'Unblock' : 'Block'}
                  >
                    {user.isBlocked ? <FaUserCheck /> : <FaUserSlash />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
