import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";
import { sectionRenderer } from "~/utils/section-renderer";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export async function loader() {
  const path = `/pages`;
  const slug = "home";
  const urlParamsObject = { filters: { slug } };
  const response = await fetchStrapiData(path, urlParamsObject);
  return response;
}

export default function RootRoute() {
  const page = useLoaderData<typeof loader>();
  if (page.data.length === 0) return <div className="container mx-auto p-8 text-white">Please publish your first page from Strapi Admin</div>;
  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
