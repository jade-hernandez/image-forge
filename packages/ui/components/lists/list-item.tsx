import { Zap } from "lucide-react";
import { cn } from "../../lib/utils";

export interface IListItemProps {
  text: string;
  // icon?: React.ReactNode;
  size?: number;
  className?: string;
}

const ListItem = ({
  text,
  // icon,
  size = 4,
  className,
}: IListItemProps) => {
  // if (!icon) {
  //   return (
  //     <div className={cn("flex items-center", className)}>
  //       <span className="pl-2 text-base text-muted-foreground text-neutral-950 dark:text-neutral-50">
  //         {text}
  //       </span>
  //     </div>
  //   );
  // }

  // // Clone the icon element and add the size class
  // const clonedIcon = React.cloneElement(icon as React.ReactElement<any>, {
  //   className: `h-${size} w-${size} text-neutral-950 dark:text-neutral-50`,
  // });

  return (
    <div className={cn("flex items-center", className)}>
      {/* {clonedIcon} */}
      <Zap
        className={`h-${size} w-${size} text-neutral-950 dark:text-neutral-50`}
      />
      <span className="pl-2 text-base text-muted-foreground text-neutral-950 dark:text-neutral-50">
        {text}
      </span>
    </div>
  );
}


export { ListItem };
