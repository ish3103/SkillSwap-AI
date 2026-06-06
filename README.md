# SkillSwap

SkillSwap is a student skill exchange platform with a frontend and an Express/MongoDB backend. It supports user signup/login, browsing skill exchange offers, managing personal skill lists, viewing exchange requests, and a chatbot powered by the OpenAI API.

## Project Structure

- `backend/`
  - `server.js` - Express server setup and route registration.
  - `config/db.js` - MongoDB connection module.
  - `models/User.js` - Mongoose user schema.
  - `routes/userRoutes.js` - Signup and login endpoints.
  - `routes/aiRoutes.js` - Chatbot endpoint using OpenAI with offline fallback.
  - `package.json` - Backend dependencies.

- `frontend/`
  - `index.html` - Landing page with signup/login links, browse link, and chatbot.
  - `signup.html` - User registration page.
  - `login.html` - User login page.
  - `dashboard.html` - Personal dashboard for offered/wanted skills.
  - `browse.html` - Browse and search skill cards.
  - `requests.html` - View and accept/reject skill exchange requests.
  - `script.js` - Frontend logic for authentication, skill lists, requests, and chatbot.
  - `style.css` - Shared UI styling.

## Features

- User registration and login with password hashing.
- MongoDB-backed user storage.
- Skill offer/want list management on the dashboard.
- Skill browsing and search functionality.
- Basic request handling for skill exchanges.
- AI assistant chatbot via OpenAI `gpt-4.1-mini` with offline response fallback.

## Prerequisites

- Node.js 18+ installed.
- MongoDB Atlas or MongoDB connection available.
- OpenAI API key for chatbot support.

## Setup

1. Open a terminal and go to the backend folder:

```powershell
cd d:\SkillSwap\backend
```

2. Install backend dependencies:

```powershell
npm install
```

3. Create a `.env` file in `backend/` with your OpenAI API key:

```text
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the backend server:

```powershell
node server.js
```

   Or, if you have nodemon installed globally:

```powershell
npx nodemon server.js
```

5. Open the frontend pages by opening `frontend/index.html` in your browser.

## API Endpoints

- `POST /api/users/signup` - Register a new user.
- `POST /api/users/login` - Authenticate an existing user.
- `POST /api/ai/chat` - Send a chat message to the AI assistant.

## Notes

- The dashboard stores user email in `localStorage` for a simple session state.
- The skill browse and requests pages currently use static sample data in `frontend/script.js`.
- `backend/config/db.js` contains a MongoDB Atlas connection string; update it if you need a different database.

## Improvements

- Add a real session/auth token system.
- Persist dashboard skills and requests in MongoDB.
- Add form validation and secure password handling on the frontend.
- Serve frontend files from Express so the app can run from a single origin.
