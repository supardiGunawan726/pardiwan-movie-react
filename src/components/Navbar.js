import { useState } from "react";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleClick = (e) => {
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
        <div onClick={handleClick} className="w-6 h-6 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            width="24"
          >
            {!isHidden && (
              <>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </>
            )}
            {isHidden && (
              <>
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
              </>
            )}
          </svg>
        </div>
      </div>
      <div
        className={`${
          isHidden === true ? "hidden" : ""
        } md:flex md:items-center flex-grow-0 mr-auto`}
      >
        <NavLink
          exact
          activeClassName="bg-red-500"
          className="px-4 py-3 block lg:text-xs text-white font-bold hover:bg-red-500 transition-colors duration-500 ease-out md:rounded-xl md:py-1 md:px-3"
          to="/"
          onClick={handleClick}
        >
          Home
        </NavLink>
        <NavLink
          exact
          activeClassName="bg-red-500"
          className="px-4 py-3 block lg:text-xs text-white font-bold hover:bg-red-500 transition-colors duration-500 ease-out md:rounded-xl md:py-1 md:px-3"
          to="/movie"
          onClick={handleClick}
        >
          Movie
        </NavLink>
        <NavLink
          exact
          activeClassName="bg-red-500"
          className="px-4 py-3 block lg:text-xs text-white font-bold hover:bg-red-500 transition-colors duration-500 ease-out md:rounded-xl md:py-1 md:px-3"
          to="/tv"
          onClick={handleClick}
        >
          TV Series
        </NavLink>
      </div>
      <div className="px-4 flex-grow-0 md:w-2/5" onSubmit={handleSubmit}>
        <form className="w-full bg-white rounded-full overflow-hidden flex items-center justify-between px-2">
          <input
            className="px-2 py-3 text-sm text-gray-800 focus:outline-none md:py-2"
            type="text"
            placeholder="Search Movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="flex-grow-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="black"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
