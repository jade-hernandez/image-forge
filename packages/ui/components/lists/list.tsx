import { cn } from "../../lib/utils";
import { ListItem } from "./list-item";

export interface IListProps {
  items: string[];
  className?: string;
}

const List = ({ items, className }: IListProps) => (
  <div className={cn("flex flex-col gap-3", className)}>
    {Object.entries(items).map(([key, item]) => (
      <ListItem key={key} text={item} />
    ))}
  </div>
);

export { List };
