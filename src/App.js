import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DetailMovie from "./pages/movie/Detail";
import Genre from "./pages/movie/genre/Genre";
import Movie from "./pages/movie/Movie";
import PopularMovie from "./pages/movie/popular/PopularMovie";
import SearchMovie from "./pages/movie/search/SearchMovie";
import TopMovie from "./pages/movie/top/TopMovie";
import UpcomingMovie from "./pages/movie/upcoming/UpcomingMovie";
import DetailTv from "./pages/tv/Detail";
import PopularTv from "./pages/tv/popular/PopularTv";
import TopTv from "./pages/tv/top/TopTv";
import Tv from "./pages/tv/Tv";

function App() {
  return (
    <Router>
      <div className="w-full md:w-10/12 md:mx-auto">
        <Navbar />
        <div className="px-4">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movie" exact component={Movie} />
            <Route path="/movie/:id" exact component={DetailMovie} />
            <Route path="/movie/upcoming/" exact component={Movie} />
            <Route
              path="/movie/upcoming/:page"
              exact
              component={UpcomingMovie}
            />
            <Route path="/movie/popular/:page" exact component={PopularMovie} />
            <Route path="/movie/top/:page" exact component={TopMovie} />
            <Route path="/movie/search/:query" exact component={SearchMovie} />
            <Route path="/movie/genre/:id/:page" exact component={Genre} />
            <Route path="/tv" exact component={Tv} />
            <Route path="/tv/:id" exact component={DetailTv} />
            <Route path="/tv/top/:page" exact component={TopTv} />
            <Route path="/tv/popular/:page" exact component={PopularTv} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
