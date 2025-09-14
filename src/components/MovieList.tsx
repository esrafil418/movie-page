import React from "react";
import type { Movie } from "../types/movie";

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, loading }) => {
  if (loading)
    return (
      <p className="text-center col-span-full text-gray-600 mt-10">
        Loading movies...
      </p>
    );

  return (
    <>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-100 rounded-lg shadow hover:scale-105 transition-transform duration-300 overflow-hidden"
        >
          {movie.thumbnail ? (
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="bg-gray-300 h-64 flex items-center justify-center">
              No Image
            </div>
          )}
          <div className="p-2">
            <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
            <p className="text-xs text-gray-500 mt-1">
              Year: {movie.year > 0 ? movie.year : "N/A"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Genre: {movie.genre}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
