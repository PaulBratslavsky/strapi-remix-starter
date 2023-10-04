import { Form, Link } from "@remix-run/react";
import { SubmitButton } from "~/components/SubmitButton";

export const LoginForm: React.FC<{
  data: { message: string };
}> = ({ data }) => {
  return (
    <div className="my-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <Form method="post">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="identifier"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              className="mt-1 p-2 w-full border rounded-md text-gray-950"
              autoComplete="username"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md text-gray-950"
              autoComplete="current-password"
            />
          </div>
          <SubmitButton text="Login" />
          <Link
            to="/register"
            className="my-2 block text-gray-600 hover:underline"
          >
            Don't have account.
          </Link>
          {data && (
            <div>
              <p aria-live="polite" className="sr-only" role="status">
                {data.message}
              </p>
              <p className="flex justify-center items-center text-purple-700 p-2">
                {data.message}
              </p>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
