import { FormSubmit } from "~/routes/api.join-form";

import {
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>hey</h1>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h2>hey</h2>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}


interface EmailProps {
  id: string;
  __component: string;
  title: string;
  description: string;
  emailPlaceholder: string;
  submitButton: {
    text: string;
  };
}

export default function Email({ data, children }: { data: EmailProps, children?: React.ReactNode }) {

  return (
    <section className="py-6 dark:bg-gray-900 dark:text-gray-50">
      <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-none">{data.title}</h1>
          <p className="text-lg">{data.description}</p>
        </div>
        <FormSubmit placeholder={data.emailPlaceholder} text={data.submitButton.text}>
          {children}
        </FormSubmit>
      </div>
    </section>
  );
}
