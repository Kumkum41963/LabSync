import React from 'react'
import { Bell, Construction } from 'lucide-react'

const Notices = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Notices</h1>
        <p className="text-muted-foreground text-lg">
          Stay updated with important lab announcements
        </p>
      </div>

      <div className="glass-panel border border-border rounded-lg p-12 text-center space-y-6">
        <div className="flex justify-center">
          <Construction className="w-16 h-16 text-primary opacity-50" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The Notices system is currently under development. Check back soon for important lab announcements and updates.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Notices