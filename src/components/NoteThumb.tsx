import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  title: string;
  text: string;
}

const NoteThumb = ({ id, title, text }: Props) => {
  return (
    <Link href={`/notes/${id}`}>
      <div className="grid h-[90px] justify-between gap-y-2 rounded-[6px] border-[3px] border-amber-800/75 p-3 transition-colors hover:bg-gray-800">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {text}
        </p>
      </div>
    </Link>
  );
};

export default NoteThumb;
