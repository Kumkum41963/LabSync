import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, currentUser, handleUpdateRole, handleUpdateSkills, handleRemoveSkill } = useAuth();
  const { isAdmin, isModerator, isLabAssistant } = useRole();

  // It is important to use useMemo here to avoid unnecessary recalculations of the user object on every render, especially when users or currentUser change. This ensures that the user is only recalculated when id, users, or currentUser change.
  const user = useMemo(() => {
    return id ? users?.find(u => u.id === id || u._id === id) : currentUser;
  }, [id, users, currentUser]);

  const [newRole, setNewRole] = useState(user?.role || '');
  const [skillInput, setSkillInput] = useState('');
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [isAddingSkills, setIsAddingSkills] = useState(false);

  useEffect(() => {
    if (user?.role) {
      setNewRole(user.role);
    }
  }, [user?.role]);

  if (!user) return <div className="p-8 text-center glass-panel">User not found</div>;

  const handleRoleChange = async (e) => {
    e.preventDefault();

    console.log('Role change krna strt')

    if (newRole === user.role) {
      toast.error('Role is already set to this value.');
      return;
    }
    
    // if not same i.e new role changed 
    setIsUpdatingRole(true)
    const toastId = toast.loading('Updating user role...')

    try {
      await handleUpdateRole(user.id || user._id, newRole);

      toast.success(`Role updated successfully to ${newRole.replace('_', ' ')}!`, { id: toastId });
    } catch (error) {
      console.error('Failed to update role:', error);
      toast.error(error?.message || 'Failed to update role. Please try again.', { id: toastId });
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;

    const skillsArray = skillInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');

    setIsAddingSkills(true);
    const toastId = toast.loading('Adding skills...');

    try {
      await handleUpdateSkills(user.id || user._id, skillsArray);
      toast.success('Skills added successfully!', { id: toastId });
      setSkillInput('');
    } catch (error) {
      console.error('Failed to add skills:', error);
      toast.error('Failed to add skills.', { id: toastId });
    } finally {
      setIsAddingSkills(false);
    }
  };

  const handleDeleteSkill = async (skillToRemove) => {
    const toastId = toast.loading(`Removing ${skillToRemove}...`);
    try {
      await handleRemoveSkill(user.id || user._id, skillToRemove);
      toast.success(`Removed ${skillToRemove}`, { id: toastId });
    } catch (error) {
      console.error('Failed to remove skill:', error);
      toast.error('Failed to remove skill.', { id: toastId });
    }
  };

return (
    <div className="max-w-4xl mx-auto space-y-6">
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

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/30 pb-6">
        <div>
          <h1 className="auth-heading text-left capitalize mb-0">Profile: {user.name}</h1>
          <p className="text-accent italic text-sm">{user.email}</p>
        </div>
        <div className="text-left sm:text-right">
          <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Current Designation</h3>
          <p className="text-2xl font-light tracking-tight text-secondary capitalize">
            {user.role?.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Administrative Controls Section */}
      {(isAdmin || isLabAssistant) && (
        <div className="glass-panel p-6 rounded-2xl border border-border/60 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
              Administrative Controls
            </h3>
          </div>
          <form onSubmit={handleRoleChange} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="auth-label text-xs mb-1.5 block">Assign New User Role</label>
              <select 
                className="auth-select w-full bg-background/80 border-border focus:ring-2 focus:ring-primary/40 rounded-xl" 
                value={newRole} 
                onChange={(e) => setNewRole(e.target.value)}
                disabled={isUpdatingRole}
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
                <option value="lab_assistant">Lab Assistant</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={isUpdatingRole}
              className="auth-btn mt-0 w-full sm:w-auto px-8 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl disabled:opacity-50 transition-all"
            >
              {isUpdatingRole ? 'Updating...' : 'Save Role Change'}
            </button>
          </form>
        </div>
      )}

      {/* Skills Management Section */}
      <div className="glass-panel p-6 rounded-2xl border border-border/60 shadow-lg space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">Skills & Technologies</h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {user?.skills?.length > 0 ? (
              user.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="group relative inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 bg-background/60 border border-border/80 rounded-xl text-xs capitalize font-medium hover:border-accent transition-all shadow-sm"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(skill)}
                    className="w-4 h-4 rounded-full bg-muted-foreground/20 text-muted-foreground hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors text-[10px]"
                    title="Remove skill"
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-xs italic">No skills added yet.</p>
            )}
          </div>
        </div>

        {/* Add Skill Input Row */}
        <div className="pt-6 border-t border-border/50">
          <form onSubmit={handleAddSkill} className="space-y-3">
            <label className="auth-label !ml-0 text-xs font-medium">Add Skill Badges</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input 
                type="text" 
                disabled={isAddingSkills}
                className="auth-input w-full pl-4 pr-4 py-2.5 bg-background/50 border-border/70 rounded-xl focus:bg-background focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm" 
                placeholder="Comma separated (e.g. React, Node, Python...)" 
                value={skillInput} 
                onChange={(e) => setSkillInput(e.target.value)} 
              />
              <button 
                type="submit" 
                disabled={isAddingSkills}
                className="w-full sm:w-auto px-6 py-2.5 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                <span>{isAddingSkills ? 'Adding...' : '+ Add Skills'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;