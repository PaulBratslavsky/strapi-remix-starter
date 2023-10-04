import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { logout } from "~/utils/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  return logout(request);
};

export const loader = async () => {
  return redirect("/");
};

export function Logout() {
  return (
    <div className="hidden md:flex md:items-center md:space-x-6">
      <Form method="post" action="/logout">
        <button type="submit">
          <span className="cursor-pointer hover:text-fuchsia-400">Logout</span> &nbsp;
          <span aria-hidden="true">&rarr;</span>
        </button>
      </Form>
    </div>
  );
}
