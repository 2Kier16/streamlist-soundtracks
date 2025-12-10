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

  async function getSpotifyToken() {
    const res = await fetch("https://accounts.spotify.com/api/token", {
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
    const data = await res.json();
    return data.access_token;
  }

  async function loadAlbums(term = "John Williams") {
    try {
      setLoading(true);
      const token = await getSpotifyToken();

      const query = `${term} soundtrack`;
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=album&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (data.albums && data.albums.items.length > 0) {
        const albums = data.albums.items.map((album) => ({
          id: album.id,
          title: album.name,
          artist: album.artists.map((a) => a.name).join(", "),
          artwork: album.images[0]?.url || "",
          spotifyUrl: album.external_urls.spotify,
        }));
        setAlbums(albums);
        setError(null);
      } else {
        setAlbums([]);
        setError("No albums found.");
      }
    } catch (e) {
      console.error("Error loading albums:", e);
      setError("Failed to load albums.");
    } finally {
      setLoading(false);
    }
  }

  async function loadTracks(albumId, albumName, artistName) {
    try {
      const token = await getSpotifyToken();
      const res = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}/tracks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      const list = data.items || [];
      setSelected({ artist: artistName, album: albumName });
      setTracks(list);
    } catch (e) {
      console.error("Error loading tracks:", e);
      setTracks([]);
    }
  }

  // Advanced search handler
  function handleAdvancedSearch() {
    if (advArtist.trim()) {
      loadAlbums(advArtist);
    } else if (advAlbum.trim()) {
      loadAlbums(advAlbum);
    } else if (advYear.trim()) {
      loadAlbums(advYear);
    } else if (advComposer.trim()) {
      loadAlbums(advComposer);
    } else if (advProducer.trim()) {
      loadAlbums(advProducer);
    } else {
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
                key={album.id}
                album={album}
                onSelect={() =>
                  loadTracks(album.id, album.title, album.artist)
                }
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
                <li key={t.id || i}>{t.name}</li>
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

