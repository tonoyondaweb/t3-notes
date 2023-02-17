import type { GetServerSideProps } from "next";
import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { signIn } from "next-auth/react";
import { getProviders } from "next-auth/react";
import Head from "next/head";
import { FcGoogle } from "react-icons/fc";
import { CgNotes } from "react-icons/cg";

const Login = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}) => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="grid h-screen place-items-center">
        <div className="grid place-items-center gap-y-8 rounded-[10px] border-[3px] border-amber-900 p-[15px]">
          <div className="grid place-items-center gap-y-3 text-amber-700">
            <CgNotes className="text-5xl text-amber-800" />
            <h1 className="text-xl font-semibold">T3 Keep</h1>
            <p>Login with an account to start adding to your page.</p>
          </div>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              className="flex items-center justify-center gap-x-2 rounded-[4px] border-[2px] border-blue-900 px-3 py-1 text-xl transition-colors hover:bg-blue-700/50"
              aria-label="Sign in with Google"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              <FcGoogle />
              <span>Sign in with Google</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
