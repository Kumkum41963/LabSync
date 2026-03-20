import React from 'react'
import { BarChart3, Zap } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome to LabSync. Your lab management hub.
        </p>
      </div>

      {/* Grid of stats/quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Overview</h3>
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Get insights into your lab operations
          </p>
        </div>

        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quick Stats</h3>
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <p className="text-muted-foreground text-sm">
            View real-time statistics and metrics
          </p>
        </div>

        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="w-5 h-5 rounded-full bg-primary"></div>
          </div>
          <p className="text-muted-foreground text-sm">
            Latest updates and changes
          </p>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="glass-panel border border-border rounded-lg p-12 text-center space-y-6">
        <h2 className="text-2xl font-semibold">More Features Coming Soon</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're actively developing advanced dashboard features including detailed analytics, team management, and resource tracking. Stay tuned!
        </p>
      </div>
    </div>
  )
}

export default Dashboard