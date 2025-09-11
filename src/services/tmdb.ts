const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY; // Read from .env
import type { PopularMoviesResponse } from "../types/tmdb";

//! Fetch popular movies -----------------
export const fetchPopularMovies = async (
  page = 1
): Promise<PopularMoviesResponse> => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  const data: PopularMoviesResponse = await res.json();
  return data;
};

//! Fetch popular TV shows -----------------
export const fetchPopularTvShows = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch popular TV shows");
  return res.json();
};

//! Fetch movie details -----------------
export const fetchMovieDetails = async (movieId: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
};

//! Fetch TV show details -----------------
export const fetchTvShowDetails = async (tvId: string) => {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch TV show details");
  return res.json();
};

//! Rate movie -----------------
export const rateMovie = async (
  movieId: string,
  value: number,
  guestSessionId: string
) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value }),
    }
  );
  if (!res.ok) throw new Error("Failed to rate movie");
  return res.json();
};

//! Rate TV show -----------------
export const rateTvShow = async (
  tvId: string,
  value: number,
  guestSessionId: string
) => {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value }),
    }
  );
  if (!res.ok) throw new Error("Failed to rate TV show");
  return res.json();
};

//! Fetch rated movies -----------------
export const fetchRatedMovies = async (guestSessionId: string, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=created_at.asc`
  );
  if (!res.ok) throw new Error("Failed to fetch rated movies");
  return res.json();
};

//! Fetch rated TV shows -----------------
export const fetchRatedTvShows = async (guestSessionId: string, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/tv?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=created_at.asc`
  );
  if (!res.ok) throw new Error("Failed to fetch rated TV shows");
  return res.json();
};
