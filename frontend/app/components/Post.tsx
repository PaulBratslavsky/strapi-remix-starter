import { formatDate, getStrapiMedia } from "~/utils/api-helpers";
import { postRenderer } from "~/utils/post-renderer";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
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
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio } =
  data.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio.data?.attributes.avatar.data.attributes.url
  );

  return (
    <article className="space-y-8 text-gray-50">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="article cover"
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-400">
          <div className="flex items-center md:space-x-2">
            {authorImgUrl && (
              <img
                src={authorImgUrl}
                alt="article cover"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full bg-gray-500 border-gray-700"
              />
            )}
            <p className="text-md text-violet-400">
              {author && author.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="text-gray-100">
        <p>{description}</p>

        {data.attributes.blocks.map((section: any, index: number) =>
          postRenderer(section, index)
        )}
      </div>
    </article>
  );
}
