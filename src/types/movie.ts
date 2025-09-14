// Movie type
export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  thumbnail: string;
}

// Response type for rated movies
export interface RatedMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
