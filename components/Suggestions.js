import React, { useState, useEffect } from "react";
import Faker from "@faker-js/faker";

function Suggestions() {
  const [suggestions, setSuggetions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...Faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggetions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray600">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={profile.avatar}
            alt="img"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold">{profile.username}</h2>
            <h3 className="text-sm text-gray-400">
              Works at {profile.company.name}
            </h3>
          </div>
          <button className="text-xs text-blue-400 font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
