import React, { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
console.log(newNote)
  const API_URL = 'http://localhost:5039/';

  const refreshNotes = async () => {
    try {
      const response = await fetch(API_URL + 'api/todoapp/GetNotes');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addClick = async () => {
    const data = new FormData();
    data.append('newNote', newNote);
  
    try {
      const response = await fetch(API_URL + 'api/todoapp/AddNotes', {
        method: 'POST',
        body: data
      });
      console.log(data)
  
      if (!response.ok) {
        throw new Error(`Failed to add note: ${response.status} ${response.statusText}`);
      }
  
      alert('Note added successfully');
      setNewNote(''); // Clear the input field
    } catch (error) {
      console.error('Error adding note:', error.message);
      // Add additional error handling as needed
    }
  };

  const deleteClick = async (id) => {
    try {
      const response = await fetch(API_URL + `api/todoapp/DeleteNotes?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.status} ${response.statusText}`);
      }

      alert('Note deleted successfully');
      refreshNotes();
    } catch (error) {
      console.error('Error deleting note:', error.message);
      // Add additional error handling as needed
    }
  };

  useEffect(() => {
    console.log(newNote); // Log the updated value after each render
    refreshNotes();
  }, [newNote]);

  return (
    <div className="App">
      <h2>Notes</h2>
      <input
        type="text"
        id="newNote"
        value={newNote} 
        onChange={(e) => setNewNote(e.target.value)}
      />
      &nbsp;
      <button onClick={addClick}>Add Notes</button>
    
      {notes.map((note) => (
        <p key={note._id}>
          <b>* {note.description}</b>
          <button onClick={() => deleteClick(note.id)}>Delete Notes</button>
        </p>
      ))}
    </div>
  );
}

export default App;
