import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center">
        <img
          className="w-80"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          alt=""
        />
        <p className="font-w italic">
          This is not a real app, it is built for education purposes only
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  signIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//server side render
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
export default SignIn;
