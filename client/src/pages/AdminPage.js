import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/users');
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users. Are you an Admin?');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: res.data.role } : user
      ));
    } catch (err) {
      setError('Failed to update role.');
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="page-container">
      <h2>Admin Dashboard: User Management</h2>
      {error && <p className="error-message">{error}</p>}
      
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;