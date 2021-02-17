import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Grid from "../components/Grid";
import List from "../components/List";
import Poster from "../components/Poster";
import {
  popularMovieUrl,
  getMovieImageUrl,
  topTvUrl,
  upcomingMovieUrl,
  genresUrl,
} from "../utility/util";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [topTv, setTopTv] = useState(null);
  const [mostPopularMovie, setMostPopularMovie] = useState(null);
  const [genres, setGenres] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch(popularMovieUrl(1))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPopularMovies(data.results);
        setMostPopularMovie(data.results[0]);
        return fetch(topTvUrl(1));
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopTv(data.results);
        return fetch(upcomingMovieUrl(1));
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUpcomingMovies(data.results);
        return fetch(genresUrl);
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGenres(data.genres);
        setIsPending(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsPending(false);
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

      {/* loading completed */}
      {!isPending && !isError && (
        <div className="w-full lg:grid grid-cols-12 gap-4">
          <div className="w-full col-span-9">
            <div className="grid grid-cols-12 xgap-4 gap-4 w-full h-40 md:h-72 xl:h-80 2xl:h-96">
              <div className="col-span-12 xl:col-span-8 p-1 bg-primaryLight rounded-xl">
                {mostPopularMovie && (
                  <Poster
                    image={getMovieImageUrl(mostPopularMovie.backdrop_path)}
                  />
                )}
              </div>
              {mostPopularMovie && (
                <div className="hidden xl:block xl:col-span-4 h-full">
                  <div className="px-4 py-2 text-white bg-primaryLight rounded-xl overflow-hidden ring-1 ring-gray-800">
                    Most Popular Movie
                  </div>
                  <div className="px-4 py-2 bg-primaryLight rounded-xl overflow-hidden mt-4 ring-1 ring-gray-800">
                    <h1 className="text-white text-2xl font-bold tracking-wider">
                      {mostPopularMovie.title}
                    </h1>
                    <p className="text-gray-100 leading-6">
                      {mostPopularMovie.overview.length >= 130
                        ? mostPopularMovie.overview.substring(0, 130).trim() +
                          "...."
                        : mostPopularMovie.overview}
                    </p>
                    <p className="mt-4 text-blue-500">
                      {mostPopularMovie.release_date}
                    </p>
                    <p className="text-blue-500">
                      {mostPopularMovie.popularity} popularity
                    </p>
                  </div>
                </div>
              )}
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
                  <List
                    data={popularMovies}
                    clicked={(id) => history.push(`/movie/${id}`)}
                  />
                )}
              </div>
            </div>
            <div className="w-full bg-primaryLight rounded-xl mt-4 px-4 py-2 ring-1 ring-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white tracking-wider">
                  Top Rated TV Series
                </h2>
                <Link
                  to="/tv/top/1"
                  className="font-sans text-xs text-blue-500"
                >
                  see more
                </Link>
              </div>
              <div>
                {topTv && (
                  <Grid
                    data={topTv}
                    clicked={(id) => history.push(`/tv/${id}`)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="w-full bg-primaryLight rounded-xl px-4 py-2 ring-1 ring-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white tracking-wider">
                  Upcoming Movies
                </h2>
              </div>
              <div>
                {upcomingMovies && (
                  <div className="text-gray-100 capitalize">
                    {upcomingMovies.map((item) => (
                      <div className="text-gray-100" key={item.id}>
                        <Link
                          to={`/movie/${item.id}`}
                          className="capitalize hover:text-blue-500 text-sm"
                        >
                          &#9655; {item.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full bg-primaryLight rounded-xl px-4 py-2 mt-4 ring-1 ring-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white tracking-wider">Movies</h2>
              </div>
              <div>
                <div className="text-gray-100 capitalize">
                  <Link
                    to="/movie/upcoming/1"
                    className="hover:text-blue-500 text-sm"
                  >
                    &#9655; Upcoming Movies
                  </Link>
                </div>
                <div className="text-gray-100 capitalize">
                  <Link
                    to="/movie/popular/1"
                    className="hover:text-blue-500 text-sm"
                  >
                    &#9655; Popular Movies
                  </Link>
                </div>
                <div className="text-gray-100 capitalize">
                  <Link
                    to="/movie/top/1"
                    className="hover:text-blue-500 text-sm"
                  >
                    &#9655; Top Rated Movies
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full bg-primaryLight rounded-xl px-4 py-2 mt-4 ring-1 ring-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white tracking-wider">
                  TV Series
                </h2>
              </div>
              <div>
                <div className="text-gray-100 capitalize">
                  <Link
                    to="/tv/popular/1"
                    className="hover:text-blue-500 text-sm"
                  >
                    &#9655; Popular TV Series
                  </Link>
                </div>
                <div className="text-gray-100 capitalize">
                  <Link to="/tv/top/1" className="hover:text-blue-500 text-sm">
                    &#9655; Top Rated TV Series
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full bg-primaryLight rounded-xl px-4 py-2 mt-4 ring-1 ring-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white tracking-wider">Genres</h2>
              </div>
              {genres && (
                <div>
                  {genres.map((item) => (
                    <div className="text-gray-100" key={item.id}>
                      <Link
                        to={`movie/genre/${item.id}/1`}
                        className="capitalize hover:text-blue-500 text-sm"
                      >
                        &#9655; {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
