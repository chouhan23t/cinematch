# CineMatch
A movie discovery and recommendation interface inspired by the supplied iMovies screenshot, using local movie posters from the uploaded project.

## Stack
- HTML / CSS / browser JavaScript
- Node.js + Express API
- Local JSON movie catalog
- LocalStorage watchlist

## Run locally
1. Install Node.js (18+ recommended).
2. Open this folder in terminal.
3. Run `npm install`.
4. Run `npm start`.
5. Open http://localhost:3000.

## Features
- Search by title, genre, language, or descriptive text
- Genre chips
- Mood-based recommendations via the Express endpoint (`POST /api/recommend`)
- Movie detail modal
- Save/remove movies in a persistent watchlist
- Responsive desktop/mobile layout

## Note about recommendations
The recommendation engine is a lightweight keyword/genre scoring system running on the backend. It is functional without an external AI API key; connect an LLM provider later for conversational recommendations.
