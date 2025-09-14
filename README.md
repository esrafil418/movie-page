# Movie & TV Show App 🎬📺

A modern **React 19 + TypeScript** application using **TailwindCSS**, **DaisyUI**, and **TMDB API** to browse, view details, and rate movies and TV shows. Built for learning, practice, and portfolio.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Technologies & Libraries](#technologies--libraries)
- [License](#license)

---

## Technologies & Libraries

- React 19 + TypeScript
- TailwindCSS & DaisyUI – for styling
- React Router DOM – page navigation
- React Query – async data fetching
- Axios – HTTP client
- Framer Motion – animations
- React Hook Form + Zod – forms & validation
- React Toastify / react-hot-toast – notifications
- Swiper & react-infinite-scroll-component – carousels & infinite scroll
- Zustand – global state management
- React Icons / React Lottie – icons & animations

---

## Features

- Browse popular movies and TV shows.
- View details of each movie/TV show.
- Rate movies and TV shows (requires guest session).
- View rated movies and TV shows.
- Responsive UI with **TailwindCSS** and **DaisyUI**.
- Smooth animations using **Framer Motion**.
- Infinite scroll for lists.
- Forms with validation using **React Hook Form + Zod**.

---

## Installation
```bash

### 1. Create Vite React + TypeScript project


npm create vite@latest


2. Install TailwindCSS & DaisyUI

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install daisyui


3. Install React Router & React Query

npm install react-router-dom @tanstack/react-query axios


4. Install Utility Libraries

npm install react-toastify classnames dayjs


5. Install ESLint & Prettier

npm install -D eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser


6. Install Animation, Icons & Forms Libraries

npm install framer-motion react-icons react-lottie react-hook-form zod react-hot-toast swiper react-infinite-scroll-component zustand


Environment Variables

Create a .env file at the root of the project:
VITE_API_KEY=your_tmdb_api_key_here
VITE_TMDB_TOKEN=your_tmdb_access_token_here

VITE_API_KEY: Your TMDB API Key.
VITE_TMDB_TOKEN: Your TMDB Read Access Token.
Note: Always keep .env files secret.


Available Scripts

# Install dependencies
npm install
# Start development server
npm run dev
# Build production version
npm run build
# Preview production build
npm run preview

```

## License

This project is open-sourced and free to use for learning purposes.
