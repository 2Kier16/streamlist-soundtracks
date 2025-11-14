import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaMusic } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [movieTitle, setMovieTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movieTitle.trim()) return;
    setList([...list, { title: movieTitle, notes, completed: false }]);
    setMovieTitle('');
    setNotes('');
  };

  const handleDelete = (index) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const handleComplete = (index) => {
    const updated = [...list];
    updated[index].completed = !updated[index].completed;
    setList(updated);
  };

  const handleEdit = (index) => {
    const updated = [...list];
    setMovieTitle(updated[index].title);
    setNotes(updated[index].notes);
    updated.splice(index, 1);
    setList(updated);
  };

  return (
    <div className="home-container">
      <h2>🎵 StreamList: Movie Soundtrack Edition</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add soundtrack notes (optional)"
        />
        <button type="submit">Add Song/Soundtrack</button>
      </form>

      <ul>
        {list.map((item, index) => (
          <li key={index} className={item.completed ? 'completed' : ''}>
            <strong>{item.title}</strong> — {item.notes}
            <button onClick={() => handleComplete(index)} title="Mark as Favorite">
              <FaCheckCircle />
            </button>
            <button onClick={() => handleEdit(index)} title="Edit Entry">
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(index)} title="Delete Entry">
              <FaTrash />
            </button>
            <FaMusic style={{ marginLeft: '10px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
