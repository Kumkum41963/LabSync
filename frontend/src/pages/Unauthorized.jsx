import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Lock className="w-16 h-16 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">Unauthorized</h2>
          <p className="text-muted-foreground text-lg">
            You don't have permission to access this resource. Please contact an administrator if you believe this is a mistake.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized