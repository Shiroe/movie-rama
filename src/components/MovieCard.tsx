import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star } from 'tabler-icons-react';

import type { Movie } from '../../pages/api/movies';
import type {
  MOVIE_RESPONSE,
  MOVIE_RESPONSE_ERROR,
} from '../../pages/api/movie';
import { GENRE } from '../../pages/api/genres';
import { useQuery } from 'react-query';

type MovieCardProps = {
  movie: Movie;
  genres: GENRE[];
  isExpanded?: boolean;
  onClick: (movieId: number) => void;
};

type FETCH_PARAMS = {
  id: number;
};

const fetcher = async (url: string, params: FETCH_PARAMS) => {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
  }).then((res) => res.json());
};

const MovieCard = ({
  movie,
  genres,
  isExpanded = false,
  onClick,
}: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<MOVIE_RESPONSE>();

  const { isLoading, error, data } = useQuery(
    ['movie', movie.id],
    () => fetcher('api/movie', { id: movie.id }),
    {
      onSuccess: (data: MOVIE_RESPONSE) => {
        console.log('MOVIE DATA: ', data);
        setMovieDetails(data);
      },
    }
  );

  return (
    <td
      key={movie.id}
      onClick={() => onClick(movie.id)}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex rounded border-2 border-emerald-400 bg-emerald-700 ${
        isExpanded
          ? 'col-span-1 row-span-2 cursor-zoom-out flex-row md:col-span-2 lg:col-span-3 xl:col-span-4'
          : 'cursor-zoom-in flex-col justify-between'
      }`}
    >
      <Image
        className=""
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        width={420}
        height={300}
        alt="movie image"
      />
      {isHovered && !isExpanded && (
        <div className="absolute bottom-11 left-0 right-0 bg-black bg-opacity-90 p-1">
          <p className="font-base text-justify text-base text-gray-100">
            {movie.overview}
          </p>
        </div>
      )}
      <div
        className={`absolute top-0 left-0 ${
          isExpanded ? 'w-auto' : 'right-0'
        } flex flex-wrap justify-start gap-1 bg-black bg-opacity-20 p-1`}
      >
        {movie.genre_ids.map((g) => (
          <span
            key={g}
            className="rounded border border-emerald-400 bg-emerald-300 bg-opacity-100 p-1 text-sm font-semibold text-gray-800"
          >
            {genres?.filter((gen) => gen.id === g)[0]?.name}
          </span>
        ))}
        <div className="flex flex-grow items-center justify-end">
          <Star color="rgb(253,224,71)" />
          <span>({movie.vote_average})</span>
        </div>
      </div>
      <div
        className={`${
          isExpanded
            ? 'mx-auto items-center justify-between px-5 py-1'
            : 'bg-emerald-500 py-1'
        } text-center text-base text-gray-900`}
      >
        <span className={`${isExpanded ? 'text-white' : ''}`}>
          {new Date(movie.release_date).toLocaleDateString()}
        </span>
        <br />
        <span
          className={`font-semibold ${
            isExpanded ? 'text-xl text-white' : 'text-base'
          }`}
        >
          {movie.title}
        </span>
        {isExpanded && (
          <div className="mt-5">
            <p className="rounded border-2 border-emerald-500 bg-emerald-600 p-2 text-white">
              {movie.overview}
            </p>
            {movieDetails && movieDetails!.videos[0] && (
              <iframe
                className="mx-auto my-5"
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${
                  movieDetails!.videos[0]?.key
                }?autoplay=0&origin=http://example.com&controls=0&rel=1`}
              ></iframe>
            )}
            <div className="flex flex-wrap items-center justify-around">
              {movieDetails?.reviews.slice(0, 4).map((rev) => (
                <div
                  key={rev.id}
                  className="w-52 rounded border border-emerald-500 bg-emerald-600"
                >
                  <span className="border-b border-b-emerald-900 font-semibold">
                    {rev.author}
                  </span>
                  <p className="flex h-20 w-48 flex-wrap overflow-clip p-1 text-white">
                    {rev.content}
                  </p>
                  <a
                    href={rev.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1"
                  >
                    Read full review
                  </a>
                </div>
              ))}
            </div>
            <h4 className="my-5 text-lg text-white">Similar Movies</h4>
            <div className="flex flex-wrap items-center justify-around pb-5">
              {movieDetails?.similars.slice(0, 9).map((sim) => (
                <div
                  key={sim.id}
                  className="border-2 border-emerald-500 bg-emerald-600"
                >
                  <Image
                    width={90}
                    height={160}
                    src={`https://image.tmdb.org/t/p/w500${sim.poster_path}`}
                    alt="similar movie image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </td>
  );
};

export default MovieCard;
