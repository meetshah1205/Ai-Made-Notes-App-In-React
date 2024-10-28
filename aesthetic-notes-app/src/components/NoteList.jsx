// src/components/NoteList.jsx
import React, { useState } from 'react';
import Note from './Note';

export default function NoteList() {
    const [notes, setNotes] = useState([
        { id: 1, title: 'First Note', content: 'This is the content of the first note.' },
        { id: 2, title: 'Second Note', content: 'This is the content of the second note.' }
    ]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addNote = (e) => {
        e.preventDefault();
        if (title && content) {
            setNotes([...notes, { id: Date.now(), title, content }]);
            setTitle('');
            setContent('');
        }
    };

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    return (
        <div className="note-list">
            <form onSubmit={addNote} className="note-form">
                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Note Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Add Note</button>
            </form>

            {notes.map((note) => (
                <Note
                    key={note.id}
                    title={note.title}
                    content={note.content}
                    onDelete={() => deleteNote(note.id)}
                />
            ))}
        </div>
    );
}
