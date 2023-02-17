import { signIn } from "next-auth/react";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";

const UnAuthHome = () => {
  return (
    <div className="grid h-screen place-items-center gap-y-5 text-2xl text-amber-700">
      <div className="space-y-2">
        <CgNotes className="text-[2em]" />
        <h1 className="font-semibold">Keep</h1>
      </div>
      <button
        className="flex items-center gap-x-2 transition-colors duration-200 hover:text-amber-600"
        aria-label="Navigate to login page"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signIn()}
      >
        Please sign in to view and edit your notes
        <span>
          <BsArrowRight />
        </span>
      </button>
    </div>
  );
};

export default UnAuthHome;
