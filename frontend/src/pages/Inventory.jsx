import React from 'react'
import { Package, Construction } from 'lucide-react'

const Inventory = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground text-lg">
          Manage laboratory equipment and resources
        </p>
      </div>

      <div className="glass-panel border border-border rounded-lg p-12 text-center space-y-6">
        <div className="flex justify-center">
          <Construction className="w-16 h-16 text-primary opacity-50" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The Inventory management system is currently under development. Check back soon for full inventory tracking capabilities.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Inventory