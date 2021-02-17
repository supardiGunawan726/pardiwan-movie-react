import { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Grid from "../../../components/Grid";
import { popularMovieUrl } from "../../../utility/util";

const PopularMovie = () => {
  const [popularMovie, setPopularMovie] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const { page } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsPending(true);
    fetch(popularMovieUrl(page))
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        setPopularMovie(data.results);
      });
  }, [page]);

  return (
    <section>
      <h2 className="w-full text-center text-white text-lg font-bold bg-primaryLight rounded-xl py-2 ring-1 ring-gray-800">
        Popular Movie
      </h2>
      <div className="bg-primaryLight rounded-xl p-2 ring-1 ring-gray-800 mt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-white">Page {page}</h4>
          {page != 1 && (
            <Link
              to={`/movie/popular/${parseInt(page) - 1}`}
              className="text-white hover:text-blue-500 ml-auto mr-2"
            >
              &#9665;
            </Link>
          )}
          <Link
            to={`/movie/popular/${parseInt(page) + 1}`}
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
          {popularMovie && !isPending && (
            <Grid
              data={popularMovie}
              clicked={(id) => history.push(`/movie/${id}`)}
            ></Grid>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularMovie;
