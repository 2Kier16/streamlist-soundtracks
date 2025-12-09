# StreamList: Movie Soundtrack Edition

StreamList is a React‑based web app that lets users explore, catalog, and manage their favorite movie soundtracks and composers.
Designed with a modern lavender‑and‑purple theme, intuitive navigation, and expressive iconography, StreamList is built for music lovers, film buffs, and anyone who wants to track the scores that move them.

---

## Features
- **Cart system** for adding albums or individual tracks, adjusting quantities, removing items, and viewing totals
- **Persistence with localStorage** so cart contents remain after refresh
- **General search bar (🔍)** for quick queries and an **Advanced search panel (🤓)** with multiple filters (artist, album, year, composer, producer)
- **Album cards** showing cover art, artist name, and release year with improved dark‑theme CSS contrast/shadow styling
- **Expandable album view** with *View Tracks* button wired to Spotify’s album API (track display logic in progress)
- **Spotify enrichment** for album links and cover art, with direct “Preview on Spotify” buttons
- **Graceful error handling** when searches return no results
- **Responsive navigation bar** with dynamic cart count and routing via React Router
- **Google OAuth login/logout** integrated directly in the Navbar for session control
- **Credit card checkout simulation** with validation (card format, expiry, CVV) and localStorage persistence
- **Modular component structure** for easy expansion
- **Custom color palette** inspired by 2025 design trends
- **Jest + React Testing Library integration** with passing test suites for add‑to‑cart and remove‑from‑cart flows

---

## Technologies Used
- React (Hooks + Functional Components)
- React Router DOM
- React Icons
- CSS Flexbox + Scoped Styling (`MovieSoundTracks.css`, `Home.css`, `CreditCard.css`)
- JSX
- Git & GitHub
- External APIs:
  - **Spotify** for album/soundtrack data and track listings
  - TheAudioDB (legacy support, being phased out)
  - Last.fm (legacy track listings, being phased out)
- Jest + React Testing Library for automated UI testing

---

## Ethical Design Note
Authentication now includes Google OAuth for demo purposes.  
Future versions will expand to secure password handling using hashing and salting techniques.  
These practices reflect Stage 1 and Stage 2 of password protection and align with ethical standards for user privacy and data security.

---

## Current Limitations
- Search results depend on what’s available in the free Spotify catalog; some titles may not appear, while many composers and albums are fully indexed
- Advanced search panel is styled and functional in the UI, but search logic is still being finalized
- Track display logic for the *View Tracks* button is in progress
- Credit card checkout is a **simulation only** — no real payment processing
- Google OAuth login is demo‑level; personalized accounts and secure backend storage are future features

---

## Project Status
- **Week 3 Deliverables:** Cart system completed with album/track add, quantity adjustment, removal, and total price calculation. Cart contents persist via localStorage.
- **Advanced Search:** Panel styled and functional, with multiple filter inputs; search logic integration in progress.
- **Navigation Bar:** Dynamic cart count updates in real time.
- **Issues/Risks:** Minor CSS nesting errors corrected; subscription duplication bug resolved.
- **Week 4 Deliverables:** Jest test suite stabilized with global router mocks; `App.test.js` simplified; `HomeCartFlow.test.js` covers add and remove flows with passing results.
- **Week 5 Deliverables:** Spotify search integrated into Home and MovieSoundTracks pages; styling fixes applied for dark theme readability.
- **Week 6 Deliverables:** Google OAuth login/logout flow implemented; CreditCard checkout simulation added with validation and localStorage persistence.
- **Next Steps:** Finalize track display logic, polish styling, and expand authentication for personalized accounts.

---

## Installation
Clone the repo and run it locally:

```bash
git clone https://github.com/2Kier16/streamlist-soundtracks.git
cd streamlist-soundtracks
npm install
npm start
