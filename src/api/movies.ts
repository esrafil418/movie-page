import { BASE_URL, TOKEN } from "./config";
import type { PopularMoviesResponse, MovieDetails } from "../types/tmdb";

// Fetch popular movies
export const fetchPopularMovies = async (page = 1): Promise<PopularMoviesResponse> => {
  const res = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=${page}`, {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return res.json();
};

// Fetch movie details
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
};
