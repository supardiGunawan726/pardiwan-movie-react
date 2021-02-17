export const API_KEY = "e62cdc9b39cf5a494cabbe03b680f81b";

export const genresUrl = `http://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

export const getMovieImageUrl = (path, quality = "original") => {
  return `https://image.tmdb.org/t/p/${quality}${path}`;
};

export const popularMovieUrl = (page) => {
  return `http://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}&language=EN`;
};

export const upcomingMovieUrl = (page) => {
  return `http://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}&language=EN`;
};

export const topMovieUrl = (page) => {
  return `http://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}&language=EN`;
};

export const popularTvUrl = (page) => {
  return `http://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}&language=EN`;
};

export const topTvUrl = (page) => {
  return `http://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}&language=EN`;
};

export const movieByGenreUrl = (id, page) => {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`;
};

export const searchMovieUrl = (query) => {
  return `http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
};

export const movieDetailUrl = (id) => {
  return `http://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=EN&append_to_response=credits,videos,similar`;
};

export const tvDetailUrl = (id) => {
  return `http://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=EN&append_to_response=credits,videos,similar`;
};

export const getTrailerUrl = (id) => {
  return `https://www.youtube.com/embed/${id}`;
};
