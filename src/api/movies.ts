import { BASE_URL, TOKEN, API_KEY } from "./config";
import type { PopularMoviesResponse, MovieDetails } from "../types/tmdb";
import type { RatedMoviesResponse } from "../types/movie";

//! Fetch popular movies
export const fetchPopularMovies = async (
  page = 1
): Promise<PopularMoviesResponse> => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
    {
      method: "GET",
      headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return res.json();
};

//! Fetch movie details
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
};

//! Fetch rated movies (برای Rated page)
export const fetchRatedMovies = async (
  guestSessionId: string,
  page = 1
): Promise<RatedMoviesResponse> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=created_at.asc`
  );
  if (!res.ok) throw new Error("Failed to fetch rated movies");

  const data: RatedMoviesResponse = await res.json();
  return data;
};
