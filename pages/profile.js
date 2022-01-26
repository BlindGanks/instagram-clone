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
  const [posts, setPosts] = useState();
  const [savedItems, setSavedItems] = useState([]);
  const [selectedContent, setSelectedContent] = useState([]);
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
          setSelectedContent(_posts);
        }
      ),
    [db]
  );
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts"),
          where("saves", "array-contains", session.user.email)
        ),
        (docs) => {
          const _savedItems = [];
          docs.forEach((doc) => {
            _savedItems.push(doc);
          });
          setSavedItems(_savedItems);
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
              <span
                onClick={() => setSelectedContent(posts)}
                className={`h-full -mt-px w-16 flex items-center justify-between border-t-[1px] cursor-pointer opacity-40 ${
                  selectedContent === posts && "border-black opacity-100"
                }`}
              >
                <ViewGridIcon className="h-4 w-4 cursor-pointer" />
                POSTS
              </span>
              <span
                onClick={() => setSelectedContent(savedItems)}
                className={`h-full -mt-px w-16 flex items-center justify-between border-t-[1px] cursor-pointer opacity-40 ${
                  selectedContent === savedItems && "border-black opacity-100"
                }`}
              >
                <BookmarkIcon className="h-4 w-4" />
                SAVED
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 md:gap-7">
              {selectedContent.map((item) => {
                return (
                  <div key={item.id} className="flex-1">
                    <img
                      className="w-full lg:h-72 "
                      src={item.data().image}
                      alt="item img"
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
