export const BASE_URL = "https://api.themoviedb.org/3";

// Prefer environment variables; fall back to the provided token/key if missing.
export const TOKEN =
  import.meta.env.VITE_TMDB_TOKEN ??
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzBjNTUxYmMxNzJhNDJhNjQ2Yzk1Y2VkZTYxODIyOCIsIm5iZiI6MTUzNjU5ODIyMS40MjIwMDAyLCJzdWIiOiI1Yjk2YTBjZGMzYTM2ODU2NzkwM2Q4MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vNJkjF6ot7s8UCmLgTYzOE4lCZp7NZ8rj6wGss8G2WQ";

export const API_KEY =
  import.meta.env.VITE_API_KEY ?? "c70c551bc172a42a646c95cede618228";
