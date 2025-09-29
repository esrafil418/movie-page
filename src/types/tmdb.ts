//? Movie summary (used in popular movies & rated lists)
export interface MovieSummary {
  id: number;
  title?: string;
  name?: string; // for TV shows
  poster_path?: string | null;
  overview?: string;
  vote_average?: number;
  release_date?: string;
}

//! Popular movies response
export interface PopularMoviesResponse {
  page: number;
  results: MovieSummary[];
  total_pages: number;
  total_results: number;
}

//! TV show summary
export interface TvShowSummary {
  id: number;
  name: string;
  poster_path?: string | null;
  overview?: string;
  vote_average?: number;
  first_air_date?: string;
}

//! Popular TV shows response
export interface PopularTvResponse {
  page: number;
  results: TvShowSummary[];
  total_pages: number;
  total_results: number;
}

//! Movie details response (simplified)
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path?: string | null;
  release_date?: string;
  runtime?: number;
  genres: { id: number; name: string }[];
  vote_average?: number;
  adult?: boolean;
  budget?: number;
  imdb_id?: string;
  popularity?: number;
  production_companies?: { id: number; name: string; logo_path?: string }[];
  revenue?: number;
  original_language?: string;
}

//! TV show details response (simplified)
export interface TvShowDetails {
  id: number;
  name: string;
  overview: string;
  poster_path?: string | null;
  first_air_date?: string;
  number_of_seasons?: number;
  genres: { id: number; name: string }[];
}

//! Rate response
export interface RateResponse {
  status_code: number;
  status_message: string;
}
