import {
  type LoaderFunctionArgs,
  redirect,
  json,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
  ActionFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userme } from "~/api/auth/userme.server";
import PageHeader from "~/components/PageHeader";
import UserProfileForm from "~/components/UserProfileForm";
import { updateProfile } from "~/api/update-user-profile.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  if (!user) return redirect("/login");
  return json({ user });
}

export async function action({ request }: ActionFunctionArgs ) {
  return json({ message: "Profile updated successfully" });
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
