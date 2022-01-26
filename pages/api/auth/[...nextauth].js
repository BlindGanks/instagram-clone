import { doc, getDoc, setDoc } from "firebase/firestore";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../../../firebase";

export default NextAuth({
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
      const docRef = doc(db, "users", session.user.email);
      let docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {});
      }

      session.user.uid = token.sub;
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLowerCase();

      return session;
    },
  },
});
