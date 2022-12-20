import Head from 'next/head';
import Image from 'next/image';

import vercelImg from '/public/vercel.svg';

const data = [
  { id: 1, title: 'Movie Title 1', genres: ['action'], year: '2020' },
  {
    id: 2,
    title: 'Movie Title 2',
    genres: ['adventure', 'action'],
    year: '2021',
  },
  {
    id: 3,
    title: 'Movie Title 3',
    genres: ['adventure', 'crime'],
    year: '2019',
  },
  {
    id: 4,
    title: 'Movie Title 4',
    genres: ['adventure', 'fantasy'],
    year: '2019',
  },
  {
    id: 5,
    title: 'Movie Title 5',
    genres: ['adventure', 'sci-fi'],
    year: '2017',
  },
  {
    id: 6,
    title: 'Movie Title 6',
    genres: ['documentary', 'biography'],
    year: '2018',
  },
  {
    id: 7,
    title: 'Movie Title 7',
    genres: ['documentary', 'biography'],
    year: '2014',
  },
  {
    id: 8,
    title: 'Movie Title 8',
    genres: ['documentary', 'biography'],
    year: '2014',
  },
  {
    id: 9,
    title: 'Movie Title 9',
    genres: ['documentary', 'biography'],
    year: '2013',
  },
  {
    id: 10,
    title: 'Movie Title 10',
    genres: ['documentary', 'biography'],
    year: '2012',
  },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen w-full bg-gray-800">
        <nav className="w-full bg-gray-900 py-2">
          <h1 className="mx-auto text-center text-emerald-500 lg:text-3xl xl:text-4xl">
            MovieRama
          </h1>
        </nav>
        <section className="mx-auto flex w-full items-end justify-center border-b border-b-emerald-900 bg-gray-900 py-5 text-center sm:py-10">
          <div className="w-full max-w-7xl px-4">
            <input
              type="text"
              placeholder="Search for a title"
              className="w-full rounded border border-emerald-300 bg-gray-700 px-4 py-2 text-lg text-emerald-300 focus:outline-none sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-1/2"
            />
          </div>
        </section>
        <section className="">
          <div
            className={`
              mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-5 bg-gray-700 p-5 pt-10
              sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
            `}
          >
            {data.map((movie) => {
              return (
                <div
                  key={movie.id}
                  className="flex min-h-min flex-col justify-between rounded border-2 border-yellow-400 bg-emerald-700"
                >
                  <Image src={vercelImg} alt="image" className="flex-grow" />
                  <div className="flex flex-wrap justify-start gap-1 p-1">
                    {movie.genres.map((g) => (
                      <span
                        key={g}
                        className="rounded border border-white p-1 font-medium text-gray-800"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="bg-yellow-300 py-2 text-center font-medium text-amber-900">
                    {movie.title} ({movie.year})
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
