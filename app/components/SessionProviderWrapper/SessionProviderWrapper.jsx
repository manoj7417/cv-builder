"use client"; // Marks this as a Client Component

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

function TokenRefresher() {
  const { data: session } = useSession();

  useEffect(() => {
    const interval = setInterval(async () => {
      // Refresh session every 5 minutes
      const res = await fetch("/api/auth/session");
      const currentSession = await res.json();

      if (!currentSession || currentSession.error === "RefreshAccessTokenError") {
        console.error("Session expired or refresh failed. Logging out...");
        signOut(); // Log the user out if token refresh fails
      }
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [session]);

  return null; // This component only handles the token refresh logic
}

export default function SessionProviderWrapper({ children }) {
  return (
    <SessionProvider>
      <TokenRefresher />
      {children}
    </SessionProvider>
  );
}
