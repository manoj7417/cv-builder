"use client"
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const VerifyRecruiter = () => {
  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token')
        
        if (!token) {
          setError('Invalid verification link')
          setVerifying(false)
          return
        }

        const response = await fetch('/api/recruiters/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token })
        })

        const data = await response.json()

        if (data.status === 'success') {
          toast.success('Email verified successfully!')
          // Redirect to recruiter login
          setTimeout(() => {
            router.push('/recruiter/login')
          }, 2000)
        } else {
          setError(data.message || 'Verification failed')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setError('Failed to verify email. Please try again.')
      } finally {
        setVerifying(false)
      }
    }

    verifyEmail()
  }, [searchParams, router])

  const handleResendVerification = async () => {
    try {
      const email = searchParams.get('email')
      if (!email) {
        toast.error('Email not found in verification link')
        return
      }

      const response = await fetch('/api/recruiters/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (data.status === 'success') {
        toast.success('Verification email resent successfully!')
      } else {
        toast.error(data.message || 'Failed to resend verification email')
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      toast.error('Failed to resend verification email')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Recruiter Email Verification
        </h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {verifying ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d3572]"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="text-red-600 mb-4">{error}</div>
              <button
                onClick={handleResendVerification}
                className="text-[#0d3572] hover:text-[#0d3572]/80 font-medium"
              >
                Resend verification email
              </button>
            </div>
          ) : (
            <div className="text-center text-green-600">
              <div className="mb-4">Email verified successfully!</div>
              <div className="text-gray-500 text-sm">
                Redirecting to login page...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyRecruiter 