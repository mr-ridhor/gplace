// "use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BiTrash } from "react-icons/bi";
import { TiArrowRight } from "react-icons/ti";
// import { fetchNotes, createNote, deleteNote } from "@/lib/actions/noteActions"; // Import your API functions
import { TabsContent } from "@/components/ui/tabs";
import { Investor } from "@/lib/data/mocked";
import { createNote } from "@/lib/actions/noteAction";
// import { createNote } from "@/lib/actions/notesAction";

interface Props {
  selectedItem?: Investor;
}

const Notes: React.FC<Props> = ({ selectedItem }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // useEffect(() => {
  //   const loadNotes = async () => {
  //     try {
  //       const fetchedNotes = await fetchNotes();
  //       setNotes(fetchedNotes);
  //     } catch (error) {
  //       console.error("Failed to fetch notes:", error);
  //     }
  //   };

  //   loadNotes();
  // }, []);

  const handleSaveNote = async () => {
    if (title.trim() === "" || body.trim() === "") {
      alert("Title and body are required.");
      return;
    }

    try {
      const newNote = await createNote({ title, body });
      console.log("Note created successfully:", newNote); // Log the response
      setNotes([newNote.note, ...notes]);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  // const handleDeleteNote = async (id: string) => {
  //   try {
  //     await deleteNote(id);
  //     setNotes(notes.filter((note) => note._id !== id));
  //   } catch (error) {
  //     console.error("Failed to delete note:", error);
  //   }
  // };

  return (
    <TabsContent value="notes" className="w-full mt-4">
      <div className="space-y-3">
        <div className="border border-black space-y-3 h-[180px] rounded-md w-full p-2">
          <div className="border-b h-10">
            <Input
              className="border-0 focus-visible:ring-0 w-[90%] h-8 appearance-none focus-visible:ring-offset-0"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="h-[45%]">
            <Textarea
              className="border-0 h-full resize-none focus-visible:ring-0 w-full appearance-none focus-visible:ring-offset-0"
              placeholder="Enter to type your note body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <div className="flex justify-end w-full">
              <Button
                className="bg-[#DCF8FC] hover:bg-[#DCF8FC]/70 flex gap-x-1 h-8 items-center"
                onClick={handleSaveNote}
              >
                <p>Save</p>
                <TiArrowRight />
              </Button>
            </div>
          </div>
        </div>
        <div className="text-[10px] lg:text-sm space-y-4">
          <p>All your notes</p>
          <div className="border w-full rounded-md p-3 text-[10px] lg:text-sm">
            {notes.length === 0 ? (
              <p>No notes available.</p>
            ) : (
              notes.map((note) => (
                <div key={note._id} className="space-y-3 border-b py-2">
                  <div className="flex gap-x-2 h-fit items-center">
                    <div className="rounded-full h-6 w-6 bg-gray-300"></div>
                    <p>{note.title}</p>
                  </div>
                  <p>{note.body}</p>
                  <div className="flex w-full justify-end">
                    <Button
                      className="bg-transparent hover:bg-transparent text-red-700 flex gap-x-1 h-8 items-center"
                      // onClick={() => handleDeleteNote(note._id)}
                    >
                      <p>Delete</p>
                      <BiTrash />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default Notes;
