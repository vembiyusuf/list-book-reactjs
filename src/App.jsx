import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';
import getInitialData from './utils/data';
import PropTypes from 'prop-types';

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mengambil data awal dari getInitialData saat komponen pertama kali dimuat
  useEffect(() => {
    const initialData = getInitialData();
    setNotes(initialData);
  }, []);

  const addNote = (note) => {
    const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1; 
    const newNote = { ...note, id: newId }; 
    setNotes(prevNotes => [...prevNotes, newNote].sort((a, b) => a.id - b.id)); // Mengurutkan berdasarkan ID
  };

  const deleteNote = (index) => {
    setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
  };

  const archiveNote = (index) => {
    const noteToArchive = notes[index];
    setArchivedNotes(prevArchived => [...prevArchived, noteToArchive].sort((a, b) => a.id - b.id)); // Mengurutkan saat diarsipkan
    setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
  };

  const unarchiveNote = (index) => {
    const noteToUnarchive = archivedNotes[index];
    setNotes(prevNotes => [...prevNotes, noteToUnarchive].sort((a, b) => a.id - b.id)); // Mengurutkan saat dikembalikan
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

      {/* Search Bar */}
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
