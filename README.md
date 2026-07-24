# Pokémon Battle Game – Backend

Backend-API für ein Pokémon-Kampfspiel, gebaut im Rahmen eines Bootcamp-Gruppenprojekts.

🔗 Live-Demo: https://pokemon-frontend-2tdf.onrender.com

🔗 Frontend-Repo: https://github.com/Pe-De-E/pokemon-frontend

## Tech Stack
Node.js · Express · TypeScript · MongoDB · Mongoose · Zod · JWT (httpOnly-Cookies) · Deployment: Render

## Features
- Registrierung/Login mit gehashten Passwörtern (bcrypt), JWT-Auth über httpOnly-Cookies
- Middleware-basierter Routenschutz
- Leaderboard 
- Roster-Verwaltung
- Zentrales Error-Handling, Input-Validierung mit Zod

## Endpoints

| Methode | Route | Beschreibung |
|---|---|---|
| POST | /auth/register | Registrierung |
| POST | /auth/login | Login (setzt JWT-Cookie) |
| GET | /auth/me | Aktueller User (geschützt) |
| POST | /auth/logout | Logout |
| GET | /leaderboard | Top-Scores |
| POST | /leaderboard | Score anlegen (geschützt) |
| GET | /roster | Eigenes Roster (geschützt) |
| POST | /roster | Pokémon hinzufügen (geschützt) |
| DELETE | /roster/:pokemonId | Pokémon entfernen (geschützt) |

## Projektkontext

Backend-Teil eines 2-köpfigen Bootcamp-Teams. Umsetzung über
Pull-Request-Workflow mit eigenem Branch pro Feature.
