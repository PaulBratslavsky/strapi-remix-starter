import type { StrapiUserResponse } from "~/types";

export const Avatar: React.FC<{ user: StrapiUserResponse}> = ({ user }) => {
  return (
    <div className="flex mt-auto items-center justify-between">
      <div className="flex items-center">
        <img
          className="h-8 w-8 mr-3 rounded-full"
          src="https://robohash.org/mail@ashallendesign.co.uk"
          alt=""
        />
        <h5 className="leading-none font-semibold text-gray-100">{user.user.username}</h5>
      </div>
    </div>
  );
};
