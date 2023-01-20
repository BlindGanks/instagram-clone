import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/solid";
import { HomeIcon as HomeIconOutline } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
function Header() {
  const [open, setOpen] = useRecoilState(modalState);
  const [visibleUserMenu, setVisibleUserMenu] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { user } = session || { user: null };
  return (
    <div className="h-16 shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="h-full flex items-center justify-between max-w-6xl mx-5 xl:mx-auto">
        {/*left*/}
        <div
          onClick={() => router.push("/")}
          className="relative lg:inline-block w-24 h-12 cursor-pointer"
        >
          <Image
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/*middle -- search input field*/}
        <div className="max-w-xs">
          <div className="hidden sm:block relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              type="text"
              placeholder="search"
            />
          </div>
        </div>
        {/*right -- icons */}
        <div className="flex items-center justify-end space-x-4">
          {router.pathname != "/profile" ? (
            <HomeIconSolid
              onClick={() => router.push("/")}
              className="navBtn"
            />
          ) : (
            <HomeIconOutline
              onClick={() => router.push("/")}
              className="navBtn"
            />
          )}
          {user ? (
            <>
              <div className="relative navBtn ">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <div
                onClick={() => setVisibleUserMenu(!visibleUserMenu)}
                className="relative"
              >
                <img
                  src={user?.image}
                  alt="profile pic"
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
                <div
                  className={`absolute top-10 right-0 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
                    !visibleUserMenu && "hidden"
                  }`}
                  id="user-dropdown"
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user?.username}
                    </span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                  <ul>
                    <li
                      onClick={() =>
                        router.pathname != "/profile" &&
                        router.push("./profile")
                      }
                    >
                      <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                        Profile
                      </a>
                    </li>
                    <li onClick={signOut}>
                      <a className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
