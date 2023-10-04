import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { StrapiErrorResponse } from "~/types";

import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { LoginForm } from "~/components/LoginForm";
import { login } from "~/api/auth/login.server";
import { getUserData } from "~/utils/session.server";

export async function loader({ request } : LoaderFunctionArgs) {
  const user = await getUserData(request);
  if (user) return redirect("/blog");
  return null;
} 

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = {
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  };

  const errors = {
    username: data.identifier ? null : "Username/Email is required",
    password: data.password ? null : "Password is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) return json({ message: "Please complete all the fields."});
  const response = await login("/blog", data) as StrapiErrorResponse;
  if (response.error) return json({ message: response.error.message });
  return response;
}

const RegisterRoute: React.FC = () => {
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  return <LoginForm data={ loaderData || actionData} />;
};

export default RegisterRoute;