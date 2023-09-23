import { useLoaderData } from "@remix-run/react";
import PageHeader from "~/components/PageHeader";
import BlogList from "~/components/BlogList";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";

export async function loader() {
  const token = process.env.REMIX_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: {
      cover: { fields: ["url"] },
      category: { populate: "*" },
      authorsBio: {
        populate: "*",
      },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchStrapiData(path, urlParamsObject, options);
  return response;
}

export default function BlogRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <PageHeader heading="Our Blog" text="Checkout Something Cool" />
      <BlogList data={data.data} />
    </div>
  );
}
