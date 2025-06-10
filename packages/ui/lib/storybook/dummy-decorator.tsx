import React from "react";
import { cn } from "../utils";

function DummyDecorator({
  Story,
  className,
}: {
  Story: React.ReactNode;
  className?: string;
}) {
  const storybookRoot = document.getElementById("storybook-root");

  if (storybookRoot) storybookRoot.style.padding = "0";

  return (
    <div
      className={cn(
        // "flex justify-center min-full w-[calc(100vw-2rem)] lg:max-w-[960px]",
        // "flex justify-center min-full px-4 w-[100vw] lg:max-w-[960px] items-center",
        "flex justify-center px-4 w-[100vw] md:max-w-xl lg:max-w-[960px] items-center",
        className
      )}
    >
      {Story}
    </div>
  );
}

export { DummyDecorator };
