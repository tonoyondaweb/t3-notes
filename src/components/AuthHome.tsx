import Link from "next/link";
import { GrFormEdit } from "react-icons/gr";
import { api } from "../utils/api";
import NoteThumb from "./NoteThumb";

const AuthHome = () => {
  const { data: notes, isLoading } = api.notes?.readAll.useQuery();

  return (
    <>
      {isLoading ? (
        <h1 className="mt-7 text-center text-3xl text-amber-600">
          Loading ...
        </h1>
      ) : (
        <div className="grid gap-3 px-3 py-7">
          {notes?.map((note) => (
            <NoteThumb key={note.id} {...note} />
          ))}
        </div>
      )}
      <Link className="fixed bottom-3 right-2" href="/notes/new-note">
        <div className="grid h-[50px] w-[50px] place-items-center rounded-full bg-amber-600 text-3xl transition-colors hover:bg-amber-500">
          <GrFormEdit />
        </div>
      </Link>
    </>
  );
};

export default AuthHome;
