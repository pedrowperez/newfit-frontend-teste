import { MoviesResponse } from '../types';

export const fetchMovies = async (): Promise<MoviesResponse> => {
  try {
    const response = await fetch('https://wefit-movies.vercel.app/api/movies');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: MoviesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
