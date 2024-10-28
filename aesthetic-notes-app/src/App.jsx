// src/App.js

import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notes, setNotes] = useState([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');
    const [noteColor, setNoteColor] = useState('#ffffff'); // Default color

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleTitleChange = (e) => {
        setNoteTitle(e.target.value);
    };

    const handleNoteChange = (e) => {
        setNoteText(e.target.value);
    };

    const handleColorChange = (e) => {
        setNoteColor(e.target.value);
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        if (noteTitle.trim() && noteText.trim()) {
            setNotes([...notes, { title: noteTitle, text: noteText, color: noteColor }]);
            setNoteTitle('');
            setNoteText('');
            setNoteColor('#ffffff'); // Reset to default color after adding note
        }
    };

    const handleDeleteNote = (index) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return; // If dropped outside

        const reorderedNotes = Array.from(notes);
        const [removed] = reorderedNotes.splice(result.source.index, 1);
        reorderedNotes.splice(result.destination.index, 0, removed);
        setNotes(reorderedNotes);
    };
  
    return (
        <div className={`app ${isDarkMode ? 'dark' : ''}`}>
            <h1>Creanote</h1>
            <button className="theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? '🌞 Light Mode' : '🌜 Dark Mode'}
            </button>
            <form className="note-form" onSubmit={handleAddNote}>
                <input
                    type="text"
                    value={noteTitle}
                    onChange={handleTitleChange}
                    placeholder="Title..."
                    required
                />
                <textarea
                    value={noteText}
                    onChange={handleNoteChange}
                    placeholder="Add your note..."
                    required
                />
                {/* Color Picker */}
                <input
                    type="color"
                    value={noteColor}
                    onChange={handleColorChange}
                />
                <button type="submit">Add Note</button>
            </form>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="notes">
                    {(provided) => (
                        <div
                            className="note-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {notes.map((note, index) => (
                                <Draggable key={index} draggableId={String(index)} index={index}>
                                    {(provided) => (
                                        <div
                                            className="note"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{ backgroundColor: note.color }} // Apply color
                                        >
                                            <h3>{note.title}</h3>
                                            <p>{note.text}</p>
                                            <button onClick={() => handleDeleteNote(index)}>Delete</button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
        
    );
};

export default App;
