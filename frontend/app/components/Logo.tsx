import React from "react";
import { Link } from "@remix-run/react";

export default function Logo({
  src,
  children,
}: {
  src: string | null;
  children?: React.ReactNode;
}) {
  return (
    <Link
      to="/"
      aria-label="Back to homepage"
      className="flex items-center p-2"
    >
      {src && <img src={src} alt="logo" width={45} height={45} />}
      <div className="ml-2">{children}</div>
    </Link>
  );
}
