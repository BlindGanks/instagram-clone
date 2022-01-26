import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
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
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
          saves={post.data().saves}
        />
      ))}
    </div>
  );
}
