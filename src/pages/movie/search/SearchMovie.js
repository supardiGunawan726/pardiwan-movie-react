import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Grid from "../../../components/Grid";
import Poster from "../../../components/Poster";
import {
  getMovieImageUrl,
  searchMovieUrl,
  topMovieUrl,
} from "../../../utility/util";

const SearchMovie = () => {
  const [topMovies, setTopMovies] = useState(null);
  const [movies, setMovies] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const { query } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsPending(true);
    fetch(topMovieUrl(1))
      .then((res) => res.json())
      .then((data) => {
        setTopMovies(data.results);
        return fetch(searchMovieUrl(query));
      })
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        setMovies(data.results);
      })
      .catch((err) => {
        setIsPending(false);
        setIsError(true);
      });
  }, [query]);

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
        <section className="w-full lg:grid grid-cols-12 gap-6">
          <Helmet>
            <title>Pardiwan Movie Updates | {query}</title>
          </Helmet>

          <div className="col-span-8">
            <h2 className="text-white font-bold">Search : {query}</h2>
            {movies && !isPending && !isError && (
              <div className="w-full grid grid-cols-1 auto-rows-max">
                {movies.map(
                  (movie) =>
                    movie.poster_path && (
                      <div
                        onClick={() => history.push("/movie/" + movie.id)}
                        key={movie.id}
                        className="w-full max-h-36 rounded-xl overflow-hidden my-2 flex bg-primaryLight ring-1 ring-gray-800 transform-gpu transition-transform duration-300 ease-in-out hover:scale-105"
                      >
                        <div className="w-24 flex-shrink-0 mr-4">
                          <img
                            src={getMovieImageUrl(movie.poster_path, "w500")}
                            alt="poster"
                          />
                        </div>
                        <div>
                          <h4 className="text-white text-lg font-semibold">
                            {movie.title}
                          </h4>
                          <p className="text-gray-200 leading-5 text-sm font-light">
                            {movie.overview}
                          </p>
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
          <div className="col-span-4 rounded-xl bg-primaryLight mt-4 lg:mt-0 p-2">
            <h2 className="text-white font-bold">Top Rated Movies</h2>
            {topMovies && (
              <div>
                {topMovies.map(
                  (item) =>
                    item.poster_path && (
                      <div className="text-gray-100" key={item.id}>
                        <Link
                          to={`/movie/${item.id}`}
                          className="capitalize hover:text-blue-500 text-sm"
                        >
                          &#9655; {item.title}
                        </Link>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchMovie;
