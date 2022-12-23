import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import type { Movie } from '../../pages/api/now_playing';
import { GENRE } from '../../pages/api/genres';

type MovieCardProps = {
  movie: Movie;
  genres: GENRE[];
};

const MovieCard = ({ movie, genres }: MovieCardProps) => {
  return (
    <div
      key={movie.id}
      className="relative flex flex-col justify-between rounded border-2 border-emerald-400 bg-emerald-700"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        width={720}
        height={300}
        alt="movie image"
      />
      <div className="absolute top-0 left-0 right-0 flex flex-wrap justify-start gap-1 p-1">
        {movie.genre_ids.map((g) => (
          <span
            key={g}
            className="rounded border border-emerald-400 bg-emerald-300 bg-opacity-100 p-1 text-sm font-semibold text-gray-800"
          >
            {genres?.filter((gen) => gen.id === g)[0]?.name}
          </span>
        ))}
      </div>
      <div className="bg-emerald-500 py-1 text-center text-base text-gray-900">
        <span className="">
          {new Date(movie.release_date).toLocaleDateString()}
        </span>
        <br />
        <span className="font-semibold">{movie.title}</span>
      </div>
    </div>
  );
};

export default MovieCard;
