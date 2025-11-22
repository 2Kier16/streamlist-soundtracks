import { useEffect, useState } from "react";
import "./MovieSoundTracks.css";
// import { useCart } from "../cart/CartContext";

function MovieSoundTracks() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  // const { addToCart } = useCart();

  useEffect(() => {
    // Default load on first render
    loadAlbums("John Williams"); // composer of Imperial March
  }, []);

  async function loadAlbums(term = "John Williams") {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/v1/json/${process.env.REACT_APP_AUDIO_DB_KEY}/searchalbum.php?s=${encodeURIComponent(term)}`
      );
      const data = await res.json();
      console.log("Album data:", data);
      setAlbums(data.album || []);
    } catch (e) {
      setError("Failed to load albums.");
    } finally {
      setLoading(false);
    }
  }

  async function loadTracks(artist, album) {
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_LASTFM_KEY}&artist=${encodeURIComponent(
          artist
        )}&album=${encodeURIComponent(album)}&format=json`
      );
      const data = await res.json();
      const list = data?.album?.tracks?.track || [];
      setSelected({ artist, album });
      setTracks(Array.isArray(list) ? list : [list].filter(Boolean));
    } catch {
      setTracks([]);
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
  <div className="soundtracks-container">
    {/* Main content */}
    <div className={`soundtracks ${showAdvanced ? "expanded" : ""}`}>
      <h2>Movie Soundtracks</h2>

      {/* Icon bar */}
      <div className="icon-bar">
        <button onClick={() => setShowSearch(!showSearch)} className="icon-button">
          🔍 <span>Search</span>
        </button>
        <button onClick={() => setShowAdvanced(!showAdvanced)} className="icon-button">
          🤓 <span>Adv.</span>
        </button>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxLength={40}
            placeholder="Search soundtracks..."
          />
          <button onClick={() => loadAlbums(searchTerm)}>Search</button>
        </div>
      )}

      {/* Album list */}
      <ul className="album-list">
        {albums.map((a) => (
          <li key={a.idAlbum}>
            <img src={a.strAlbumThumb} alt={a.strAlbum} />
            <div className="album-details">
              <strong>{a.strAlbum}</strong>
              <span>{a.strArtist}</span>
              <span>{a.intYearReleased}</span>
            </div>
            <button onClick={() => loadTracks(a.strArtist, a.strAlbum)}>View tracks</button>
          </li>
        ))}
      </ul>

      {/* Track list */}
      {selected && (
        <div className="tracks">
          <h3>
            Tracks — {selected.album} by {selected.artist}
          </h3>
          <ul>
            {tracks.map((t, i) => (
              <li key={t.name + i}>{t.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Advanced search panel */}
    {showAdvanced && (
      <div className="advanced-search">
        <h3>Advanced Search</h3>
        <div className="advanced-inputs">
          <input type="text" placeholder="Artist name" />
          <input type="text" placeholder="Album title" />
          <input type="text" placeholder="Year released" />
          <input type="text" placeholder="Composer" />
          <input type="text" placeholder="Producer" />
        </div>
        <button className="run-search">
          🏃‍♂️ <span>Run Search</span>
        </button>
        <button onClick={() => setShowAdvanced(false)} className="close-adv">
          Close
        </button>
      </div>
    )}
  </div>
);

}

export default MovieSoundTracks;
