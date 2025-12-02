import React, { useState, useContext } from 'react';
import '../css/Home.css';
import { CartContext } from '../context/CartContext';

function Home() {
  const [movieTitle, setMovieTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [list, setList] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);

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

  const searchSoundtracks = async () => {
    if (!movieTitle.trim()) return;
    try {
      const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
              process.env.REACT_APP_SPOTIFY_CLIENT_ID +
                ":" +
                process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
            ),
        },
        body: "grant_type=client_credentials",
      });
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      const query = `${movieTitle} soundtrack`;
      const searchRes = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=5`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const searchData = await searchRes.json();

      if (searchData.albums.items.length > 0) {
        const albums = searchData.albums.items.map((album) => ({
          id: album.id,
          title: album.name,
          artist: album.artists.map((a) => a.name).join(", "),
          artwork: album.images[0]?.url || "",
          spotifyUrl: album.external_urls.spotify,
          price: 0.99,
        }));
        setResults(albums);
        setError(null);
      } else {
        setResults([]);
        setError(`No soundtracks found for "${movieTitle}".`);
      }
    } catch (err) {
      console.error("Error fetching from Spotify:", err);
      setError("Something went wrong while searching for soundtracks.");
    }
  };

  const handleAddToCart = (album) => {
    addToCart(album);
  };

  return (
    <div className="home-page">
      <h2 className="page-title">
        <i className="fas fa-film" style={{ marginRight: '8px' }}></i>
        StreamList: Movie Soundtrack Edition
        <i className="fas fa-music" style={{ marginLeft: '8px' }}></i>
      </h2>

      <div className="intro-section">
        <p className="intro-text">
          Welcome to <strong>StreamList</strong> — your personal soundtrack tracker. Search for movie soundtracks, add your favorite songs or albums, and build a cart of music you love. You can preview tracks, save notes, and explore soundtracks from multiple sources.
        </p>
      </div>

      <div className="home-container">
        <p className="home-message">Add a Song or Album!</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            searchSoundtracks();
          }}
        >
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
          <button type="submit">Add Manual Entry</button>
        </form>

        <button type="button" onClick={searchSoundtracks} className="search-btn">
          Search Soundtracks
        </button>

        {error && <p className="error-message">{error}</p>}

  {results.length > 0 && (
  <div className="results">
    <h3 className="results-heading">Search Results</h3>
    <ul>
      {results.map((album) => (
        <li key={album.id}>
          <img src={album.artwork} alt={album.title} width="100" />
          <div className="result-info">
            <strong className="album-title">{album.title}</strong> by <span className="album-artist">{album.artist}</span>
            <br />
            <a
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-link"
            >
              Preview on Spotify
            </a>
          </div>
          <button className="add-cart-btn" onClick={() => handleAddToCart(album)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  </div>
)}

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
    </div>
  );
}

export default Home;

