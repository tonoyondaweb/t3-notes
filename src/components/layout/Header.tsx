import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Menu from "../menu/Menu";
import MenuItem from "../menu/MenuItem";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();

  async function logOut() {
    await signOut();
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-600 py-4 px-3 text-sm text-amber-600">
      <span className="text-[1.25em]">T3 Notes</span>
      <button
        className="flex items-center gap-x-2"
        onClick={() => setShowMenu((prevShow) => !prevShow)}
      >
        <span>{session?.user.name}</span>
        <Image
          src={session?.user.image as string}
          height={22}
          width={22}
          alt="Profile picture of the user"
          className="rounded-full"
        />
      </button>
      <Menu {...{ showMenu, setShowMenu }}>
        <MenuItem type="link" title="Account" href="" />
        <MenuItem type="button" title="Sign Out" fn={logOut} />
      </Menu>
    </header>
  );
};

export default Header;
