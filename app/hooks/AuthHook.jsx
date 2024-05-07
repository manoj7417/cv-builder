
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

function AuthHook() {
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!userState.isAuthenticated) {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        }
    }, []);
    return null;
}

export default AuthHook