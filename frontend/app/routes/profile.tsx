import { type LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userme } from "~/api/auth/userme.server";
import PageHeader from "~/components/PageHeader";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  if (!user) return redirect("/login");
  return json({ user });
}

export default function ProfileRoute() {
  const user = useLoaderData<typeof loader>();
  console.log(user);

  return (
    <div>
      <PageHeader heading="Profile" text="User Details" />
      
    </div>
  );
}
