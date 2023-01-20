import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import adminFirestore from "../../../firebase-admin";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      const docRef = adminFirestore.collection("users").doc(session.user.email);
      let docSnap = await docRef.get();

      if (!docSnap.exists) await docRef.set({});

      session.user.uid = token.sub;
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLowerCase();

      return session;
    },
  },
};

export default NextAuth(authOptions);
