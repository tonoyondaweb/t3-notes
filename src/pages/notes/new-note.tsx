import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { api } from "../../utils/api";

interface Note {
  title: string;
  text: string;
}

const intialValues = {
  title: "",
  text: "",
};

const NewNote: NextPage = () => {
  const [note, setNote] = useState<Note>(intialValues);
  const util = api.useContext();
  const router = useRouter();

  const addNewNote = api.notes.create.useMutation({
    onMutate: async () => {
      await util.notes.readAll.cancel();
      const optimisticUpdate = util.notes.readAll.getData();

      if (optimisticUpdate)
        util.notes.readAll.setData(undefined, optimisticUpdate);
    },
    onSettled: async () => {
      await util.notes.readAll.invalidate();
    },
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addNewNote.mutate({
      title: note.title,
      text: note.text,
    });
    setNote({
      title: "",
      text: "",
    });
    await router.push("/");
  }

  return (
    <form
      className="flex h-full min-h-[calc(100vh-54px)] flex-col px-4 py-1"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        name="title"
        placeholder="Enter Title"
        className="cursor-pointer border-b-[3px] border-gray-600 bg-transparent py-2 text-3xl font-semibold outline-none placeholder:opacity-30"
        aria-label="Title input field"
        onChange={(e) => handleChange(e)}
        value={note.title}
      />
      <textarea
        name="text"
        placeholder="Enter note text"
        className="flex-1 resize-none bg-transparent py-3 outline-none placeholder:opacity-30"
        aria-label="Note text input field"
        onChange={(e) => handleChange(e)}
        value={note.text}
      />
      <div className="flex items-center justify-between pb-2">
        <Link
          href="/"
          className="flex items-center gap-x-2 rounded-full bg-amber-700 px-3 py-1 text-lg text-gray-200 transition-colors hover:bg-amber-600"
        >
          <AiOutlineLeft /> Go back to notes
        </Link>
        <input
          type="submit"
          value="Save"
          className="flex items-center gap-x-2 rounded-full bg-amber-700 px-3 py-1 text-lg text-gray-200 transition-colors hover:bg-amber-600"
        />
      </div>
    </form>
  );
};

export default NewNote;
