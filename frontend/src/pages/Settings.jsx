import React from 'react';
import { useRole } from '@/context/RoleContext';
import Profile from '@/components/auth/Profile';
import ProfileList from '@/components/auth/ProfileList';

const Setting = () => {
  const { isAdmin, isModerator, isLabAssistant, isStudent } = useRole();

  if (isStudent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card p-8 rounded-lg text-center border-destructive">
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground">Students do not have permission to access Settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold glass-heading">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and permissions</p>
        </header>

        {(isAdmin || isLabAssistant) ? (
          <ProfileList />
        ) : isModerator ? (
          <Profile />
        ) : (
          <p className="text-muted-foreground italic">Identifying user permissions...</p>
        )}
      </div>
    </div>
  );
};

export default Setting;