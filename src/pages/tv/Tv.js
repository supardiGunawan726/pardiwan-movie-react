import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Grid from "../../components/Grid";
import { popularTvUrl, topTvUrl } from "../../utility/util";

const Tv = () => {
  const [popularTv, setPopularTv] = useState(null);
  const [topTv, setTopTv] = useState(null);
  const history = useHistory();
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    fetch(popularTvUrl(1))
      .then((res) => res.json())
      .then((data) => {
        setPopularTv(data.results);
        return fetch(topTvUrl(1));
      })
      .then((res) => res.json())
      .then((data) => {
        setIsPending(false);
        setTopTv(data.results);
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
          <div className="w-full bg-primaryLight rounded-xl mt-4 px-4 py-2 ring-1 ring-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white tracking-wider">
                Popular TV Series
              </h2>
              <Link
                to="/tv/popular/1"
                className="font-sans text-xs text-blue-500"
              >
                see more
              </Link>
            </div>
            <div>
              {popularTv && (
                <Grid
                  data={popularTv}
                  clicked={(id) => history.push(`tv/${id}`)}
                />
              )}
            </div>
          </div>
          <div className="w-full bg-primaryLight rounded-xl mt-4 px-4 py-2 ring-1 ring-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white tracking-wider">
                Top Rated TV Series
              </h2>
              <Link to="/tv/top/1" className="font-sans text-xs text-blue-500">
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
        </section>
      )}
    </>
  );
};

export default Tv;
