import { fetchMovieDetails } from "../../api/movies";
import type { MovieDetails } from "../../types/tmdb";

// Suspense wrapper: converts a Promise<T> into a resource with read()
function wrapPromise<T>(promise: Promise<T>) {
  let status: "pending" | "success" | "error" = "pending";
  let result: T | Error;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result as T;
    },
  };
}

export type SimpleMovie = {
  id: number;
  title: string;
  poster: string;
  year: number;
  genre: string;
  description: string;
  runtime?: number;
};

export function createMovieResource(id: string): { read(): SimpleMovie } {
  const promise = fetchMovieDetails(id).then((md: MovieDetails) => {
    const poster = md.poster_path
      ? `https://image.tmdb.org/t/p/original${md.poster_path}`
      : "";
    const year = md.release_date ? Number(md.release_date.split("-")[0]) : 0;
    const genre =
      md.genres && md.genres.length > 0
        ? md.genres.map((g) => g.name).join(", ")
        : "N/A";

    const simple: SimpleMovie = {
      id: md.id,
      title: md.title || "Untitled",
      poster,
      year,
      genre,
      description: md.overview || "No description.",
      runtime: md.runtime,
    };

    return simple;
  });

  return wrapPromise<SimpleMovie>(promise);
}
