export const lineBreaker = (heading: string) => {
  if (!heading) return null;

  const parts = heading.split('{br}'); // at this point, we have an array of strings, i.e [part1, part2]

  return Object.entries(parts).map(([key, part], index) => (
    <span key={key}>
      {part}
      {index < parts.length - 1 && <br />}
    </span>
  ));
};
