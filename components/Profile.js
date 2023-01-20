import { useSession } from "next-auth/react";

function Profile({ postsLength }) {
  const { data: session } = useSession();
  const { user } = session || { user: null };
  return (
    <div className="flex lg:px-24 px-4 sm">
      <div className="flex-[0.3] mr-4">
        <img
          src={user?.image}
          alt="profile pic"
          className="h-20 w-20 md:h-36 md:w-36 rounded-full cursor-pointer m-auto"
        />
      </div>
      <div className="flex-[0.6] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0">
          <h1 className="text-3xl font-thin mr-5">{user?.name}</h1>
          <a className="w-full sm:w-auto text-center px-2 py-1 whitespace-nowrap rounded-[4px] border border-gray-300 font-medium text-sm">
            Edit Profile
          </a>
        </div>
        <div className="flex flex-row sm:flex-col sm:justify-center space-x-3 sm:space-x-0 sm:space-y-4">
          <h1>{`${postsLength} posts`}</h1>
          <h1 className="font-semibold">{user?.username}</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
