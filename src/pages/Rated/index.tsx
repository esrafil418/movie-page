// src/pages/Rated/index.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies } from "../../api/movies"; // مسیر api جدید
import type { RatedMoviesResponse, Movie } from "../../types/movie";
import MovieList from "../../components/MovieList";
import ErrorMessage from "../../components/ErrorMessage";

interface RatedProps {
  guestSessionId: string;
}

const Rated: React.FC<RatedProps> = ({ guestSessionId }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // UseQuery
  const { data, isLoading, isError, refetch } = useQuery<
    RatedMoviesResponse,
    Error
  >({
    queryKey: ["ratedMovies", guestSessionId, currentPage],
    queryFn: () =>
      fetchRatedMovies(
        guestSessionId,
        currentPage
      ) as Promise<RatedMoviesResponse>,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <ErrorMessage
        message="Error fetching movies."
        onRetry={() => refetch()}
      />
    );

  // داده‌ها
  const movies: Movie[] = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <div className="p-4 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Rated Movies</h1>

      <MovieList movies={movies} loading={isLoading} />

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-6">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded cursor-pointer ${
              currentPage === i + 1
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rated;
