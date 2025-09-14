import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../../api/movies";
import type { MovieDetails } from "../../types/tmdb";

const Movie: React.FC = () => {
  // گرفتن movieId از URL
  const { movieId } = useParams<{ movieId: string }>();

  // استفاده از useQuery برای fetch جزئیات فیلم
  const { data, isLoading, isError } = useQuery<MovieDetails>({
    queryKey: ["movieDetails", movieId],
    queryFn: () => fetchMovieDetails(movieId!),
    enabled: !!movieId, // اجرای query فقط وقتی movieId موجوده
  });

  // Loading state
  if (isLoading)
    return <p className="text-center mt-10 text-gray-400">Loading movie...</p>;

  // Error state
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load movie details.
      </p>
    );

  if (!data) return null; // امنیتی، وقتی data undefined باشه

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="flex-shrink-0">
          {data.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              className="rounded-lg shadow-lg w-full md:w-64"
            />
          ) : (
            <div className="bg-gray-300 w-full md:w-64 h-96 flex items-center justify-center rounded-lg">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <p className="text-gray-500 mb-2">
            {data.release_date
              ? new Date(data.release_date).getFullYear()
              : "N/A"}{" "}
            • {data.runtime ? `${data.runtime} min` : "N/A"}
          </p>
          <p className="mb-4 text-gray-600">
            Genres:{" "}
            {data.genres.length > 0
              ? data.genres.map((g) => g.name).join(", ")
              : "N/A"}
          </p>
          <p className="text-gray-700">{data.overview || "No description."}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
