import React, { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

export default function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note",
      date: "02/06/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note",
      date: "03/06/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note",
      date: "04/06/2021",
    },
    {
      id: nanoid(),
      text: "This is my fourth note",
      date: "05/06/2021",
    },
    {
      id: nanoid(),
      text: "This is my fifth note",
      date: "06/06/2021",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("keep-my-note"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("keep-my-note", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();

    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkmode && "dark-mode"}`}>
      <div className="container">
        <Header handleDarkMode={setDarkmode} />
        <Search handleSearchText={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}
