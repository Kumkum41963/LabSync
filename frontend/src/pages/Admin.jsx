import React from 'react'
import { Shield, Users, Settings, Construction } from 'lucide-react'

const Admin = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Manage users, settings, and system configurations
        </p>
      </div>

      {/* Admin Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Management</h3>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Manage user accounts, roles, and permissions
          </p>
        </div>

        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">System Settings</h3>
            <Settings className="w-5 h-5 text-accent" />
          </div>
          <p className="text-muted-foreground text-sm">
            Configure system-wide settings and preferences
          </p>
        </div>

        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reports</h3>
            <div className="w-5 h-5 rounded-full bg-primary"></div>
          </div>
          <p className="text-muted-foreground text-sm">
            View system logs and administrative reports
          </p>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="glass-panel border border-border rounded-lg p-12 text-center space-y-6">
        <div className="flex justify-center">
          <Construction className="w-16 h-16 text-primary opacity-50" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Admin Features in Development</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced admin controls are being developed. These will include comprehensive user management, system configuration, audit logs, and reporting tools.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Admin