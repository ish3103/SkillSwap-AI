# SkillSwap

SkillSwap is a student skill-exchange platform with a static frontend and an Express + MySQL backend. It supports user signup/login, browsing skill offers, saving skills, handling exchange requests, and chatting with a SkillBot assistant.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express, CORS
- Database: MySQL via mysql2
- AI: OpenAI SDK with an offline fallback response

## Project Structure

- `backend/`
  - `server.js` - Starts the Express server and registers all API routes.
  - `config/db.js` - MySQL connection settings.
  - `routes/userRoutes.js` - Signup and login endpoints.
  - `routes/skillRoutes.js` - Fetch and create skill records.
  - `routes/requestRoutes.js` - Fetch and send exchange requests.
  - `routes/aiRoutes.js` - AI chat endpoint with fallback responses.
  - `package.json` - Backend dependencies and scripts.

- `frontend/`
  - `index.html` - Landing page.
  - `signup.html` - Registration page.
  - `login.html` - Login page.
  - `dashboard.html` - Personal skill dashboard.
  - `browse.html` - Browse available skills.
  - `requests.html` - View and manage requests.
  - `script.js` - Frontend logic for auth, skills, requests, and chatbot.
  - `style.css` - Shared styling for the UI.

## Features

- User registration and secure password hashing with `bcryptjs`.
- MySQL-backed user, skill, and request storage.
- Skill browsing and exchange request handling.
- AI assistant chat powered by OpenAI `gpt-4.1-mini`, with offline fallback when the API key is unavailable.

## Prerequisites

- Node.js 18+
- MySQL Server running locally
- An OpenAI API key for the chatbot feature

## Setup

1. Create a MySQL database named `skillswap`.

2. Update the database credentials in `backend/config/db.js` if your local MySQL setup is different:

   - host
   - user
   - password
   - database

3. Open a terminal in the backend folder:

   ```powershell
   cd d:\SkillSwap\backend
   ```

4. Install dependencies:

   ```powershell
   npm install
   ```

5. Create a `.env` file in `backend/` with your OpenAI key:

   ```text
   OPENAI_API_KEY=your_openai_api_key_here
   ```

6. Start the backend server:

   ```powershell
   node server.js
   ```

   You can also use:

   ```powershell
   npx nodemon server.js
   ```

7. Open the frontend pages in a browser. The static files in `frontend/` can be opened directly, or served with a simple live server.

## API Endpoints

- `POST /api/users/signup` - Register a new user.
- `POST /api/users/login` - Authenticate a user.
- `GET /api/skills` - Fetch all skills.
- `POST /api/skills` - Save a new skill entry.
- `GET /api/requests` - Fetch all requests.
- `POST /api/requests` - Create a new exchange request.
- `POST /api/ai/chat` - Send a chat message to the AI assistant.

## Notes

- The frontend currently calls the backend at `http://localhost:5000`.
- The simple login session uses `localStorage` to remember the logged-in user email.
- If the OpenAI API key is missing or the API call fails, the chatbot returns a built-in offline response.

## Future Improvements

- Add real authentication tokens instead of local session storage.
- Move more frontend data to MySQL-backed APIs.
- Improve form validation and UI feedback.
- Serve the frontend through Express for one unified app origin.
