import { BASE_URL, TOKEN } from "./config";
import type { PopularTvResponse, TvShowDetails } from "../types/tmdb";

// Fetch popular TV shows
export const fetchPopularTvShows = async (page = 1): Promise<PopularTvResponse> => {
  const res = await fetch(`${BASE_URL}/tv/popular?language=en-US&page=${page}`, {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error("Failed to fetch popular TV shows");
  return res.json();
};

// Fetch TV show details
export const fetchTvShowDetails = async (tvId: string): Promise<TvShowDetails> => {
  const res = await fetch(`${BASE_URL}/tv/${tvId}?language=en-US`, {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error("Failed to fetch TV show details");
  return res.json();
};
