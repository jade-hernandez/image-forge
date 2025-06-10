import React, { JSX } from "react";

function GlobalDecorator(storyFn: () => JSX.Element) {
  return <div className="size-full min-h-fit py-8">{storyFn()}</div>;
}

export { GlobalDecorator };
