import type { LoaderFunction } from '@remix-run/node';
import type { GifsResult } from '@giphy/js-fetch-api';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

const SEARCH_TERM = 'gotcha';


type LoaderData = {
  gifs: GifsResult;
};

export const loader: LoaderFunction = async ({ request }) => {
  invariant(process.env.GIPHY_API_KEY, 'GIPHY_API_KEY is required');

  const gf = new GiphyFetch(process.env.GIPHY_API_KEY);
  const gifs = await gf.search(SEARCH_TERM, { rating: 'g', limit: 20 });

  return json<LoaderData>({ gifs });
};

export default function Index() {
  const { gifs } = useLoaderData() as LoaderData;
  const randomInt = Math.floor(Math.random() * gifs.data.length);
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <img
              className="h-full w-full object-cover"
              src={gifs.data[randomInt].images.original.url}
              alt="Sonic Youth On Stage"
            />
            <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 flex flex-col align-center">
          <span className="text-center">I'm a bad person and I've stolen all your data now.</span>
          <br />
          <span className="italic text-center">JUST KIDDING!</span>
          <br />
          <span className="text-center">You were part of a social experiment proving that people will scan any QR code if given the chance.</span>
          <br />
          <span className="text-center">Please stop, thats dumb, don't be dumb. Cause being dumb is stupid.</span>
          <br />
          <span className="text-center">Anyone can create a QR code and put it anywhere you want.</span>
        </div>
      </div>
    </main>
  );
}
