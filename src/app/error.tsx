'use client'

import { useEffect } from 'react'
import { Button, Container } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error boundary caught:', error)
  }, [error])

  return (
    <Container className="py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={reset}
            variant="default"
            size="lg"
          >
            Try again
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>If the problem persists, please contact our support team.</p>
            <p className="mt-2">
              <a 
                href="mailto:support@vivispa.ca" 
                className="text-primary hover:underline"
              >
                support@vivispa.ca
              </a>
            </p>
          </div>
        </div>
        
        {error.digest && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          </div>
        )}
      </div>
    </Container>
  )
} 