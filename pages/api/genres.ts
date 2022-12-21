// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const API = process.env.TMDB_API;
const TOKEN = process.env.TMDB_TOKEN;

export type GENRE = {
  id: number;
  name: string;
}

export type GENRES_RESPONSE = {
  genres: GENRE[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GENRE[]>
) {
  const URL = `${API}/genre/movie/list?api_key=${TOKEN}`;
  const response = await fetch(URL);
  const data = await response.json();

  res.status(response.status).json(data);
}
