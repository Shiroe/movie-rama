// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const API = process.env.TMDB_API;
const TOKEN = process.env.TMDB_TOKEN;

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type NOW_PLAYING_RESPONSE = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NOW_PLAYING_RESPONSE>
) {
  const { page } = JSON.parse(req.body);
  const URL = `${API}/movie/now_playing?api_key=${TOKEN}&page=${page}`;
  const response = await fetch(URL);
  const data = await response.json();

  res.status(response.status).json(data);
}
