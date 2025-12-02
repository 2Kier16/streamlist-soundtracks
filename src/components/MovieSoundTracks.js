import { useEffect, useState } from "react";
import "../css/MovieSoundTracks.css";
import AlbumCard from "./AlbumCard";

function MovieSoundTracks() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Advanced search inputs
  const [advArtist, setAdvArtist] = useState("");
  const [advAlbum, setAdvAlbum] = useState("");
  const [advYear, setAdvYear] = useState("");
  const [advComposer, setAdvComposer] = useState("");
  const [advProducer, setAdvProducer] = useState("");

  useEffect(() => {
    // Default load on first render
    loadAlbums("John Williams"); // composer of Imperial March
  }, []);

  async function loadAlbums(term = "John Williams") {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/v1/json/${process.env.REACT_APP_AUDIO_DB_KEY}/searchalbum.php?s=${encodeURIComponent(
          term
        )}`
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
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${
          process.env.REACT_APP_LASTFM_KEY
        }&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(
          album
        )}&format=json`
      );
      const data = await res.json();
      const list = data?.album?.tracks?.track || [];
      setSelected({ artist, album });
      setTracks(Array.isArray(list) ? list : [list].filter(Boolean));
    } catch {
      setTracks([]);
    }
  }

  // Advanced search handler
  function handleAdvancedSearch() {
    // For now, prioritize artist > album > year
    if (advArtist.trim()) {
      loadAlbums(advArtist);
    } else if (advAlbum.trim()) {
      loadAlbums(advAlbum);
    } else if (advYear.trim()) {
      loadAlbums(advYear);
    } else {
      // fallback
      loadAlbums("John Williams");
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="soundtracks-container">
      <div className={`soundtracks ${showAdvanced ? "expanded" : ""}`}>
        <h2 className="page-title">Movie Soundtracks</h2>

        {/* Icon bar */}
        <div className="icon-bar">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="icon-button"
          >
            🔍 <span>Search</span>
          </button>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="icon-button"
          >
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
          {albums && albums.length > 0 ? (
            albums.map((album) => (
              <AlbumCard
                key={album.idAlbum || album.id || album.strAlbum}
                album={album}
              />
            ))
          ) : (
            <p>No albums found.</p>
          )}
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
          <h3 className="panel-title">Advanced Search</h3>
          <div className="advanced-inputs">
            <input
              type="text"
              placeholder="Artist name"
              value={advArtist}
              onChange={(e) => setAdvArtist(e.target.value)}
            />
            <input
              type="text"
              placeholder="Album title"
              value={advAlbum}
              onChange={(e) => setAdvAlbum(e.target.value)}
            />
            <input
              type="text"
              placeholder="Year released"
              value={advYear}
              onChange={(e) => setAdvYear(e.target.value)}
            />
            <input
              type="text"
              placeholder="Composer"
              value={advComposer}
              onChange={(e) => setAdvComposer(e.target.value)}
            />
            <input
              type="text"
              placeholder="Producer"
              value={advProducer}
              onChange={(e) => setAdvProducer(e.target.value)}
            />
          </div>
          <button className="run-search" onClick={handleAdvancedSearch}>
            🏃‍♂️ <span>Run Search</span>
          </button>
          <button
            onClick={() => setShowAdvanced(false)}
            className="close-adv"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieSoundTracks;
