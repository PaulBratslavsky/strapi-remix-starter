import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
  json,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userme } from "~/api/auth/userme.server";
import PageHeader from "~/components/PageHeader";
import UserProfileForm from "~/components/UserProfileForm";
import { getUserData } from "~/utils/session.server";
import { updateProfile } from "~/api/update-user-profile.server";
import { uploadImage } from "~/api/upload-image.server";

import { deleteImage as deleteOldImage } from "~/api/delete-image.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  if (!user) return redirect("/login");
  return json({ user });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await getUserData(request);
  let formData;

  const isMultipart = request.headers
    .get("Content-Type")
    ?.includes("multipart");

  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 500_000_000,
  });

  if (isMultipart) {
    formData = await unstable_parseMultipartFormData(request, uploadHandler);
  } else {
    formData = await request.formData();
  }

  const formItems = Object.fromEntries(formData);
  const { image, imageId, ...items } = formItems;

  const imageResponse = await uploadImage(image, user.jwt);
  const newImageId = imageResponse[0]?.id || null;

  const updateResponse = await updateProfile(
    items,
    newImageId,
    user.user.id,
    user.jwt
  );

  if (newImageId) await deleteOldImage(imageId as string, user.jwt);

  console.dir(updateResponse, "####################################");
  return json({ message: "Profile updated" });
}

export default function ProfileRoute() {

  const loaderData = useLoaderData<typeof loader>();

  return (
    <div>
      <PageHeader heading="Profile" text="User Details" />
      <UserProfileForm data={loaderData as any} />
    </div>
  );
}
