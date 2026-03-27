import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProfileList = () => {
  const { users } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-8 min-h-screen">
      <h1 className="auth-heading mb-8">User Directory</h1>

      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-black/20">
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr 
                key={user.id} 
                onClick={() => navigate(`/profile/${user.id}`)}
                className="cursor-pointer"
              >
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.skills?.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileList;