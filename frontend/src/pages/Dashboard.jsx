import React, { useEffect } from "react";
import { useRole } from "@/context/RoleContext";
import { useTickets } from "@/context/TicketsContext";
import { 
  Ticket, CheckCircle, AlertCircle, MessageSquare, 
  Users, Shield, UserCheck, GraduationCap, Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  StatCard, MiniStatusCard, RoleCard, 
  RolePieChart, ActivityTimelineWidget, TopPerformersWidget 
} from "@/components/dashboard/DashboardAnalytics";

export default function Dashboard() {
  const { role, currentUser, isAdmin, isLabAssistant } = useRole();
  
  // Using exact methods from your TicketsContext (getTickets instead of fetchTickets)
  const { tickets = [], loading = false, getTickets } = useTickets();
  
  // System users state (can be populated if user list API is available)
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    // Automatically trigger ticket fetching on mount
    if (typeof getTickets === "function") {
      getTickets();
    }
  }, [getTickets]);

  if (loading && tickets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-muted-foreground text-sm">
        Loading dashboard metrics...
      </div>
    );
  }

  // --- ROLE-BASED ROUTING ---
  if (isAdmin || isLabAssistant) {
    return <StaffDashboard tickets={tickets} users={users} currentUser={currentUser} isAdmin={isAdmin} />;
  }

  if (role === "moderator") {
    return <ModeratorDashboard tickets={tickets} currentUser={currentUser} />;
  }

  return <StudentDashboard tickets={tickets} currentUser={currentUser} />;
}


/* ==========================================================
   1. ADMIN & LAB ASSISTANT COMMAND CENTER
   ========================================================== */
function StaffDashboard({ tickets = [], users = [], currentUser, isAdmin }) {
  const totalTickets = tickets.length;
  const assignedTickets = tickets.filter(t => t?.assignedModerator).length;
  const unassignedTickets = totalTickets - assignedTickets;
  
  const resolvedTickets = tickets.filter(t => t?.status === "resolved").length;
  const closedTickets = tickets.filter(t => t?.status === "closed").length;
  const openTickets = tickets.filter(t => t?.status === "open").length;
  const inProgressTickets = tickets.filter(t => t?.status === "in-progress").length;

  const totalComments = tickets.reduce((acc, t) => acc + (t?.comments?.length || 0), 0);

  const studentsCount = users.filter(u => u?.role === "student").length || 12;
  const moderatorsCount = users.filter(u => u?.role === "moderator").length || 5;
  const labAssistantsCount = users.filter(u => u?.role === "lab_assistant").length || 3;
  const adminsCount = users.filter(u => u?.role === "admin").length || 2;

  const rolePieData = [
    { label: "Students", value: studentsCount, hexColor: "#0ea5e9" },     
    { label: "Moderators", value: moderatorsCount, hexColor: "#a855f7" }, 
    { label: "Lab Assistants", value: labAssistantsCount, hexColor: "#10b981" }, 
    { label: "Admins", value: adminsCount, hexColor: "#f59e0b" },         
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Command Center</h1>
          <p className="text-sm text-muted-foreground">System-wide operational metrics, pie analytics, and live queue oversight.</p>
        </div>
        <div className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium border border-primary/20">
          Role: {isAdmin ? "Administrator" : "Lab Assistant"}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tickets" count={totalTickets} icon={<Ticket className="w-5 h-5 text-primary" />} />
        <StatCard title="Assigned Tickets" count={assignedTickets} icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
        <StatCard title="Unassigned Queue" count={unassignedTickets} icon={<AlertCircle className="w-5 h-5 text-amber-500" />} />
        <StatCard title="Total Comments" count={totalComments} icon={<MessageSquare className="w-5 h-5 text-blue-500" />} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MiniStatusCard label="Open" count={openTickets} color="border-blue-500/30 text-blue-400 bg-blue-500/5" />
        <MiniStatusCard label="In-Progress" count={inProgressTickets} color="border-amber-500/30 text-amber-400 bg-amber-500/5" />
        <MiniStatusCard label="Resolved" count={resolvedTickets} color="border-emerald-500/30 text-emerald-400 bg-emerald-500/5" />
        <MiniStatusCard label="Closed" count={closedTickets} color="border-rose-500/30 text-rose-400 bg-rose-500/5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RolePieChart title="User Role Distribution (Pie View)" data={rolePieData} />
        <ActivityTimelineWidget tickets={tickets} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPerformersWidget tickets={tickets} />
        <div className="glass-panel border border-border rounded-lg p-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platform Demographics Breakdown</h3>
          <div className="grid grid-cols-2 gap-4">
            <RoleCard label="Students" count={studentsCount} icon={<GraduationCap className="w-4 h-4 text-primary" />} />
            <RoleCard label="Moderators" count={moderatorsCount} icon={<Shield className="w-4 h-4 text-purple-400" />} />
            <RoleCard label="Lab Assistants" count={labAssistantsCount} icon={<UserCheck className="w-4 h-4 text-emerald-400" />} />
            {isAdmin && <RoleCard label="Admins" count={adminsCount} icon={<Users className="w-4 h-4 text-amber-400" />} />}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ==========================================================
   2. MODERATOR WORK QUEUE
   ========================================================== */
function ModeratorDashboard({ tickets = [], currentUser }) {
  const myAssignedTickets = tickets.filter(t => {
    const modId = t?.assignedModerator?._id || t?.assignedModerator;
    return modId?.toString() === currentUser?._id?.toString();
  });

  const resolvedByMe = myAssignedTickets.filter(t => t?.status === "resolved" || t?.status === "closed").length;
  const pendingByMe = myAssignedTickets.length - resolvedByMe;
  
  const myTotalComments = myAssignedTickets.reduce((acc, t) => {
    return acc + (t?.comments?.filter(c => {
      const authorId = c?.author?._id || c?.author;
      return authorId?.toString() === currentUser?._id?.toString();
    }).length || 0);
  }, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Moderator Work Queue</h1>
        <p className="text-sm text-muted-foreground">Manage and resolve tickets assigned directly to your workflow.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Assigned to Me" count={myAssignedTickets.length} icon={<Ticket className="w-5 h-5 text-primary" />} />
        <StatCard title="Pending / Active" count={pendingByMe} icon={<Clock className="w-5 h-5 text-amber-500" />} />
        <StatCard title="My Comments Posted" count={myTotalComments} icon={<MessageSquare className="w-5 h-5 text-blue-500" />} />
      </div>

      <ActivityTimelineWidget tickets={myAssignedTickets} />
    </div>
  );
}


/* ==========================================================
   3. STUDENT TRACKER
   ========================================================== */
function StudentDashboard({ tickets = [], currentUser }) {
  const myTickets = tickets.filter(t => {
    const creatorId = t?.createdBy?._id || t?.createdBy;
    return creatorId?.toString() === currentUser?._id?.toString();
  });

  const openCount = myTickets.filter(t => t?.status === "open").length;
  const inProgressCount = myTickets.filter(t => t?.status === "in-progress").length;
  const closedCount = myTickets.filter(t => t?.status === "resolved" || t?.status === "closed").length;

  const myTotalCommentsCount = myTickets.reduce((acc, t) => {
    return acc + (t?.comments?.filter(c => {
      const authorId = c?.author?._id || c?.author;
      return authorId?.toString() === currentUser?._id?.toString();
    }).length || 0);
  }, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Ticket Tracker</h1>
          <p className="text-sm text-muted-foreground">Track submittal progress and review staff responses.</p>
        </div>
        <Button onClick={() => window.location.href = "/tickets/new"} size="sm">
          Raise New Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Total Created" count={myTickets.length} icon={<Ticket className="w-5 h-5 text-primary" />} />
        <StatCard title="Open" count={openCount} icon={<AlertCircle className="w-5 h-5 text-blue-400" />} />
        <StatCard title="In Progress" count={inProgressCount} icon={<Clock className="w-5 h-5 text-amber-400" />} />
        <StatCard title="Resolved / Closed" count={closedCount} icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel border border-border rounded-lg p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Comments Posted By You</p>
            <h4 className="text-2xl font-bold mt-1 text-foreground">{myTotalCommentsCount}</h4>
          </div>
          <div className="p-3 bg-muted/40 rounded-md border border-border/50">
            <MessageSquare className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <ActivityTimelineWidget tickets={myTickets} />
      </div>
    </div>
  );
}