import { type LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userme } from "~/api/auth/userme.server";
import PageHeader from "~/components/PageHeader";
import UserProfileForm from "~/components/UserProfileForm";
import UserProfileImageForm from "~/components/UserProfileImageForm";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  if (!user) return redirect("/login");
  return json({ user });
}

export default function ProfileRoute() {
  const loaderData = useLoaderData<typeof loader>();

  console.log(loaderData);

  return (
    <div>
      <PageHeader heading="Profile" text="User Details" />
      <UserProfileForm data={loaderData as any} />
    </div>
  );
}
