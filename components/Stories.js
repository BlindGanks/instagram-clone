import React, { useEffect, useState } from "react";
import Story from "./Story.js";
import Faker from "@faker-js/faker";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom.js";
function Stories() {
  const [user, setUser] = useRecoilState(userState);
  const [stories, setStories] = useState([]);
  useEffect(() => {
    const _stories = [...Array(20)].map((_, i) => ({
      ...Faker.helpers.contextualCard(),
      id: i,
    }));
    setStories(_stories);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {user && <Story img={user.photoURL} username={user.displayName} />}
      {stories.map((profile) => (
        <Story
          username={profile.username}
          img={profile.avatar}
          key={profile.id}
        />
      ))}
    </div>
  );
}

export default Stories;
