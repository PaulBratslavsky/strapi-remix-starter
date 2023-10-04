import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PageHeader from "~/components/PageHeader";
import BlogList from "~/components/BlogList";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";
import { getUserData } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs ) {
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

  const user = await getUserData(request);
  const response = await fetchStrapiData(path, urlParamsObject, user ? user.jwt : null);
  return json(response);
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
