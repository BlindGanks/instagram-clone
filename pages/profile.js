import { BookmarkIcon, ViewGridIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import faker from "@faker-js/faker";
import { useEffect, useState } from "react";

function profile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const _posts = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setPosts(_posts);
  }, []);
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
              {posts.map((item) => (
                <div className="flex-1">
                  <img
                    className="w-full lg:h-72 "
                    src={item.avatar}
                    alt="post img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default profile;
