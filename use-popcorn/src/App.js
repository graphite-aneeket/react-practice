import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  const callback = (e) => {
    if (document.activeElement === inputEl.current) {
      return;
    }

    if (e.code === "Enter") {
      inputEl.current.focus();
      setQuery("");
    }
  };

  useKey(callback);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Navbar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

const MovieList = ({ movies, setMovieId }) => {
  const handleMovieSet = (selectedId) => {
    setMovieId((originalId) => (originalId === selectedId ? null : selectedId));
  };

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => handleMovieSet(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const WatchedMovieList = ({ watched, setWatched }) => {
  const deleteWatched = (movieId) => {
    setWatched(watched?.filter((mov) => mov.imdbID !== movieId));
  };

  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => deleteWatched(movie.imdbID)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

const Summary = ({ watched }) => {
  const avgImdbRating = Math.round(
    average(watched.map((movie) => movie.imdbRating))
  );
  const avgUserRating = Math.round(
    average(watched.map((movie) => movie.userRating))
  );
  const avgRuntime = Math.round(average(watched.map((movie) => movie.runtime)));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const Main = ({ movies, isLoading, errMsg }) => {
  const [movieId, setMovieId] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "watched");

  return (
    <main className="main">
      <Box>
        {errMsg ? (
          <ErrMessage errMsg={errMsg} />
        ) : isLoading ? (
          <Loader />
        ) : (
          <MovieList movies={movies} setMovieId={setMovieId} />
        )}
      </Box>
      <Box>
        {movieId ? (
          <MovieDetails
            movieId={movieId}
            setMovieId={setMovieId}
            setWatched={setWatched}
            watched={watched}
          />
        ) : (
          <>
            <Summary watched={watched} />
            <WatchedMovieList watched={watched} setWatched={setWatched} />
          </>
        )}
      </Box>
    </main>
  );
};

const MovieDetails = ({ movieId, setMovieId, setWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const alreadyRatedMovie = watched
    ?.filter((mov) => mov.imdbID === movieId)
    .at(0);

  const userSelectedRatingCount = useRef(0);

  const callback = (e) => {
    if (e.code === "Escape") {
      setMovieId(null);
    }
  };

  useKey(callback);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        setIsLoading(true);
        setErrMsg("");
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`
        );
        const data = await res.json();
        if (res && res.ok) {
          setMovie(data);
        }
      } catch (err) {
        setErrMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieInfo();
  }, [movieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    if (rating > 0) {
      userSelectedRatingCount.current++;
    }
  }, [rating]);

  const handleGoBack = () => {
    setMovieId(null);
  };

  const handleAddMovie = () => {
    const newWatchedMovie = {
      imdbRating,
      imdbID: movieId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ")[0]),
      userRating: rating,
      userSelectedRatingCount: userSelectedRatingCount.current,
    };
    setWatched([...watched, newWatchedMovie]);
    handleGoBack();
  };

  return errMsg ? (
    <ErrMessage errMsg={errMsg} />
  ) : isLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => handleGoBack()}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {alreadyRatedMovie ? (
            <p>Already Rated with {alreadyRatedMovie.userRating} ⭐️</p>
          ) : (
            <>
              <StarRating size={24} maxRating={10} onSetRating={setRating} />
              {rating > 0 && (
                <button onClick={() => handleAddMovie()} className="btn-add">
                  + Add to list
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
};

const ErrMessage = ({ errMsg }) => {
  return (
    <p className="error">
      <span>⛔️</span> {errMsg}
    </p>
  );
};

const Loader = () => {
  return <p className="loader">Loading...</p>;
};

const apiKey = "635ffc0d";

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, errMsg } = useMovies(query);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main movies={movies} isLoading={isLoading} errMsg={errMsg} />
    </>
  );
}

