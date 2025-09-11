import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../../services/tmdb";
import type { PopularMoviesResponse, MovieSummary } from "../../types/tmdb";

// Home page component
const Home: React.FC = () => {
  // useQuery hook for popular movies
  const { data, isLoading, isError } = useQuery<PopularMoviesResponse>({
    queryKey: ["popularMovies"],
    queryFn: () => fetchPopularMovies(1), // page = 1
  });

  // Loading state
  if (isLoading) return <p>Loading...</p>;

  // Error state
  if (isError) return <p>Error fetching movies.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data?.results.map((movie: MovieSummary) => (
          <div key={movie.id} className="bg-base-200 rounded p-2">
            {/* Poster */}
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2"
              />
            ) : (
              <div className="bg-gray-300 h-64 flex items-center justify-center">
                No Image
              </div>
            )}

            {/* Title */}
            <h2 className="text-sm font-semibold">
              {movie.title || "Untitled"}
            </h2>

            {/* Rating */}
            <p className="text-xs text-gray-500">
              ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
