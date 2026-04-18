import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, currentUser, handleUpdateRole, handleUpdateSkills } = useAuth();
  const { isAdmin, isModerator, isLabAssistant } = useRole();

  // Find user based on URL ID or current session
  const user = useMemo(() => {
    return id ? users?.find(u => u.id === id || u._id === id) : currentUser;
  }, [id, users, currentUser]);

  const [newRole, setNewRole] = useState(user?.role || '');
  const [skillInput, setSkillInput] = useState('');

  // Keep role dropdown in sync with global state
  useEffect(() => {
    if (user?.role) {
      setNewRole(user.role);
    }
  }, [user?.role]);

  if (!user) return <div className="p-8 text-center glass-panel">User not found</div>;

  const handleRoleChange = async (e) => {
    e.preventDefault();
    await handleUpdateRole(user.id || user._id, newRole);
    console.log('Role updated successfully');
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    
    const skillsArray = skillInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');

    await handleUpdateSkills(user.id || user._id, skillsArray);
    setSkillInput('');
    console.log('Skills updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      {(isAdmin || isLabAssistant) && (
        <div className="mb-2">
          <button 
            onClick={() => navigate('/settings')} 
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">←</span>
            Back to Settings
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/30 pb-6">
        <div>
          <h1 className="auth-heading text-left capitalize mb-0">Profile: {user.name}</h1>
          <p className="text-accent italic text-sm">{user.email}</p>
        </div>
        <div className="text-left sm:text-right">
          <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Designation</h3>
          <p className="text-2xl font-light tracking-tight text-secondary capitalize">
            {user.role?.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Row 1: Role Management (Conditional) */}
      {(isAdmin || isLabAssistant) && (
        <div className="glass-panel p-6 rounded-2xl border-glass shadow-lg">
          <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Administrative Controls</h3>
          <form onSubmit={handleRoleChange} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="auth-label">Update User Role</label>
              <select 
                className="auth-select w-full" 
                value={newRole} 
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
                <option value="lab_assistant">Lab Assistant</option>
              </select>
            </div>
            <button type="submit" className="auth-btn mt-0 w-full sm:w-auto px-8">
              Save Role Change
            </button>
          </form>
        </div>
      )}

      {/* Row 2: Skills Management */}
      <div className="glass-panel p-6 rounded-2xl border-glass shadow-lg space-y-6">
        <div>
          <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Skills & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {user?.skills?.length > 0 ? (
              user.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-4 py-1.5 bg-black/40 border border-border rounded-lg text-xs capitalize hover:border-accent transition-colors"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-muted-foreground text-xs italic">No skills added yet.</p>
            )}
          </div>
        </div>

        {/* Add Skill Input Row */}
        <div className="pt-6 border-t border-border/50">
          <form onSubmit={handleAddSkill} className="space-y-3">
            <label className="auth-label !ml-0">Add New Skills</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                className="auth-input flex-1" 
                placeholder="Comma separated (e.g. React, Node, Python...)" 
                value={skillInput} 
                onChange={(e) => setSkillInput(e.target.value)} 
              />
              <button type="submit" className="auth-btn mt-0 w-full sm:w-auto px-10">
                Add Skills
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">
              Tip: Separate multiple skills with a comma
            </p>
          </form>
        </div>
      </div>

      {/* Row 3: Moderator Info (Only if not Admin/Assistant) */}
      {isModerator && !isAdmin && !isLabAssistant && (
        <div className="p-4 text-center border border-dashed border-border rounded-xl">
          <p className="text-sm text-muted-foreground italic">
            Note: Role management is restricted to Admins and Lab Assistants.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;