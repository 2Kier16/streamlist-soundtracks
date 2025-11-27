import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const AlbumCard = ({ album }) => {
  const { addToCart } = useContext(CartContext);
  const [showTracks, setShowTracks] = useState(false);
  const [tracks, setTracks] = useState([]);

  const id = album.id || album.idAlbum || `${album.strArtist}-${album.strAlbum}`;
  const title = album.title || album.strAlbum || "Unknown Album";
  const artist = album.artist || album.strArtist || "Unknown Artist";
  const cover =
    album.cover ||
    album.strAlbumThumb ||
    album.thumbnail ||
    "https://via.placeholder.com/150x150?text=No+Cover";

const loadTracks = async () => {
    try {
        const res = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_LASTFM_KEY}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(title)}&format=json`
        );
        const data = await res.json();
        const list = data?.album?.tracks?.track || [];
        setTracks(Array.isArray(list) ? list : [list].filter(Boolean));
    } catch {
        setTracks([]);
    }
};    
const handleViewTracks = () => {
    if (!showTracks) loadTracks();
    setShowTracks(!showTracks);
};

const handleAddTrack =  (trackName) => {
    const trackId = `${id}-${trackName}`;
    addToCart({ id: trackId, title: trackName, artist, album: title });
};




  const handleAdd = () => {
    console.log("Adding to cart:", { id, title, artist, cover });
    addToCart({ id, title, artist, cover });
  };

  return (
 <div className={`album-card ${showTracks ? "expanded" : ""}`}>
  <img
    className="album-cover"
    src={cover}
    alt={`${title} cover`}
    loading="lazy"
  />
  <div className="album-meta">
    <h3 className="album-title">{title}</h3>
    <p className="album-artist">{artist}</p>
    <div className="album-actions">
      <button className="btn-primary" onClick={handleAdd}>
        Add Album to Cart
      </button>
      <button className="btn-secondary" onClick={handleViewTracks}>
        {showTracks ? "Hide Tracks" : "View Tracks"}
      </button>
    </div>
  </div>

  {showTracks && (
    <div className="track-grid">
      {tracks.length > 0 ? (
        tracks.map((track, i) => (
          <div key={track.name + i} className="track-tile">
            <span>{track.name}</span>
            <button
              className="btn-primary"
              onClick={() => handleAddTrack(track.name)}
            >
              Add Song
            </button>
          </div>
        ))
      ) : (
        <p className="no-tracks">No tracks found.</p>
      )}
    </div>
  )}
</div>

  );
};

export default AlbumCard;
