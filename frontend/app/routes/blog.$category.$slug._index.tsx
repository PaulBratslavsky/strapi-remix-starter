import { json } from "@remix-run/node";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";
import { useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";

export async function loader({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const token = process.env.REMIX_PUBLIC_STRAPI_API_TOKEN;
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
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchStrapiData(path, urlParamsObject, options);
  return json({ ...response });
}

export default function PostRoute() {
  const data = useLoaderData();
  if (data.data?.length === 0) return <h2>no post found</h2>;
  return <Post data={data.data[0]} />;
}
