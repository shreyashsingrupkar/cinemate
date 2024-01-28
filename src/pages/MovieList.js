import { useEffect, useMemo, useCallback } from "react";
import { useState } from "react";
import { Card } from "../components";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  //const [latestMovie, setLatestMovie] = useState([]);

  const moviesLatestURL = "https://api.themoviedb.org/3/movie/latest";

  const nowPlayingURL = "https://api.themoviedb.org/3/movie/now_playing";

  const popularURL = "https://api.themoviedb.org/3/movie/popular";

  const topRatedURL = "https://api.themoviedb.org/3/movie/top_rated";

  const upcomingURL = "https://api.themoviedb.org/3/movie/upcoming";

  const options = useMemo(() => {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGU5YjhkZTM2YTQ3OTU3NDQ1ODk2Yjg3NmMyYjFlMCIsInN1YiI6IjY1YjYyMzQ1YjZjZmYxMDE3Y2Y3YjcwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kHKZulGI44sV9FmqBMM-FW8ZRRqivFbljpu13E6sA74",
      },
    };
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(nowPlayingURL, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [nowPlayingURL, options]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MovieList;
