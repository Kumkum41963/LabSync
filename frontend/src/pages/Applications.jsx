import React from 'react'
import { Briefcase, Construction } from 'lucide-react'

const Applications = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground text-lg">
          Track and manage lab access applications
        </p>
      </div>

      <div className="glass-panel border border-border rounded-lg p-12 text-center space-y-6">
        <div className="flex justify-center">
          <Construction className="w-16 h-16 text-primary opacity-50" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The Applications management system is currently under development. Check back soon to manage lab access applications.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Applications