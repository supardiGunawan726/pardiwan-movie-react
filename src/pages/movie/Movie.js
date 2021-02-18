import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Grid from "../../components/Grid";
import {
  popularMovieUrl,
  topMovieUrl,
  upcomingMovieUrl,
} from "../../utility/util";

const Movie = () => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [topMovies, setTopMovies] = useState(null);
  const history = useHistory();
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    fetch(upcomingMovieUrl(1))
      .then((res) => res.json())
      .then((data) => {
        setUpcomingMovies(data.results);
        return fetch(popularMovieUrl(1));
      })
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
        return fetch(topMovieUrl(1));
      })
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        setTopMovies(data.results);
      })
      .catch((err) => {
        setIsPending(false);
        setIsError(true);
      });
  }, []);

  return (
    <>
      {/* error message */}
      {isError && (
        <div className="w-full flex items-center justify-center h-72 font-bold text-white text-xl">
          wadooh error, aku harus segera melaporkan nya ke developer sekarang
          juga !
        </div>
      )}

      {/* loading message */}
      {isPending && (
        <div className="w-full flex items-center justify-center h-72 font-bold text-white text-xl">
          Loading...
        </div>
      )}

      {!isError && !isPending && (
        <section>
          <Helmet>
            <title>Pardiwan Movie Updates | Movie</title>
          </Helmet>

          <div className="w-full bg-primaryLight rounded-xl mt-4 px-4 py-2 ring-1 ring-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white tracking-wider">
                Upcoming Movies
              </h2>
              <Link
                to="/movie/upcoming/1"
                className="font-sans text-xs text-blue-500"
              >
                see more
              </Link>
            </div>
            <div>
              {upcomingMovies && (
                <Grid
                  data={upcomingMovies}
                  clicked={(id) => history.push(`/movie/${id}`)}
                />
              )}
            </div>
          </div>
          <div className="w-full bg-primaryLight rounded-xl mt-4 px-4 py-2 ring-1 ring-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white tracking-wider">
                Popular Movies
              </h2>
              <Link
                to="/movie/popular/1"
                className="font-sans text-xs text-blue-500"
              >
                see more
              </Link>
            </div>
            <div>
              {popularMovies && (
                <Grid
                  data={popularMovies}
                  clicked={(id) => history.push(`/movie/${id}`)}
                />
              )}
            </div>
          </div>
          <div className="w-full bg-primaryLight rounded-xl mt-4 px-4 py-2 ring-1 ring-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white tracking-wider">
                Top Rated Movies
              </h2>
              <Link
                to="/movie/top/1"
                className="font-sans text-xs text-blue-500"
              >
                see more
              </Link>
            </div>
            <div>
              {topMovies && (
                <Grid
                  data={topMovies}
                  clicked={(id) => history.push(`/movie/${id}`)}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Movie;
