import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import SearchBar from "..//SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/api";


import type { Movie } from "../../types/movie";


const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
    const handleSearch = async (query: string) => {
      if (!query.trim()) {
        toast("Please enter your search query.");
        return;
      }
  
      try {
        setError(false);
        setLoading(true);
        setQuery(query);
        const results = await fetchMovies(query);
  
        if (results.length === 0) {
          toast("No movies found for your request.");
        }
  
        setMovies(results);
      } catch (error) {
        setError(true);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleSelect = (movie: Movie) => setSelectedMovie(movie);
    const handleClose = () => setSelectedMovie(null);
  
    return (
      <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        )}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleClose} />
        )}
        <Toaster position="top-right" />
      </div>
    );
  }