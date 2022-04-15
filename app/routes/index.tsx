import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 h-96">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl  h-96">
            <div className="absolute inset-0 h-full">
              <img
                className="h-full w-full object-cover"
                src="/assets/gotcha.gif"
                alt="Sonic Youth On Stage"
              />
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 flex flex-col align-center">
          <span className="text-center">Im a bad person and Ive stolen all your data now</span>
          <br />
          <span className="italic text-center">JUST KIDDING</span>
          <br />
          <span className="text-center">You were part of a social experiment proving that people will scan any QR code if given the chance.</span>
          <br />
          <span className="text-center">Please stop, thats dumb, dont be dumb. Cause being dumb is stupid.</span>
        </div>
      </div>
    </main>
  );
}
