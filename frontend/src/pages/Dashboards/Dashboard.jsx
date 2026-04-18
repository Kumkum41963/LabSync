import React from 'react'
import StudentDashboard from './StudentDashboard'
import ModeratorDashboard from './ModeratorDashboard'
import LabAssistantDashboard from './LabassistantDashboard'
import AdminDashboard from './AdminDashboard'
import { useRole } from '@/context/RoleContext'

const Dashboard = () => {
  const { isStudent, isModerator, isLabAssistant, isAdmin } = useRole();

  const renderDashboard = () => {
    if (isStudent) return <StudentDashboard />;
    if (isLabAssistant) return <LabAssistantDashboard />;
    if (isModerator) return <ModeratorDashboard />;
    if (isAdmin) return <AdminDashboard />;
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome to LabSync. Your lab management hub.
        </p>
      </div>

      {renderDashboard()}
    </div>
  );
};

export default Dashboard;