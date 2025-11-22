/* (TURN THIS INTO A DIFFERENT FEATURE)

import { useEffect, useState } from "react";
// import { useCart } from "../cart/CartContext";

function Soundtracks() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 // const { addToCart } = useCart();

  useEffect(() => {
    async function loadAlbums() {
      try {
        const res = await fetch(
         fetch(`/api/v1/json/${process.env.REACT_APP_AUDIO_DB_KEY}/searchalbum.php?s=Hans%20Zimmer`)
// `https://theaudiodb.com/api/v1/json/${process.env.REACT_APP_AUDIO_DB_KEY}/searchalbum.php?s=Hans%20Zimmer`
        );
        const data = await res.json();
        setAlbums(data.album || []);
      } catch (e) {
        setError("Failed to load albums.");
      } finally {
        setLoading(false);
      }
    }
    loadAlbums();
  }, []);

  async function loadTracks(artist, album) {
    try {
        console.log("AudioDB Key:", process.env.REACT_APP_AUDIO_DB_KEY);
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_LASTFM_KEY}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&format=json`
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
    <div className="soundtracks">
        <h2>Movie Soundtracks</h2>
        <ul className="album-list">
            {albums.map(a => (
                <li key={a.idAlbum}>
                    <img src={a.strAlbumThumb} alt={a.strAlbum} width={80} height={80} />
                    <div>
                        <strong>{a.strAlbum}</strong> — {a.strArtist} ({a.intYearReleased})
                    </div>
                    <button onClick={() => loadTracks(a.strArtist, a.strAlbum)}>
                        View tracks
                    </button>
                </li>
            ))}
        </ul>

        {selected && (
            <div className="tracks">
                <h3>Tracks — {selected.album} by {selected.artist}</h3>
                <ul>
                    {tracks.map((t, i) => (
                        <li key={t.name + i}>
                            {t.name}
                            {/*
                            <button
                                onClick={() => addToCart({
                                    id: `${selected.album}:${t.name}`,
                                    name: t.name,
                                    artist: selected.artist,
                                    album: selected.album,
                                    type: "subscription",
                                    price: 9.99,
                                    quantity: 1
                                })}
                            >
                                Add to cart
                            </button>
                            */}
                            /*
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);
}

export default Soundtracks;
*/