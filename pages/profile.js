import { BookmarkIcon, ViewGridIcon } from "@heroicons/react/outline";
import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export default function profile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts"),
          where("userEmail", "==", session.user.email),
          orderBy("timestamp", "desc")
        ),
        (docs) => {
          const _posts = [];
          docs.forEach((doc) => {
            _posts.push(doc);
          });
          setPosts(_posts);
        }
      ),
    [db]
  );
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Header />
      <main className="max-w-6xl mx-auto">
        <div className="py-4 md:py-8 md:px-10 space-y-12">
          <Profile />
          {/* content*/}
          <div className="max-w-4xl mx-auto border-t-[1px] border-gray-300">
            <div className="h-12 flex justify-center space-x-10">
              <span className="h-full -mt-px w-16 flex items-center justify-between border-t-[1px] border-black">
                <ViewGridIcon className="h-4 w-4" />
                POSTS
              </span>
              <span className="h-full -mt-px w-16 flex items-center justify-between border-t-[1px] opacity-40">
                <BookmarkIcon className="h-4 w-4" />
                SAVED
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 md:gap-7">
              {posts.map((post) => {
                return (
                  <div key={post.id} className="flex-1">
                    <img
                      className="w-full lg:h-72 "
                      src={post.data().image}
                      alt="post img"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Modal />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
