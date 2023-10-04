import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUserData } from "~/utils/session.server";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";
import { useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const slug = params.slug;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      authorsBio: { populate: "*" },
      category: { fields: ["name"] },
      blocks: { populate: "*" },
    },
  };

  const user = await getUserData(request);
  const response = await fetchStrapiData(path, urlParamsObject, user ? user.jwt : null);
  return json({ ...response });
}

export default function PostRoute() {
  const data = useLoaderData<typeof loader>();
  if (data.data?.length === 0) return <h2>no post found</h2>;
  return <Post data={data.data[0]} />;
}
