import { getMovieImageUrl } from "../utility/util";
import Poster from "./Poster";

const Grid = ({ data, clicked }) => {
  return (
    <div className="w-full py-2 grid grid-auto-fit auto-rows-max gap-y-4 gap-x-2">
      {data.map(
        (item) =>
          item.poster_path && (
            <div
              key={item.id}
              onClick={() => clicked(item.id)}
              className="w-full h-full transform-gpu hover:scale-105 transition-transform"
            >
              <div className="w-full h-32">
                <Poster image={getMovieImageUrl(item.poster_path, "w500")} />
              </div>
              <span className="font-medium text-sm capitalize text-white flex-grow-0 text-center w-full block">
                {item.title !== undefined
                  ? item.title.length >= 10
                    ? item.title.substring(0, 9).trim() + "..."
                    : item.title
                  : item.name.length >= 10
                  ? item.name.substring(0, 9).trim() + "..."
                  : item.name}
              </span>
            </div>
          )
      )}
    </div>
  );
};

export default Grid;
