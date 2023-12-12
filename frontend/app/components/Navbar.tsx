import Logo from "./Logo";
import type { StrapiUserResponse } from "~/types";
import { Link, useLocation } from "@remix-run/react";
import { Avatar } from "~/components/Avatar";
import { Logout } from "~/routes/logout";

interface NavLinkData {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLinkData) {
  const { pathname } = useLocation();
  return (
    <li className="flex">
      <Link
        to={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 border-transparent ${
          pathname === url && "text-violet-400 border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
  user,
}: {
  links: Array<NavLinkData>;
  logoUrl: string | null;
  logoText: string | null;
  user: StrapiUserResponse | null;
}) {

  return (
    <div className="p-4 bg-gray-900 text-gray-100">
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
        </Logo>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {links.map((item: NavLinkData) => (
              <NavLink key={item.id} {...item} />
            ))}
            {user ? (
              <div className="flex items-center gap-2">
                <Avatar user={user} />
                <Logout />
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </ul>
        </div>

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
