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

export type MOVIES_RESPONSE = {
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
  res: NextApiResponse<MOVIES_RESPONSE>
) {
  const { page, search } = JSON.parse(req.body);
  const URL = `${API}/search/movie?api_key=${TOKEN}&page=${page}&query=${search}`;
  const response = await fetch(URL);
  const data = await response.json();

  res.status(response.status).json(data);
}
