import React from 'react';
import PropTypes from 'prop-types';

function NoteItem({ note, onDelete, onArchive, isArchived }) {
  return (
    <div className="note-item">
      <h3>
        {note.id}. {note.title} {}
      </h3>
      <p>{note.body}</p>
      <small>{new Date(note.createdAt).toLocaleString()}</small>
      <div className="note-actions">
        <button onClick={onDelete}>Hapus</button>
        <button onClick={onArchive}>
          {isArchived ? 'Unarchive' : 'Arsipkan'}
        </button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  isArchived: PropTypes.bool.isRequired,
};

export default NoteItem;
