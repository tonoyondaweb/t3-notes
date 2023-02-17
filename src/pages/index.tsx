import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import UnAuthHome from "../components/UnAuthHome";
import AuthHome from "../components/AuthHome";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return <>{session ? <AuthHome /> : <UnAuthHome />}</>;
};

export default Home;
