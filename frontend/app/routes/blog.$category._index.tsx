import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserData } from "~/utils/session.server";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";

import BlogList from "~/components/BlogList";
import PageHeader from "~/components/PageHeader";

export async function loader({ params, request }: LoaderFunctionArgs) {
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

  const user = await getUserData(request);
  const response = await fetchStrapiData(path, urlParamsObject, user ? user.jwt : null);
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
