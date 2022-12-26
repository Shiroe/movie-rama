// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import type { MOVIES_RESPONSE } from './movies';

const API = process.env.TMDB_API;
const TOKEN = process.env.TMDB_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MOVIES_RESPONSE>
) {
  const { page } = JSON.parse(req.body);
  const URL = `${API}/movie/now_playing?api_key=${TOKEN}&page=${page}`;
  const response = await fetch(URL);
  const data = await response.json();

  res.status(response.status).json(data);
}
