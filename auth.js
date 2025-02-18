import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

async function refreshAccessToken(token) {
  if (!token.refreshToken) {
    console.error("No refresh token available. Please log in again.");
    return {
      ...token,
      error: "NoRefreshToken",
    };
  } 

  try {
    const url = "https://oauth2.googleapis.com/token";
    const params = new URLSearchParams();
    params.append("client_id", process.env.AUTH_GOOGLE_ID);
    params.append("client_secret", process.env.AUTH_GOOGLE_SECRET);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", token.refreshToken);

    const response = await axios.post(url, params);
    const refreshedTokens = response.data;


    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token || token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error.response?.data || error.message);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
          access_type: "offline", // Requests offline access
          prompt: "consent", // Forces re-consent to get a refresh_token
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token || token.refreshToken;
        token.idToken = account.id_token; // Include idToken here
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
      }
    
      // Return the token directly if it hasn't expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
    
      // Refresh the access token if it has expired
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        idToken: token.idToken, 
      };
      return session;
    },
  },
  debug: true,
});
