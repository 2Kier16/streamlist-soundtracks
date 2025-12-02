🎬🎵 StreamList: Movie Soundtrack Edition

StreamList is a React‑based web app that lets users explore, catalog, and manage their favorite movie soundtracks and composers.
Designed with a modern lavender‑and‑purple theme, intuitive navigation, and expressive iconography, StreamList is built for music lovers, film buffs, and anyone who wants to track the scores that move them.

Features
- Cart system for adding albums or individual tracks, adjusting quantities, removing items, and viewing totals
- Persistence with localStorage so cart contents remain after refresh
- General search bar (🔍) for quick queries and an Advanced search panel (🤓) with multiple filters (artist, album, year, composer, producer)
- Album cards showing cover art, artist name, and release year with improved CSS contrast/shadow styling
- Expandable album view with View Tracks button wired to the Last.fm API (track display logic in progress)
- Graceful error handling when searches return no results
- Responsive navigation bar with dynamic cart count and routing via React Router
- Modular component structure for easy expansion
- Custom color palette inspired by 2025 design trends
- Jest + React Testing Library integration with passing test suites for add‑to‑cart and remove‑from‑cart flows

Technologies Used
- React (Hooks + Functional Components)
- React Router DOM
- React Icons
- CSS Flexbox + Scoped Styling (MovieSoundTracks.css, Home.css)
- JSX
- Git & GitHub
- External APIs:
  - TheAudioDB for album/soundtrack data
  - Last.fm for track listings
  - Spotify enrichment for album links and cover art
- Jest + React Testing Library for automated UI testing

Ethical Design Note
Authentication is not yet implemented, but future versions will include secure password handling using hashing and salting techniques.
These practices reflect Stage 1 and Stage 2 of password protection and align with ethical standards for user privacy and data security.

Current Limitations
- Search results depend on what’s available in the free API catalog; some titles may not appear, while many composers and albums are fully indexed
- Advanced search panel is styled and functional in the UI, but search logic is still being finalized
- Track display logic for the View Tracks button is in progress
- Spotify enrichment is mocked in tests but not yet fully wired for live API calls

Project Status
- Week 3 Deliverables: Cart system completed with album/track add, quantity adjustment, removal, and total price calculation. Cart contents persist via localStorage.
- Advanced Search: Panel styled and functional, with multiple filter inputs; search logic integration in progress.
- Navigation Bar: Dynamic cart count updates in real time.
- Issues/Risks: Minor CSS nesting errors corrected; subscription duplication bug resolved.
- Week 4 Deliverables: Jest test suite stabilized with global router mocks; App.test.js simplified; HomeCartFlow.test.js covers add and remove flows with passing results.
- Next Steps: Finalize track display logic, polish styling, and prepare video demo for Week 5 submission.

## Installation
Clone the repo and run it locally:

```bash
git clone https://github.com/2Kier16/streamlist-soundtracks.git
cd streamlist-soundtracks
npm install
npm start
