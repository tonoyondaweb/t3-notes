import type { ReactNode } from "react";
import Header from "./Header";
import React from "react";
import { useSession } from "next-auth/react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();
  return (
    <>
      {session && <Header />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
