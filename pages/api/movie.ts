// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const API = process.env.TMDB_API;
const TOKEN = process.env.TMDB_TOKEN;

type VIDEO = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

type REVIEW = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

type SIMILAR = {
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
}

export type MOVIE_RESPONSE = {
  videos: VIDEO[];
  reviews: REVIEW[];
  similars: SIMILAR[];
}

export type MOVIE_RESPONSE_ERROR = {
  data: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MOVIE_RESPONSE | MOVIE_RESPONSE_ERROR>
) {
  const { id } = JSON.parse(req.body);

  if (!id) res.status(405).json({ data: 'Bad request, missing movie ID.' });
  
  const videoURL = `${API}/movie/${id}/videos?api_key=${TOKEN}`;
  const similarsURL = `${API}/movie/${id}/similar?api_key=${TOKEN}`;
  const reviewsURL = `${API}/movie/${id}/reviews?api_key=${TOKEN}`;

  const videoRes = await fetch(videoURL);
  const similarsRes = await fetch(similarsURL);
  const reviewsRes = await fetch(reviewsURL);
  
  const videoData = await videoRes.json();
  const similarsData = await similarsRes.json();
  const reviewsData = await reviewsRes.json();

  const status = videoData.status === 200 || similarsData.status === 200 || reviewsData.status === 200 ? 200 : 404;

  const data = {
    videos: videoData.results,
    similars: similarsData.results,
    reviews: reviewsData.results
  };

  res.status(status).json(data);
}
