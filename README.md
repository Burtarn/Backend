# 🌀 Swing Notes API

Swing Notes API är ett säkert och funktionsrikt RESTful backend-API för att hantera personliga anteckningar. Användare kan registrera sig och logga in med JWT-autentisering, skapa och hantera egna anteckningar, och utföra sökningar. API:et är skyddat med rate limiting och brute-force skydd, och innehåller dokumentation via Swagger.

## 🚀 Funktionalitet

- ✅ **Registrering och inloggning** med JSON Web Tokens (JWT)
- 📝 **Full CRUD** för personliga anteckningar (endast åtkomst till egna)
- 🔎 **Sökfunktion** för att hitta anteckningar via titel.
- 🌱 **Seed script** för att generera testanvändare och anteckningar
- 📚 **Swagger UI** för API-dokumentation
- 🛡️ **Rate limiter** & **brute-force skydd** för att förhindra missbruk

---

## 🧱 Tech Stack

- **Node.js** & **Express** – Backend och routing
- **PostgreSQL** – Relationsdatabas
- **JWT (JSON Web Tokens)** – Autentisering
- **Swagger** – API-dokumentation
- **Express-rate-limit** – Rate limiting
- **Express-brute** – Brute-force skydd

---

## 📦 Installation

1. **Klona repo:**

   ```bash
   git clone https://github.com/Burtarn/Backend
   cd backend
   cd server
   npm install
   Skapa .env
   node seed/index.js
   npm run dev

## 🔐 Autentisering
-- **Registrering: POST /auth/signup
-- **Inloggning: POST /auth/login
-- **JWT-token returneras vid inloggning och krävs som Authorization: Bearer <token> för skyddade routes.

## 📘 API-dokumentation
Swagger UI finns på:
http://localhost:5000/api-docs

## 📂 Viktiga endpoints

| Metod  | Endpoint              | Beskrivning                  | Skyddad |
| ------ | --------------------- | ---------------------------- | ------- |
| POST   | `/auth/signup`        | Skapa konto                  | Nej     |
| POST   | `/auth/login`         | Logga in                     | Nej     |
| GET    | `/notes`              | Hämta alla egna anteckningar | Ja      |
| POST   | `/notes`              | Skapa ny anteckning          | Ja      |
| GET    | `/notes/:id`          | Hämta specifik anteckning    | Ja      |
| PUT    | `/notes/:id`          | Uppdatera anteckning         | Ja      |
| DELETE | `/notes/:id`          | Radera anteckning            | Ja      |
| GET    | `/notes/search?q=...` | Sök anteckningar via text    | Ja      |


## 🔐 Säkerhet
-- **✅ Rate limiter begränsar antalet förfrågningar per IP

-- **✅ Brute-force skydd vid inloggningsförsök

-- **✅ Endast autentiserade användare har tillgång till anteckningsroutes

-- **✅ Endast åtkomst till egna anteckningar

##📁 Projektstruktur

swing-notes-api/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── seed/
├── swagger/
├── .env
├── app.js
├── package.json
└── README.md



   
   
