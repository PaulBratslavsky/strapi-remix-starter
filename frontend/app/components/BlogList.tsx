import { Link } from "@remix-run/react";
import { getStrapiMedia, formatDate } from "~/utils/api-helpers";

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    premium: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export default function BlogList({
  data: articles,
  children,
}: {
  readonly data: Article[];
  readonly children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const imageUrl = getStrapiMedia(
            article.attributes.cover.data?.attributes.url
          );

          const category = article.attributes.category.data?.attributes;
          const authorsBio = article.attributes.authorsBio.data?.attributes;

          const avatarUrl = getStrapiMedia(
            authorsBio?.avatar?.data?.attributes.url ||
              "https://robohash.org/mail@ashallendesign.co.uk"
          );

          return (
            <Link
              to={`/blog/${category?.slug}/${article.attributes.slug}`}
              key={article.id}
              prefetch="intent"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
            >
              {imageUrl && (
                <div className="relative">
                  <img
                    alt="presentation"
                    className="object-cover w-full h-44 "
                    src={imageUrl}
                  />
                  {article.attributes.premium && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 font-bold uppercase">
                      Premium
                    </div>
                  )}
                </div>
              )}
              <div className="p-6 space-y-2 relative">
                {avatarUrl && (
                  <img
                    alt="avatar"
                    src={avatarUrl}
                    className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
                  />
                )}

                <h3 className="text-2xl text-violet-400 font-semibold group-hover:underline group-focus:underline">
                  {article.attributes.title}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {formatDate(article.attributes.publishedAt)}
                  </span>
                  {authorsBio && (
                    <span className="text-xs text-gray-400">
                      {authorsBio.name}
                    </span>
                  )}
                </div>
                <p className="py-4 text-white">
                  {article.attributes.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
