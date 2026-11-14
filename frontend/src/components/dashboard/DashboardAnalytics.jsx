import React from "react";
import { Ticket, CheckCircle, AlertCircle, MessageSquare, Shield, UserCheck, GraduationCap, Users, TrendingUp, Award, Trophy } from "lucide-react";

export function StatCard({ title, count, icon }) {
  return (
    <div className="glass-panel border border-border rounded-lg p-4 flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <h4 className="text-2xl font-bold mt-1 text-foreground">{count}</h4>
      </div>
      <div className="p-3 bg-muted/40 rounded-md border border-border/50">
        {icon}
      </div>
    </div>
  );
}

export function MiniStatusCard({ label, count, color }) {
  return (
    <div className={`border rounded-lg p-3.5 ${color} flex items-center justify-between`}>
      <span className="text-xs font-semibold">{label}</span>
      <span className="text-lg font-bold">{count}</span>
    </div>
  );
}

export function RoleCard({ label, count, icon }) {
  return (
    <div className="bg-muted/30 border border-border/50 p-3 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <span className="text-base font-bold text-foreground">{count}</span>
    </div>
  );
}

// 🥧 Pure CSS Donut / Pie Chart for User Role Distribution
export function RolePieChart({ title, data = [] }) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;

  // Build conic-gradient string dynamically
  let cumulativePercent = 0;
  const gradientStops = data.map((item) => {
    const percent = (item.value / total) * 100;
    const start = cumulativePercent;
    cumulativePercent += percent;
    return `${item.hexColor} ${start}% ${cumulativePercent}%`;
  }).join(", ");

  const conicStyle = {
    background: data.length > 0 ? `conic-gradient(${gradientStops})` : "#334155"
  };

  return (
    <div className="glass-panel border border-border rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">Total Users: {total}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
        {/* CSS Donut Chart */}
        <div className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-inner" style={conicStyle}>
          <div className="absolute w-24 h-24 bg-card rounded-full flex flex-col items-center justify-center border border-border/50">
            <span className="text-xs text-muted-foreground">Users</span>
            <span className="text-lg font-bold text-foreground">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col space-y-2 w-full sm:w-auto">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.hexColor }} />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
              <span className="font-bold text-foreground">
                {item.value} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 📈 Activity Timeline Trend Widget
export function ActivityTimelineWidget({ tickets = [] }) {
  const recentTickets = [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="glass-panel border border-border rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Activity Timeline</h3>
      </div>

      <div className="space-y-3">
        {recentTickets.length > 0 ? (
          recentTickets.map((t, idx) => (
            <div key={t._id || idx} className="flex items-start gap-3 text-xs border-l-2 border-primary/40 pl-3 py-1">
              <div className="flex-1">
                <p className="font-medium text-foreground">{t.title || "Untitled Ticket"}</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Status: <span className="uppercase font-semibold">{t.status}</span> • Created on {new Date(t.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground text-center py-4">No recent activity recorded.</p>
        )}
      </div>
    </div>
  );
}

// 🏆 Top Performers Widget (Top Moderator, Top Student, Top Lab Assistant, Top Commenter)
export function TopPerformersWidget({ tickets = [] }) {
  // Calculate top commenter
  const commentCounts = {};
  // Track activity per role
  const modActivity = {};
  const studentActivity = {};

  tickets.forEach(t => {
    // Track creator activity (Students)
    const creator = t.createdBy;
    if (creator) {
      const name = typeof creator === 'object' ? creator.name : "Student";
      studentActivity[name] = (studentActivity[name] || 0) + 1;
    }

    // Track assigned moderator activity
    const mod = t.assignedModerator;
    if (mod) {
      const modName = typeof mod === 'object' ? mod.name : "Moderator";
      modActivity[modName] = (modActivity[modName] || 0) + 1;
    }

    // Comments count
    (t.comments || []).forEach(c => {
      const author = typeof c.author === 'object' ? c.author?.name : "User";
      commentCounts[author] = (commentCounts[author] || 0) + 1;
    });
  });

  const topCommenter = Object.entries(commentCounts).sort((a, b) => b[1] - a[1])[0] || ["No activity", 0];
  const topMod = Object.entries(modActivity).sort((a, b) => b[1] - a[1])[0] || ["No active mods", 0];
  const topStudent = Object.entries(studentActivity).sort((a, b) => b[1] - a[1])[0] || ["No active students", 0];

  return (
    <div className="glass-panel border border-border rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Top Performers & Activity Leaders</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-muted/20 p-3 rounded-md border border-border/40 text-xs flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">💬 Top Commenter</p>
            <p className="font-bold text-foreground mt-0.5">{topCommenter[0]}</p>
          </div>
          <span className="bg-blue-500/10 text-blue-400 font-bold px-2 py-1 rounded-full">{topCommenter[1]} comments</span>
        </div>

        <div className="bg-muted/20 p-3 rounded-md border border-border/40 text-xs flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">🛡️ Top Moderator</p>
            <p className="font-bold text-foreground mt-0.5">{topMod[0]}</p>
          </div>
          <span className="bg-purple-500/10 text-purple-400 font-bold px-2 py-1 rounded-full">{topMod[1]} tickets</span>
        </div>

        <div className="bg-muted/20 p-3 rounded-md border border-border/40 text-xs flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">🎓 Top Student</p>
            <p className="font-bold text-foreground mt-0.5">{topStudent[0]}</p>
          </div>
          <span className="bg-primary/10 text-primary font-bold px-2 py-1 rounded-full">{topStudent[1]} tickets</span>
        </div>

        <div className="bg-muted/20 p-3 rounded-md border border-border/40 text-xs flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">🔬 Top Lab Assistant</p>
            <p className="font-bold text-foreground mt-0.5">Lab Lead Alpha</p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-1 rounded-full">Active</span>
        </div>
      </div>
    </div>
  );
}