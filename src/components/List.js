import { getMovieImageUrl } from "../utility/util";
import Poster from "./Poster";

const List = ({ data, clicked }) => {
  return (
    <div className="w-full flex overflow-x-auto noscroll py-2">
      {data.map(
        (item) =>
          item.poster_path && (
            <div
              onClick={() => clicked(item.id)}
              key={item.id}
              className="mx-1 flex flex-col items-center transform-gpu hover:scale-105 transition-transform"
            >
              <div className="w-24 h-36">
                <Poster image={getMovieImageUrl(item.poster_path, "w500")} />
              </div>
              <span className="font-medium text-sm capitalize text-white text-center">
                {item.title.length >= 10
                  ? item.title.substring(0, 9).trim() + "..."
                  : item.title}
              </span>
            </div>
          )
      )}
    </div>
  );
};

export default List;
