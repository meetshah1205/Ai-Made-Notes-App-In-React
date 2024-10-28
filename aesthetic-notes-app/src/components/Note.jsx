// src/components/Note.jsx
import React from 'react';

export default function Note({ title, content, onDelete }) {
    return (
        <div className="note">
            <h3>{title}</h3>
            <p>{content}</p>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}
