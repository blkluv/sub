import React, { useEffect } from 'react'
import Auth from '../../components/Auth'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'

const AuthWrapper = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if(isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated])
  return (
    <div>
      <Auth />
    </div>
  )
}

export default AuthWrapper
