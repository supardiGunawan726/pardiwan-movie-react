import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [hidden, setHidden] = useState("hidden");
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleClick = (e) => {
    if (isHidden) {
      setHidden("");
    } else {
      setHidden("hidden");
    }
    setIsHidden(!isHidden);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/movie/search/${query}`);
  };

  return (
    <nav className="w-full md:flex md:justify-between md:items-center my-2">
      <div className="px-4 py-2 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-lg font-sans tracking-widest text-red-500"
        >
          PARDIWAN
        </Link>
        <div onClick={handleClick} className="w-6 h-6 bg-white md:hidden"></div>
      </div>
      <div className={`${hidden} md:flex md:items-center flex-grow-0 mr-auto`}>
        <Link
          className="px-4 py-2 block text-xs text-white font-bold hover:bg-red-500 transition-colors duration-500 ease-out md:rounded-xl md:py-1 md:px-3"
          to="/"
          onClick={handleClick}
        >
          Home
        </Link>
        <Link
          className="px-4 py-2 block text-xs text-white font-bold hover:bg-red-500 transition-colors duration-500 ease-out md:rounded-xl md:py-1 md:px-3"
          to="/movie"
          onClick={handleClick}
        >
          Movie
        </Link>
        <Link
          className="px-4 py-2 block text-xs text-white font-bold hover:bg-red-500 transition-colors duration-500 ease-out md:rounded-xl md:py-1 md:px-3"
          to="/tv"
          onClick={handleClick}
        >
          TV Series
        </Link>
      </div>
      <div className="px-4 flex-grow-0 md:w-2/5" onSubmit={handleSubmit}>
        <form className="w-full bg-white rounded-full overflow-hidden flex items-center justify-between">
          <input
            className="px-4 py-2 flex-grow text-xs focus:outline-none"
            type="text"
            placeholder="Search Movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="w-12 h-8 flex-grow-0 flex items-center justify-center">
            S
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
