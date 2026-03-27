import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Profile = () => {
  const { id } = useParams();

  const { users, currentUser, handleUpdateRole } = useAuth();

  const user = id
    ? users?.find(u => u.id === id)
    : currentUser;

  const [newRole, setNewRole] = useState(user?.role || '');

  if (!user) return <div className="p-8 text-center">User not found</div>;

  const handleRoleChange = (e) => {
    e.preventDefault();

    // ✅ FIXED: correct function
    handleUpdateRole(user.id, newRole);

    alert('Role updated successfully!');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="auth-heading mb-10 text-left">{user.name}'s Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 text-secondary">Current Designation</h3>
            <p className="text-3xl font-light tracking-tight">{user.role}</p>
          </div>

          <form onSubmit={handleRoleChange} className="mt-8 pt-8 border-t border-border">
            <label className="auth-label">Change User Role</label>
            <div className="flex gap-3">
              <select
                className="auth-select flex-1"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
                <option value="lab_assistant">Lab Assistant</option>
              </select>
              <button type="submit" className="auth-btn mt-0 w-auto px-6">
                Update
              </button>
            </div>
          </form>
        </div>

        <div className="glass-panel p-8 rounded-2xl border-glass">
          <div className="mb-6">
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Contact Information</h3>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-accent italic">{user.email}</p>
          </div>

          <div>
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Core Competencies</h3>
            <div className="flex flex-wrap gap-3">
              {user.skills?.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-black/40 border border-border rounded-lg hover:border-accent transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;