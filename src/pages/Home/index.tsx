import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../../api/movies";
import type { PopularMoviesResponse, MovieSummary } from "../../types/tmdb";
import type { Movie } from "../../types/movie";
// src/components/ErrorMessage.tsx
import ErrorMessage from "../../components/ErrorMessage";

// Home page component
const Home: React.FC = () => {
  // useQuery hook for popular movies
  const { data, isLoading, isError, refetch } = useQuery<PopularMoviesResponse>(
    {
      queryKey: ["popularMovies"],
      queryFn: () => fetchPopularMovies(1), // page = 1
    }
  );

  // Loading state
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  // Error state
  if (isError)
    return (
      <ErrorMessage
        message="Error fetching movies."
        onRetry={() => refetch()}
      />
    );

  // Convert API data to Movie type
  const moviesForList: Movie[] =
    data?.results.map((m: MovieSummary) => ({
      id: m.id,
      title: m.title ?? "Untitled",
      year: m.release_date ? Number(m.release_date.split("-")[0]) : 0,
      genre: "N/A", // can be updated later
      thumbnail: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : "",
    })) ?? [];

  return (
    <div className="p-4 max-w-[1400px] mx-auto">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Popular Movies</h1>

      {/* Movie list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <MovieList movies={moviesForList} loading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
