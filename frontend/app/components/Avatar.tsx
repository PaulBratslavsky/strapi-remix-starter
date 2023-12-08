import type { StrapiUserResponse } from "~/types";
import { getStrapiMedia } from "~/utils/api-helpers";
import { Link } from "@remix-run/react";

export const Avatar: React.FC<{ user: StrapiUserResponse }> = ({ user }) => {
  const imageUrl =
    getStrapiMedia(user.image?.url) ||
    "https://robohash.org/mail@ashallendesign.co.uk";

  return (
    <div className="flex mt-auto items-center justify-between">
      <div className="flex items-center">
        <img
          className="h-8 w-8 mr-3 rounded-full"
          src={imageUrl}
          alt={user?.image?.alternativeText || "User Avatar"}
        />
        <h5 className="leading-none font-semibold text-gray-100 hover:text-violet-400">
          <Link to="profile">{user.username}</Link>
        </h5>
      </div>
    </div>
  );
};
