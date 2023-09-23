import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";
import BlogList from "~/components/BlogList";
import PageHeader from "~/components/PageHeader";

export async function loader({ params }: { params: { category: string } }) {
  const token = process.env.REMIX_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    filters: {
      category: {
        slug: params.category,
      },
    },
    populate: {
      cover: { fields: ["url"] },
      category: {
        populate: "*",
      },
      authorsBio: {
        populate: "*",
      },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchStrapiData(path, urlParamsObject, options);
  return json({ ...response, category: params.category });
}

export default function CategoryPostsRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <PageHeader heading={data.category} text="Checkout Something Cool" />
      <BlogList data={data.data} />
    </div>
  );
}
