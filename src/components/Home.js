import React, { useState } from 'react';
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
      <h2>
        <i className="fas fa-film" style={{ marginRight: '8px' }}></i>
        StreamList: Movie Soundtrack Edition
        <i className="fas fa-music" style={{ marginLeft: '8px' }}></i>
      </h2>

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
            <div className="entry-text">
              <strong>{item.title}</strong>
              <p className="soundtrack-note"><em>Notes:</em> {item.notes}</p>
            </div>
            <div className="entry-actions">
              <button onClick={() => handleComplete(index)} title="Mark as Favorite">
                <i className="fas fa-check-circle"></i>
              </button>
              <button onClick={() => handleEdit(index)} title="Edit Entry">
                <i className="fas fa-edit"></i>
              </button>
              <button onClick={() => handleDelete(index)} title="Delete Entry">
                <i className="fas fa-trash"></i>
              </button>
              <i className="fas fa-music music-icon"></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

