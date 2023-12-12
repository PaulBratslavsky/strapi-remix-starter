import { useState } from "react";
import { Form, useNavigation } from "@remix-run/react";
import { ImageField } from "~/components/ImageField";
import { getStrapiMedia } from "~/utils/api-helpers";

export interface UserDataProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    bio: string;
    image: Image;
  };
}

export interface Image {
  id: number;
  url: string;
  alternativeText: null;
}

const message = null;

export default function UserProfileForm({ data }: { data: UserDataProps }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading" ? "loading" : "";

  const fullImageUrl = data.user?.image
    ? getStrapiMedia(data.user?.image?.url)
    : "https://picsum.photos/200";

  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(
    fullImageUrl || null
  );

  return (
    <div className="my-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <Form method="POST" encType="multipart/form-data">
          <fieldset
            disabled={isLoading === "loading"}
            className="grid grid-cols-2 gap-4"
          >
            {/* First row */}
            <div className="mb-4 col-span-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md text-gray-950"
                defaultValue={data.user.username}
                disabled
              />
            </div>

            <div className="mb-4 col-span-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md text-gray-950"
                defaultValue={data.user.email}
                disabled
              />
            </div>

            {/* Second row */}
            <div className="mb-4 col-span-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-1 p-2 w-full border rounded-md text-gray-950"
                defaultValue={data.user.firstName}
              />
            </div>

            <div className="mb-4 col-span-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 p-2 w-full border rounded-md text-gray-950"
                defaultValue={data.user.lastName}
              />
            </div>

            {/* Third row */}
            <div className="mb-4 col-span-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                className="mt-1 p-2 w-full border rounded-md text-gray-950"
                defaultValue={data.user.bio}
              ></textarea>
            </div>

            <div>
              <div className="my-6 flex items-center justify-center">
                <ImageField
                  name="image"
                  onFileChange={(selected) => setFile(selected)}
                  previewImage={previewImage}
                  onPreviewImageChange={setPreviewImage}
                />
                <input
                  type="text"
                  name="imageId"
                  hidden
                  defaultValue={data.user.image?.id || undefined}
                />
              </div>
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                aria-disabled={false}
                className="w-full px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900"
              >
                {isLoading ? "Loading..." : "Update Profile"}
              </button>
            </div>

            {data && (
              <div className="col-span-2">
                <p aria-live="polite" className="sr-only" role="status">
                  {message}
                </p>
                <p className="flex justify-center items-center text-purple-700 p-2">
                  {message}
                </p>
              </div>
            )}
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
