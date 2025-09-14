import React from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
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
      <h2 className="text-sm font-semibold truncate px-2 mt-2">
        {movie.title}
      </h2>
      <p className="text-xs text-gray-500 px-2 mb-2">⭐ N/A</p>
    </div>
  );
};

export default MovieCard;
