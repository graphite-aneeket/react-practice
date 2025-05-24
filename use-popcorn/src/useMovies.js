import { useState, useEffect } from "react";

const apiKey = "635ffc0d";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const debounceDelay = 400; // milliseconds

    if (query.length < 3) {
      setMovies([]);
      setErrMsg("");
      return;
    }

    const timeout = setTimeout(() => {
      const getMovieData = async () => {
        try {
          setIsLoading(true);
          setMovies([]);
          setErrMsg("");

          const res = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error(data.Error);
          }
          setMovies(data?.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setErrMsg(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
      getMovieData();
    }, debounceDelay);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, errMsg };
}
