import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Grid from "../../../components/Grid";
import { genresUrl, movieByGenreUrl } from "../../../utility/util";

const Genre = () => {
  const [movies, setMovies] = useState(null);
  const [genre, setGenre] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const { id, page } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsPending(true);
    fetch(movieByGenreUrl(id, page))
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        setMovies(data.results);
        return fetch(genresUrl);
      })
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        data.genres.forEach((item) => {
          if (item.id == id) {
            setGenre(item.name);
          }
        });
      });
  }, [page]);

  return (
    <section>
      {genre && (
        <Helmet>
          <title>Pardiwan Movie Updates | {genre}</title>
        </Helmet>
      )}

      <h2 className="w-full text-center text-white text-lg font-bold capitalize">
        {genre && genre + " movies"}
      </h2>
      <div className="flex justify-between items-center">
        <h4 className="text-white">Page {page}</h4>
        {page != 1 && (
          <Link
            to={`/movie/genre/${id}/${parseInt(page) - 1}`}
            className="text-white hover:text-blue-500 ml-auto mr-2"
          >
            &#9665;
          </Link>
        )}
        <Link
          to={`/movie/genre/${id}/${parseInt(page) + 1}`}
          className="text-white hover:text-blue-500"
        >
          &#9655;
        </Link>
      </div>
      <div>
        {isPending && (
          <p className="block w-full px-8 py-12 text-white font-bold text-xl text-center">
            Loading...
          </p>
        )}
        {movies && !isPending && (
          <Grid
            data={movies}
            clicked={(id) => history.push(`/movie/${id}`)}
          ></Grid>
        )}
      </div>
    </section>
  );
};

export default Genre;
