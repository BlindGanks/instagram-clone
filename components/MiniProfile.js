import { signOut } from "firebase/auth";
import { useSession } from "next-auth/react";
import { auth } from "../firebase";

function MiniProfile() {
  const { data: session } = useSession();
  const { user } = session || { user: null };
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={user?.image}
        alt="profilePic"
        className="rounded-full border p-[2px] w-16 h-16"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{user?.username}</h2>
        <h3 className="text-sm text-gray-400">welcome to insta</h3>
      </div>

      <button
        className="text-blue-400 text-sm font-semibold"
        onClick={() => {
          signOut(auth)
            .then(() => {
              // Sign-out successful.
            })
            .catch((error) => {
              alert("Failed to sign out");
            });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
