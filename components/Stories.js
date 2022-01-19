import React, { useEffect, useState } from "react";
import Story from "./Story.js";
import { useSession } from "next-auth/react";
import Faker from "@faker-js/faker";

function Stories() {
  const { data: session } = useSession();
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
      {session && (
        <Story img={session.user.image} username={session.user.name} />
      )}
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
