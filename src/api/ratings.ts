import { BASE_URL, TOKEN } from "./config";

// Rate a movie
export const rateMovie = async (
  movieId: string,
  value: number,
  guestSessionId: string
) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ value }),
    }
  );
  if (!res.ok) throw new Error("Failed to rate movie");
  return res.json();
};

// Rate a TV show
export const rateTvShow = async (
  tvId: string,
  value: number,
  guestSessionId: string
) => {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/rating?guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ value }),
    }
  );
  if (!res.ok) throw new Error("Failed to rate TV show");
  return res.json();
};

// Fetch rated movies
export const fetchRatedMovies = async (guestSessionId: string, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
    {
      method: "GET",
      headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch rated movies");
  return res.json();
};

// Fetch rated TV shows
export const fetchRatedTvShows = async (guestSessionId: string, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/tv?language=en-US&page=${page}&sort_by=created_at.asc`,
    {
      method: "GET",
      headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch rated TV shows");
  return res.json();
};
