import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

// Define the refreshAccessToken function
async function refreshAccessToken(token) {
    if (!token.refreshToken) {
      console.error("No refresh token available for refreshing the access token.");
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
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Expires in ms
        refreshToken: refreshedTokens.refresh_token || token.refreshToken, // Use the new refresh token if provided
      };
    } catch (error) {
      console.error("Error refreshing access token:", error.response?.data || error.message);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }
  

// NextAuth configuration
export const authOptions = {
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
    async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token || token.refreshToken;
          token.idToken = account.id_token;
          token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        }
      
        if (Date.now() < token.accessTokenExpires) {
          return token;
        }
        return await refreshAccessToken(token);
      }      
,
    async session({ session, token }) {
      // Pass the access token and refresh token to the client
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.idToken= token.idToken;
      session.error = token.error;
      return session;
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
