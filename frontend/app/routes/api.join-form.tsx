import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { submitJoinForm } from "~/api/form.server";
import type { FC } from "react";

export async function action({ request }: { request: Request }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formData = await request.formData();
  const email = formData.get("email");

  if (!email) return json({ error: "Missing email" });

  if (!emailRegex.test(formData.get("email") as string))
    return json({ error: "Invalid email" });

  const formBody = { data: { email: formData.get("email") } };

  const response = await submitJoinForm(
    formBody as { data: { email: string } }
  );

  if (response.status !== 200) return json({ error: response.statusText });
  const data = await response.json();
  return json({ data: data });
}

// TODO: TYPE STRAPI FORM RESPONSE AND PASS TO USE FETCHER
// NOTE: PASS TYPES VIA GENERICS WHEN USING REACT COMPONENTS
const FormSubmit: FC<{
  placeholder: string;
  text: string;
}> = ({ placeholder, text }) => {
  const fetcher = useFetcher();

  if (fetcher.data && !fetcher.data.error) {
    return (
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold mb-4 text-pink-500">Thank You!</h1>
        <p className="text-gray-500 text-lg">
          We appreciate your interest in our community. We'll be in touch soon!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-end">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <fetcher.Form method="post" action="/api/join-form">
            <input
              name={"email"}
              type="text"
              placeholder={placeholder}
              className={"w-3/5 p-3 rounded-l-lg sm:w-2/3 text-gray-700"}
            />
            <button
              type="submit"
              className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-violet-400 text-gray-900"
            >
              {text}
            </button>
            {fetcher.data?.error && (
              <p className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2">
                {fetcher.data.error}
              </p>
            )}
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
};


export default FormSubmit;