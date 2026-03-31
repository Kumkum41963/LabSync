// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
// import { useRole } from '@/context/RoleContext';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { users, currentUser, handleUpdateRole, handleUpdateSkills } = useAuth();
//   const { isAdmin, isModerator, isLabAssistant } = useRole();

//     // sync the role when user changes the role
//   useEffect(()=>{
//     if(user?.role) {
//        setNewRole(user.role);
//     }
//   }, [user?.role])

//   // If Admin then we need id to access 
//   // If current user then directly can be accessed
//   const user = id
//     ? users?.find(u => u.id === id || u._id === id)
//     : currentUser;

//   const [newRole, setNewRole] = useState(user?.role || '');
//   const [skillInput, setSkillInput] = useState([]);

//   if (!user) return <div className="p-8 text-center glass-panel">User not found</div>;



//   const handleRoleChange = (e) => {
//     e.preventDefault();
//     handleUpdateRole(user.id || user._id, newRole);
//     console.log('Role updated successfully');
//   };

//   const handleAddSkill = (e) => {
//     e.preventDefault();
//     if (!skillInput.trim()) return;
//     handleUpdateSkills(user.id || user._id, skillInput.trim());
//     setSkillInput('');
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-8">
//       {
//         (isAdmin || isLabAssistant) && (
//           <div className="mb-4">
//             <button
//               onClick={() => navigate('/settings')}
//               className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group"
//             >
//               <span className="transform transition-transform group-hover:-translate-x-1">
//                 ←
//               </span>
//               Back to Settings
//             </button>
//           </div>
//         )
//       }
//       <h1 className="auth-heading mb-10 text-left capitalize">
//         Profile: {user.name}
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

//         {/* Left Box: Role Management */}
//         <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between border-glass shadow-lg">
//           <div>
//             <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Current Designation</h3>
//             <p className="text-3xl font-light tracking-tight text-secondary capitalize">
//               {user.role?.replace('_', ' ')}
//             </p>
//           </div>

//           {(isAdmin || isLabAssistant) ? (
//             <form onSubmit={handleRoleChange} className="mt-3 pt-4 border-t border-border/50">
//               <label className="auth-label">Change User Role</label>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <select
//                   className="auth-select flex-1"
//                   value={newRole}
//                   onChange={(e) => setNewRole(e.target.value)}
//                 >
//                   <option value="admin">Admin</option>
//                   <option value="student">Student</option>
//                   <option value="moderator">Moderator</option>
//                   <option value="lab_assistant">Lab Assistant</option>
//                 </select>
//                 <button type="submit" className="auth-btn mt-0 w-auto px-6 whitespace-nowrap">
//                   Update Role
//                 </button>
//               </div>
//             </form>
//           ) : (
//             isModerator && (
//               <div className="mt-3 pt-4 border-t border-border/50">
//                 <p className="text-sm text-muted-foreground italic">Only Admins and Lab Assistants can change roles.</p>
//               </div>
//             )
//           )}
//         </div>

//         {/* Right Box: Contact & Skills Form */}
//         <div className="glass-panel p-8 rounded-2xl border-glass shadow-lg flex flex-col gap-6">

//           {/* Contact Info Section */}
//           <div className="space-y-2">
//             <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Account Details</h3>
//             <div className="flex flex-col gap-1">
//               <p className="text-sm text-muted-foreground">Name: <span className="text-foreground font-medium capitalize ml-2">{user.name}</span></p>
//               <p className="text-sm text-muted-foreground">Email: <span className="text-accent italic ml-2">{user.email}</span></p>
//             </div>
//           </div>

//           {/* Skills Display */}
//           <div className="pt-4 border-t border-border/50">
//             <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Skills & Technologies</h3>
//             <div className="flex flex-wrap gap-2 mb-6">
//               {user?.skills?.length > 0 ? (
//                 user.skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-black/40 border border-border rounded-md text-xs hover:border-accent transition-colors capitalize"
//                   >
//                     {skill}
//                   </span>
//                 ))
//               ) : (
//                 <p className="text-muted-foreground text-xs italic">No skills added yet. Start by adding yours.</p>
//               )}
//             </div>

//             {/* Add Skill Form */}
//             <form onSubmit={handleAddSkill} className="space-y-2">
//               <label className="auth-label !ml-0">Add New Skill</label>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   className="auth-input flex-1"
//                   placeholder="e.g. Microcontroller, HAL..."
//                   value={skillInput}
//                   onChange={(e) => setSkillInput(e.target.value)}
//                 />
//                 <button type="submit" className="auth-btn mt-0 w-auto px-4 py-1 text-sm">
//                   Add
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, currentUser, handleUpdateRole, handleUpdateSkills } = useAuth();
  const { isAdmin, isModerator, isLabAssistant } = useRole();

  // 1. Define the 'user' first. 
  // useMemo ensures we only re-find the user if the list or ID actually changes.
  const user = useMemo(() => {
    return id ? users?.find(u => u.id === id || u._id === id) : currentUser;
  }, [id, users, currentUser]);

  // 2. Initialize local form states
  const [newRole, setNewRole] = useState(user?.role || '');
  const [skillInput, setSkillInput] = useState(''); 

  // 3. Sync: If the user's role is updated by an admin, update the dropdown value
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
    await handleUpdateSkills(user.id || user._id, skillInput.trim());
    setSkillInput(''); // Clear input after success
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Navigation & Header */}
      {(isAdmin || isLabAssistant) && (
        <div className="mb-4">
          <button onClick={() => navigate('/settings')} className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group">
            <span className="transform transition-transform group-hover:-translate-x-1">←</span>
            Back to Settings
          </button>
        </div>
      )}
      <h1 className="auth-heading mb-10 text-left capitalize">Profile: {user.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left Box: Role Management */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between border-glass shadow-lg">
          <div>
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Current Designation</h3>
            <p className="text-3xl font-light tracking-tight text-secondary capitalize">
              {user.role?.replace('_', ' ')}
            </p>
          </div>

          {(isAdmin || isLabAssistant) ? (
            <form onSubmit={handleRoleChange} className="mt-3 pt-4 border-t border-border/50">
              <label className="auth-label">Change User Role</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <select className="auth-select flex-1" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                  <option value="moderator">Moderator</option>
                  <option value="lab_assistant">Lab Assistant</option>
                </select>
                <button type="submit" className="auth-btn mt-0 w-auto px-6 whitespace-nowrap">Update Role</button>
              </div>
            </form>
          ) : (
            isModerator && (
              <div className="mt-3 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground italic">Only Admins and Lab Assistants can change roles.</p>
              </div>
            )
          )}
        </div>

        {/* Right Box: Skills */}
        <div className="glass-panel p-8 rounded-2xl border-glass shadow-lg flex flex-col gap-6">
          <div className="space-y-2">
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Account Details</h3>
            <p className="text-sm text-muted-foreground">Name: <span className="text-foreground font-medium ml-2">{user.name}</span></p>
            <p className="text-sm text-muted-foreground">Email: <span className="text-accent italic ml-2">{user.email}</span></p>
          </div>

          <div className="pt-4 border-t border-border/50">
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {user?.skills?.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-black/40 border border-border rounded-md text-xs capitalize">{skill}</span>
                ))
              ) : (
                <p className="text-muted-foreground text-xs italic">No skills added yet.</p>
              )}
            </div>

            <form onSubmit={handleAddSkill} className="space-y-2">
              <label className="auth-label !ml-0">Add New Skill</label>
              <div className="flex gap-2">
                <input type="text" className="auth-input flex-1" placeholder="e.g. React, Node..." value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
                <button type="submit" className="auth-btn mt-0 w-auto px-4 py-1 text-sm">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;