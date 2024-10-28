// src/App.js

import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notes, setNotes] = useState([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleTitleChange = (e) => {
        setNoteTitle(e.target.value);
    };

    const handleNoteChange = (e) => {
        setNoteText(e.target.value);
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        if (noteTitle.trim() && noteText.trim()) {
            setNotes([...notes, { title: noteTitle, text: noteText }]);
            setNoteTitle('');
            setNoteText('');
        }
    };

    const handleDeleteNote = (index) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };

    return (
        <div className={`app ${isDarkMode ? 'dark' : ''}`}>
            <h1>Aesthetic Notes App</h1>
            <button className="theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? '🌞 Light Mode' : '🌜 Dark Mode'}
            </button>
            <form className="note-form" onSubmit={handleAddNote}>
                <input
                    type="text"
                    value={noteTitle}
                    onChange={handleTitleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={noteText}
                    onChange={handleNoteChange}
                    placeholder="Add your note..."
                    required
                />
                <button type="submit">Add Note</button>
            </form>
            <div className="note-list">
                {notes.map((note, index) => (
                    <div className="note" key={index}>
                        <h3>{note.title}</h3> {/* Note Title */}
                        <p>{note.text}</p> {/* Note Content */}
                        <button onClick={() => handleDeleteNote(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
