import React from 'react'

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-3 border-primary border-t-transparent animate-spin mx-auto"></div>
        <p className="text-lg font-medium">Checking authentication</p>
      </div>
    </div>
  )
}

export default Loader