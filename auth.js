import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // Add id_token to the token object
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token; // Extract id_token from account
      }
      return token;
    },
    // Pass idToken to the session
    async session({ session, token }) {
      session.idToken = token.idToken; // Make idToken available in the session
      return session;
    },
  },
  debug: false, // Enable debug mode to track what's happening
});
