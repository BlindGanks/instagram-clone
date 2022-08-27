import { BookmarkIcon, ViewGridIcon } from "@heroicons/react/outline";
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
import { auth, db } from "../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { onAuthStateChanged } from "firebase/auth";

export default function profile() {
  const [user, setUser] = useRecoilState(userState);
  const [posts, setPosts] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [selectedContent, setSelectedContent] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts"),
          where("userEmail", "==", user?.email || ""),
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
    [db, user]
  );
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts"),
          where("saves", "array-contains", user?.uid || "")
        ),
        (docs) => {
          const _savedItems = [];
          docs.forEach((doc) => {
            _savedItems.push(doc);
          });
          setSavedItems(_savedItems);
        }
      ),
    [db, user]
  );
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
      <Header />
      <main className="max-w-6xl mx-auto">
        <div className="py-4 md:py-8 md:px-10 space-y-12">
          <Profile postsLength={posts.length} />
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
