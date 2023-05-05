import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData as useLoaderDataGlobal } from "@remix-run/react";
import { getStrapiMedia } from "./utils/api-helpers";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Banner from "~/components/Banner";

import stylesheet from "~/tailwind.css";
import { getEnv } from "./env.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader() {
  const token = process.env.REMIX_PUBLIC_STRAPI_API_TOKEN;
  const path = `/global`;

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
  };

  //TODO: Figure out how to type this
  interface GlobalResponse {
    ENV: any;
  }

  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchStrapiData(path, urlParamsObject, options);
  return json<GlobalResponse>({
    ...response,
    ENV: getEnv(),
  });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function App() {
  const data = useLoaderDataGlobal();
  const { notificationBanner, navbar, footer } = data.data.attributes;
  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );
  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="bg-gray-900 min-h-screen">
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />
        <Outlet />
        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
        <Banner data={notificationBanner} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
