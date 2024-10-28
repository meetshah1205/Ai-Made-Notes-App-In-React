// src/components/ThemeToggle.jsx
import React from 'react';

export default function ThemeToggle({ toggleTheme, theme }) {
    // src/App.js

// Add this in your return statement where you want the toggle button
<button className="theme-toggle" onClick={toggleTheme}>
    {isDarkMode ? '🌞 Light Mode' : '🌜 Dark Mode'}
</button>

}
