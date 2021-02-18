import { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Poster from "../../components/Poster";
import {
  genresUrl,
  getMovieImageUrl,
  getTrailerUrl,
  movieDetailUrl,
  popularMovieUrl,
} from "../../utility/util";
import Grid from "../../components/Grid";
import { Helmet } from "react-helmet";

const DetailMovie = () => {
  const [movie, setMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsPending(true);
    fetch(movieDetailUrl(id))
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        setMovie(data);
        return fetch(popularMovieUrl(1));
      })
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
        return fetch(genresUrl);
      })
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        setGenres(data.genres);
      })
      .catch((err) => {
        setIsPending(false);
        setIsError(true);
      });
  }, [id]);

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
      {!isPending && !isError && movie && (
        <section className="w-full lg:grid grid-cols-12 gap-4">
          <Helmet>
            <title>Pardiwan Movie Updates | {movie.title}</title>
          </Helmet>

          <div className="w-full col-span-9">
            {movie.videos.results[0] && (
              <div className="fluid rounded-xl overflow-hidden">
                <iframe
                  className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
                  src={getTrailerUrl(movie.videos.results[0].key)}
                  frameBorder="0"
                  allowFullScreen={true}
                ></iframe>
              </div>
            )}
            <div className="mt-4 rounded-xl p-4 overflow-hidden w-full bg-primaryLight">
              <div className="flex flex-col items-center gap-4 lg:flex-row">
                <div className="w-24 h-36 flex-shrink-0 lg:w-36 lg:h-52">
                  <Poster image={getMovieImageUrl(movie.poster_path, "w500")} />
                </div>
                <div className="w-full mx-auto">
                  <h4 className="text-white text-lg font-bold text-center lg:text-left">
                    {movie.title}
                  </h4>
                  <div className="text-sm italic leading-3 text-gray-300 text-center lg:text-left">
                    {movie.tagline}
                  </div>
                  <div className="text-gray-300 font-bold flex justify-around my-2 border-b-2 border-gray-500 pb-2 w-full border-dashed lg:justify-start gap-4">
                    <p>{movie.release_date.substring(0, 4)}</p>
                    <p>{movie.production_countries[0].iso_3166_1}</p>
                    <p>{movie.runtime + " Min"}</p>
                  </div>
                  <div className="text-gray-300 flex flex-col items-center lg:items-start">
                    <p>
                      <span className="font-semibold">Director:</span>{" "}
                      {
                        movie.credits.crew.find(
                          (item) => item.job === "Director"
                        ).name
                      }
                    </p>
                    <p>
                      <span className="font-semibold">Vote average:</span>{" "}
                      {movie.vote_average}
                    </p>
                  </div>
                  <div className="flex gap-4 flex-wrap items-center justify-center w-full my-4 lg:justify-start">
                    {movie.genres.map((genre) => (
                      <p
                        className="bg-gray-600 text-gray-200 px-2 py-1 pb-2  leading-none rounded"
                        key={genre.id}
                      >
                        {genre.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-xl p-4 overflow-hidden w-full bg-primaryLight">
              <h2 className="font-bold text-lg text-white">Overview</h2>
              <p className="text-gray-300 leading-6 text-sm">
                {movie.overview}
              </p>
            </div>
            <div className="mt-4 rounded-xl p-4 overflow-hidden w-full bg-primaryLight">
              <h2 className="font-bold text-lg text-white">Similar Movies</h2>
              {movie.similar.results && (
                <Grid
                  data={movie.similar.results}
                  clicked={(id) => history.push(`/movie/${id}`)}
                />
              )}
            </div>
          </div>
          <div className="w-full col-span-3">
            <div className="rounded-xl px-4 py-2 overflow-hidden bg-primaryLight mt-4 lg:mt-0">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white tracking-wider">
                  Popular Movies
                </h2>
              </div>
              {popularMovies && (
                <div>
                  {popularMovies.map((item) => (
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
            <div className="rounded-xl px-4 py-2 overflow-hidden bg-primaryLight mt-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white tracking-wider">Genres</h2>
              </div>
              {genres && (
                <div>
                  {genres.map((item) => (
                    <div className="text-gray-100" key={item.id}>
                      <Link
                        to={`/movie/genre/${item.id}/1`}
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
        </section>
      )}
    </>
  );
};

export default DetailMovie;
