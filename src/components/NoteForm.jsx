import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NoteForm({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [charCount, setCharCount] = useState(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      addNote({
        title,
        body,
        archived: false, 
        createdAt: new Date().toISOString(), 
      });
      setTitle('');
      setBody('');
      setCharCount(50);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setCharCount(50 - e.target.value.length);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Buat Catatan</h2>
      <input
        type="text"
        placeholder="Judul catatan"
        value={title}
        onChange={handleTitleChange}
        maxLength="50"
      />
      <span>Sisa karakter: {charCount}</span>
      <textarea
        placeholder="Isi catatan"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Buat</button>
    </form>
  );
}

NoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteForm;
