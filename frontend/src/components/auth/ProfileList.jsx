import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProfileList = () => {
  const { users } = useAuth();
  const navigate = useNavigate();

  const getRoleStyle = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'badge-high';
      case 'lab_assistant': return 'badge-progress';
      case 'moderator': return 'badge-open';
      default: return 'badge-low';
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="auth-heading text-left mb-2">User Directory</h1>
        <p className="text-muted-foreground text-sm">Overview of all registered users and their technical competencies.</p>
      </div>

      <div className="glass-card rounded-2xl border-glass shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-black/40 border-b border-border">
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground font-bold">User Name</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground font-bold">Email Address</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground font-bold">Skills</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground font-bold">Designation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id || user._id}
                    // added the state to hold redirction from profile back to here
                    onClick={() => navigate(`/profile/${user.id || user._id}` )}
                    className="group cursor-pointer hover-elevate transition-all hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-4">
                      <span className="text-foreground font-medium capitalize group-hover:text-accent transition-colors">
                        {user.name}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground italic">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-md">
                        {user.skills?.length > 0 ? (
                          user.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] text-primary uppercase font-bold tracking-tight"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-muted-foreground/40 italic">Not set</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${getRoleStyle(user.role)}`}>
                        {user.role?.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-muted-foreground italic">
                    No users found in directory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileList;