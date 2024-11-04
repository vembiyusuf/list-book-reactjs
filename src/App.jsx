import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';
import PropTypes from 'prop-types';

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const storedArchivedNotes = JSON.parse(localStorage.getItem('archivedNotes')) || [];
    setNotes(storedNotes);
    setArchivedNotes(storedArchivedNotes);
  }, []);

  // Save notes and archivedNotes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));
  }, [notes, archivedNotes]);

  const addNote = (note) => {
    const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1; 
    const newNote = { ...note, id: newId }; 
    setNotes(prevNotes => [...prevNotes, newNote].sort((a, b) => a.id - b.id));
  };

  const deleteNote = (index) => {
    setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
  };

  const archiveNote = (index) => {
    const noteToArchive = notes[index];
    setArchivedNotes(prevArchived => [...prevArchived, noteToArchive].sort((a, b) => a.id - b.id));
    setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
  };

  const unarchiveNote = (index) => {
    const noteToUnarchive = archivedNotes[index];
    setNotes(prevNotes => [...prevNotes, noteToUnarchive].sort((a, b) => a.id - b.id));
    setArchivedNotes(prevArchived => prevArchived.filter((_, i) => i !== index));
  };

  const deleteArchivedNote = (index) => {
    setArchivedNotes(prevArchived => prevArchived.filter((_, i) => i !== index));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArchivedNotes = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Catatan</h1>
      <NoteForm addNote={addNote} />

      <input
        type="text"
        placeholder="Cari catatan..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      <h2>Catatan Aktif</h2>
      <div className="active-notes">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              onDelete={() => deleteNote(index)}
              onArchive={() => archiveNote(index)}
              isArchived={false}
            />
          ))
        ) : (
          <p>Tidak ada catatan</p>
        )}
      </div>

      <h2>Arsip</h2>
      <div className="archived-notes">
        {filteredArchivedNotes.length > 0 ? (
          filteredArchivedNotes.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              onDelete={() => deleteArchivedNote(index)}
              onArchive={() => unarchiveNote(index)}
              isArchived={true}
            />
          ))
        ) : (
          <p>Tidak ada catatan di arsip</p>
        )}
      </div>
    </div>
  );
}

export default App;
