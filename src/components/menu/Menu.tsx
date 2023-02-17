import type { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  showMenu: boolean;
  children: ReactNode;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
};

const Menu = ({ showMenu, children }: Props) => {
  return (
    <div
      className={`top-12 right-3 w-[150px] rounded-[3px] border border-gray-600 bg-gray-800 p-1 ${
        showMenu ? "absolute" : "hidden"
      }`}
    >
      <ul>{children}</ul>
    </div>
  );
};

export default Menu;
