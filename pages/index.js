import { useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header.js";
import Feed from "../components/Feed.js";
import { userState } from "../atoms/userAtom.js";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import Modal from "../components/Modal.js";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const authSubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user));
        setUser(userCopy);
      } else {
        setUser(null);
      }
    });
    return authSubscriber;
  }, []);

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </div>
  );
}
