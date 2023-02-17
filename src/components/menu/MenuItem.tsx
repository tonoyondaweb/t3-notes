import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  type: "link" | "button";
  href?: string;
  title: ReactNode;
  fn?: () => Promise<void> | void;
};

const MenuItem = ({ type, href, title, fn }: Props) => {
  return (
    <li className="w-full rounded-[2px] text-center text-lg transition-colors hover:bg-gray-600">
      {type === "link" && <Link href={href as string}>{title}</Link>}
      {type === "button" && <button onClick={fn}>{title}</button>}
    </li>
  );
};

export default MenuItem;
