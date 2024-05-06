'use client'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

function AuthHook() {
    const { userState } = useAuth()
    const router = useRouter()

    if (!userState.isAuthenticated) {
        router.push('/login')
    }
}

export default AuthHook