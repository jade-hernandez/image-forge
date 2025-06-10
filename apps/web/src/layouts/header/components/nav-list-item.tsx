import Link from 'next/link';

import { NavigationMenuLink } from '@repo/ui/navigation-menu';

const NavListItem = ({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) => {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export { NavListItem };
