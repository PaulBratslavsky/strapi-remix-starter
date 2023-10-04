import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { fetchStrapiData } from "~/api/fetch-strapi-data.server";
import ArticleSelect from "~/components/ArticleSelect";

export async function loader({ params }: { params: { category: string } }) {
  const filter = params.category;

  const categoriesResponse = await fetchStrapiData("/categories", {
    populate: "*",
  });

  const articlesResponse = await fetchStrapiData(
    "/articles",
    filter
      ? {
          filters: {
            category: {
              name: filter,
            },
          },
        }
      : {},
  );

  return json({
    articles: articlesResponse.data,
    categories: categoriesResponse.data,
    params,
  });
}

export default function SlugRoute() {
  const data = useLoaderData();
  const { articles, categories, params } = data;
  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-2">
          <Outlet />
        </div>
        <aside>
          <ArticleSelect
            categories={categories}
            articles={articles}
            params={params}
          />
        </aside>
      </div>
    </section>
  );
}
