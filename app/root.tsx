import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { createUserSession, getSession, getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "It's a trap!",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};


export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const location = url.searchParams.get("location");
  const session = await getSession(request);

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return json<LoaderData>({
      user: await getUser(request),
    });
  }

  const { user, headers } = await createUserSession(request, location ?? "")

  return json<LoaderData>({ user }, { headers });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />

      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
