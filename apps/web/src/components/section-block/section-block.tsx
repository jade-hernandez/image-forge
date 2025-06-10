import { cn } from '@repo/ui';

import { lineBreaker } from '@/lib/utils/formatter';

/*
 * Given a heading string received by the SectionBlock component,
 * if this string contains a "{br}", we replace it with a <br /> tag.
 * This allows us to have line breaks in the heading text.
 * Example: "Everything You Need{br} for Image Processing"
 * will be rendered as:
 * "Everything You Need
 * for Image Processing"
 */

// const lineBreaker = (heading: string) => {
//   if (!heading) return null;
//   const parts = heading.split("{br}"); // at this point, we have an array of strings, i.e [part1, part2]
//   return Object.entries(parts).map(([key, part], index) => (
//     <span key={key}>
//       {part}
//       {index < parts.length - 1 && <br />}
//     </span>
//   ));
// }

const SectionBlock = ({
  heading,
  headingColor = 'text-zinc-950',
  backgroundColor,
  children,
}: {
  heading?: string | React.ReactNode;
  headingColor?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      className={cn(
        'mx-auto flex h-fit w-full flex-col items-center justify-center px-4 py-24 md:px-8',
        backgroundColor
      )}
    >
      {heading ? (
        <h2 className={cn('mb-12 text-center text-3xl font-bold md:text-4xl', headingColor)}>
          {typeof heading === 'string' ? lineBreaker(heading) : heading}
        </h2>
      ) : null}
      {children}
    </section>
  );
};

export { SectionBlock };
