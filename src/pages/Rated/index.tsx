import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "../../api/ratings";
import type { Movie } from "../../types/movie";
import MovieList from "../../components/MovieList";

const Rated: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const guestSessionId = "your-guest-session-id"; // جایگزین با session واقعی

  // Fetch rated movies
  const {
    data: ratedMoviesData,
    isLoading: moviesLoading,
    isError: moviesError,
  } = useQuery({
    queryKey: ["ratedMovies", currentPage],
    queryFn: () => fetchRatedMovies(guestSessionId, currentPage),
    keepPreviousData: true,
  });

  // Fetch rated TV shows
  const {
    data: ratedTvData,
    isLoading: tvLoading,
    isError: tvError,
  } = useQuery({
    queryKey: ["ratedTvShows", currentPage],
    queryFn: () => fetchRatedTvShows(guestSessionId, currentPage),
    keepPreviousData: true,
  });

  const loading = moviesLoading || tvLoading;
  const error = moviesError || tvError;

  // Combine movies and TV shows
  const currentItems: Movie[] = [
    ...(ratedMoviesData?.results ?? []),
    ...(ratedTvData?.results ?? []),
  ].map((item) => ({
    id: item.id,
    title: item.title ?? item.name ?? "Untitled",
    year: item.release_date
      ? Number(item.release_date.split("-")[0])
      : item.first_air_date
        ? Number(item.first_air_date.split("-")[0])
        : 0,
    genre: "N/A",
    thumbnail: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : "",
  }));

  const totalPages = Math.max(
    ratedMoviesData?.total_pages ?? 0,
    ratedTvData?.total_pages ?? 0
  );

  return (
    <div className="p-4 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Rated Movies & TV Shows
      </h1>

      {error && (
        <p className="text-center text-red-500 mb-4">
          Failed to fetch rated items.
        </p>
      )}

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <MovieList movies={currentItems} loading={loading} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rated;
