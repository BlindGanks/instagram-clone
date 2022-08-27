import { signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { auth } from "../firebase";

function MiniProfile() {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={user?.photoURL}
        alt="profilePic"
        className="rounded-full border p-[2px] w-16 h-16"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{user?.displayName}</h2>
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
