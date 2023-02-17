import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineDelete } from "react-icons/ai";
import { api } from "../../utils/api";

interface Note {
  title: string;
  text: string;
}

const Note = () => {
  const util = api.useContext();
  const router = useRouter();
  const id = router.query.id;

  const { data: note, isLoading } = api.notes.readNote.useQuery({
    id: id as string,
  });

  const [noteState, setNoteState] = useState<Note>({
    title: "",
    text: "",
  });

  useEffect(() => {
    setNoteState({
      title: note?.title as string,
      text: note?.text as string,
    });
  }, [isLoading, note?.text, note?.title]);

  const updateNote = api.notes.update.useMutation({
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

  const deleteNote = api.notes.delete.useMutation({
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

    setNoteState((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateNote.mutate({
      title: noteState.title,
      text: noteState.text,
      id: id as string,
    });
    setNoteState({
      title: "",
      text: "",
    });
    await router.push("/");
  }

  async function deleteAction() {
    deleteNote.mutate({
      id: id as string,
    });
    setNoteState({
      title: "",
      text: "",
    });
    await router.push("/");
  }

  if (isLoading)
    return (
      <h1 className="mt-7 text-center text-3xl text-amber-600">Loading ...</h1>
    );

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
        value={noteState.title}
      />
      <textarea
        name="text"
        placeholder="Enter note text"
        className="flex-1 resize-none bg-transparent py-3 outline-none placeholder:opacity-30"
        aria-label="Note text input field"
        onChange={(e) => handleChange(e)}
        value={noteState.text}
      />
      <div className="flex items-center justify-between gap-x-2 pb-2">
        <Link
          href="/"
          className="flex items-center gap-x-2 rounded-full bg-gray-700 px-3 py-1 text-lg text-gray-200 transition-colors hover:bg-amber-600"
        >
          <AiOutlineLeft /> Go back to notes
        </Link>
        <input
          type="submit"
          value="Save"
          className="flex flex-1 cursor-pointer items-center gap-x-2 rounded-full bg-amber-700 px-3 py-1 text-center text-lg text-gray-200 transition-colors hover:bg-amber-600"
        />
        <button
          className="flex items-center gap-x-2 rounded-full bg-red-700 px-3 py-1 text-lg text-gray-200 transition-colors hover:bg-amber-600"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={deleteAction}
        >
          Delete <AiOutlineDelete />
        </button>
      </div>
    </form>
  );
};

export default Note;
