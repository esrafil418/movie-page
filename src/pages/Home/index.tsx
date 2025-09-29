import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../../api/movies";
import type { PopularMoviesResponse, MovieSummary } from "../../types/tmdb";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../../components/ErrorMessage";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import Footer from "../../components/Footer";

const PAGE_SIZE = 10;

const Home: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery<PopularMoviesResponse>(
    {
      queryKey: ["popularMovies"],
      queryFn: () => fetchPopularMovies(1),
    }
  );

  // UI state (always declared before any early returns)
  const [filter, setFilter] = useState<"all" | "movie" | "series">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [genreOpen, setGenreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genreFilter, setGenreFilter] = useState<string | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Map API results to Movie[] (memoized)
  const movies: Movie[] = React.useMemo(
    () =>
      data?.results.map((m: MovieSummary) => ({
        id: m.id,
        title: m.title ?? "Untitled",
        year: m.release_date ? Number(m.release_date.split("-")[0]) : 0,
        genre: "N/A",
        thumbnail: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "",
      })) ?? [],
    [data]
  );

  // derive genres from movies
  const genres = useMemo(() => {
    const s = new Set<string>();
    movies.forEach((m) => {
      if (m.genre && m.genre !== "N/A") s.add(m.genre);
    });
    return Array.from(s);
  }, [movies]);

  // Filter
  const filtered = useMemo(() => {
    let list = movies.slice();

    if (filter === "series") {
      // repo doesn't include type info; assume no series present
      list = [];
    }

    if (genreFilter !== "all") {
      list = list.filter((m) => m.genre === genreFilter);
    }

    // Sort
    list.sort((a, b) =>
      sortOrder === "newest" ? b.year - a.year : a.year - b.year
    );

    return list;
  }, [movies, filter, genreFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const currentMovies = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  // Keep loading indicator in the UI
  const loading = isLoading;

  if (isError)
    return (
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        <div className="p-8">
          <ErrorMessage
            message="Error fetching movies."
            onRetry={() => refetch()}
          />
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* Filter + Sort section */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-4 p-4">
        {/* Desktop Filters */}
        <div className="hidden sm:flex flex-wrap items-center gap-2">
          {(["all", "movie", "series"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm transition min-w-[80px] text-center ${
                filter === f
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {f === "all" ? "All" : f === "movie" ? "Movies" : "Series"}
            </button>
          ))}

          <button
            onClick={() => setSortOrder("newest")}
            className={`px-4 py-2 rounded-md text-sm transition min-w-[80px] text-center ${
              sortOrder === "newest"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`px-4 py-2 rounded-md text-sm transition min-w-[80px] text-center ${
              sortOrder === "oldest"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Oldest
          </button>

          {/* Genre Filter */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setGenreOpen((prev) => !prev)}
              className="px-4 py-2 rounded-md text-sm min-w-[80px] text-center bg-gray-800 text-white shadow hover:bg-gray-700 focus:outline-none"
            >
              {genreFilter === "all" ? "All Genres" : genreFilter}
            </button>

            {genreOpen && (
              <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setGenreFilter("all");
                      setGenreOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  >
                    All Genres
                  </button>
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGenreFilter(g);
                        setGenreOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white text-sm shadow hover:bg-gray-700 focus:outline-none"
          >
            Filters
          </button>

          {mobileMenuOpen && (
            <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50 flex flex-col gap-2 p-2">
              {(["all", "movie", "series"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-md text-sm text-left ${
                    filter === f
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {f === "all" ? "All" : f === "movie" ? "Movies" : "Series"}
                </button>
              ))}

              <button
                onClick={() => {
                  setSortOrder("newest");
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-md text-sm text-left ${
                  sortOrder === "newest"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => {
                  setSortOrder("oldest");
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-md text-sm text-left ${
                  sortOrder === "oldest"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Oldest
              </button>

              <button
                onClick={() => setGenreOpen((prev) => !prev)}
                className="px-4 py-2 rounded-md text-sm text-left bg-gray-800 text-white hover:bg-gray-700"
              >
                {genreFilter === "all" ? "All Genres" : genreFilter}
              </button>

              {genreOpen && (
                <div className="flex flex-col gap-1 mt-1">
                  <button
                    onClick={() => {
                      setGenreFilter("all");
                      setGenreOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-left text-gray-200 hover:bg-gray-700 rounded-md"
                  >
                    All Genres
                  </button>
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGenreFilter(g);
                        setGenreOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-left text-gray-200 hover:bg-gray-700 rounded-md"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Movies Grid */}
      <main className="p-8">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="grid gap-6
                   grid-cols-2
                   sm:grid-cols-2
                   md:grid-cols-5
                   lg:grid-cols-5"
          >
            {loading ? (
              <p className="text-white text-center col-span-full">
                Loading movies...
              </p>
            ) : (
              currentMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {/* desktop */}
          <div className="hidden sm:flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-red-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* mobile - show condensed */}
          <div className="flex sm:hidden space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
              )
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {idx > 0 && page - arr[idx - 1] > 1 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}

                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      currentPage === page
                        ? "bg-red-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
