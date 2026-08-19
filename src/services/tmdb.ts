const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query: string) {
  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`
  );

  const data = await response.json();

  return data.results;
}


export async function getMovieDetails(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  );

  const data = await response.json();

  return data;
}