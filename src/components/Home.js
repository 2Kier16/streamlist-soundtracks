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
    const apiKey = process.env.REACT_APP_AUDIO_DB_KEY;
    const res = await fetch(
      `https://www.theaudiodb.com/api/v1/json/${apiKey}/searchalbum.php?s=${encodeURIComponent(movieTitle)}`

    );
    const data = await res.json();
    if (data.album) {
      setResults(data.album);
    } else {
        setResults([]);
        setError(`No soundtracks found for "${movieTitle}".`);   // ✅ error message
      }
    } catch (err) {
      console.error('Error fetching AudioDB:', err);
      setError('Something went wrong while fetching soundtracks.');
    }
  };


const handleAddToCart = async (album) => {
  try {
    // Get Spotify token
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

    // Search Spotify for album
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        album.strAlbum
      )}&type=album&limit=1`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const searchData = await searchRes.json();

    let enriched = {
      id: album.idAlbum,
      title: album.strAlbum,
      artist: album.strArtist,
      artwork: album.strAlbumThumb,
      price: 0.99,
    };

    if (searchData.albums.items.length > 0) {
      const spotifyAlbum = searchData.albums.items[0];
      enriched.artwork = spotifyAlbum.images[0]?.url || enriched.artwork;
      enriched.spotifyUrl = spotifyAlbum.external_urls.spotify;
    }

    addToCart(enriched);
  } catch (err) {
    console.error("Error enriching with Spotify:", err);
    // fallback to AudioDB data
    addToCart({
      id: album.idAlbum,
      title: album.strAlbum,
      artist: album.strArtist,
      artwork: album.strAlbumThumb,
      price: 0.99,
    });
  }
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

      <form onSubmit={(e) => {
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
          placeholder='Add soundtrack notes (optional)'
          />
        <button type="submit">Add Manual Entry</button>
      </form>

  
        <button type="button" onClick={searchSoundtracks} className="search-btn">
          Search Soundtracks
        </button>

        {/* Error handling */}
        {error && <p className="error-message">{error}</p>}

        {/* Results rendering */}
        {results.length > 0 && (
          <div className="results">
            <h3>Search Results</h3>
            <ul>
              {results.map((album) => (
                <li key={album.idAlbum}>
                  <img src={album.strAlbumThumb} alt={album.strAlbum} width="100" />
                  <div>
                    <strong>{album.strAlbum}</strong> by {album.strArtist}
                  </div>
                  <button onClick={() => handleAddToCart(album)}>Add to Cart</button>
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

