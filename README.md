🎬🎵 StreamList: Movie Soundtrack Edition

StreamList is a React-based web app that lets users catalog their favorite movie soundtracks and composers.
Designed with a modern lavender-and-purple theme, intuitive navigation, and expressive iconography, StreamList is built for music lovers, film buffs, and anyone who wants to track the scores that move them.

---

## Features
- Styled input form for adding movie titles and soundtrack notes
- Edit, delete, and mark soundtracks as completed/favorites
- Friendly icons for emotional clarity and accessibility
- Responsive navigation bar with routing via React Router
- Modular component structure for easy expansion
- Input fields reset after submission for smooth UX
- Custom color palette inspired by 2025 design trends
- **Movie Soundtracks page** with general search bar (🔍) and advanced search panel (🤓)
- Album cards showing cover art, artist name, and release year with improved CSS contrast/shadow styling
- **View Tracks button** wired to Last.fm API (UI in place, logic in progress)
- Graceful error handling when searches return no results

---

## Technologies Used
- React (Hooks + Functional Components)
- React Router DOM
- React Icons
- CSS Flexbox + Scoped Styling (`MovieSoundTracks.css`, `Home.css`)
- JSX
- Git & GitHub
- External APIs:
  - [TheAudioDB](https://www.theaudiodb.com/) for album/soundtrack data
  - [Last.fm](https://www.last.fm/api) for track listings

---

## Ethical Design Note
While authentication is not yet implemented, future versions will include secure password handling using hashing and salting techniques.
These practices reflect Stage 1 and Stage 2 of password protection and align with ethical standards for user privacy and data security.

---

## Current Limitations
- Search results depend on what’s available in the **free API catalog**. Some titles may not appear, while many composers and albums are fully indexed.
- Advanced search panel is styled and functional in the UI, but search logic is not yet wired.
- View Tracks button is present, but track display logic is still being finalized.

---

## Installation
Clone the repo and run it locally:


git clone https://github.com/2Kier16/streamlist-soundtracks.git
cd streamlist-soundtracks
npm install
npm start
