import * as React from "react";
import { renderers, parse, transform } from "@markdoc/markdoc";

// TODO: FIGURE OUT TYPES FOR MARKDOC

export function markdown(markdown: any, config: any) {
  return transform(parse(markdown, config));
}

export default function Markdown({
  data,
  config = {},
}: {
  data: {
    body: string;
  };
  config?: any;
}) {
  return (
    <div className="rich-text py-6 bg-gray-900 text-gray-50 ">
      {renderers.react(markdown(data.body, config), React)}
    </div>
  );
}
