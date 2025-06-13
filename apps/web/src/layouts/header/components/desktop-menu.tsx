import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@repo/ui/navigation-menu';

import { NavListItem } from './nav-list-item';

const navigationElements = ['Features', 'Pricing', 'Docs', 'Blog']; // Array - [0 -> 'Features', 1 -> 'Pricing', 2 -> 'Docs', 3 -> 'Blog']
// const navigationElementsObject = {
//   Features: 'Features',
//   Pricing: 'Pricing',
//   Docs: 'Docs',
//   Blog: 'Blog',
// }; // Object - Xnuf3080fhihs: { Features: 'Features', Pricing: 'Pricing', Docs: 'Docs', Blog: 'Blog' } -> This object is stored in memory with a unique reference in memory.

const DesktopMenu = () => {
  return (
    <NavigationMenu className='hidden lg:flex'>
      <NavigationMenuList>
        {Object.entries(navigationElements).map(([key, element]) => (
          <NavigationMenuItem key={key}>
            <NavigationMenuTrigger className='bg-stone-50 text-sm font-medium hover:bg-stone-50'>
              {element}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <GoodSubMenuElementToKeep />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { DesktopMenu };

// Mocked sub-menu element to keep the structure similar to the original code
/////////////////////////////////////////////////////////////////////////////

const GoodSubMenuElementToKeep = () => (
  <ul className='flex size-fit min-w-[520px] gap-3 px-4 py-8'>
    <li>
      <NavigationMenuLink asChild className='w-full max-w-[180px]'>
        <a
          className='bg-linear-to-b outline-hidden flex h-full w-full select-none flex-col justify-center rounded-md from-muted/50 to-muted p-2 no-underline focus:shadow-md'
          href='/'
        >
          <div className='mb-2 mt-4 text-lg font-medium'>shadcn/ui</div>
          <p className='text-sm leading-tight text-muted-foreground'>
            Beautifully designed components built with Tailwind CSS.
          </p>
        </a>
      </NavigationMenuLink>
    </li>
    <div aria-hidden className='mx-2 min-h-[160px] border-l border-stone-700'></div>
    <div aria-hidden className='flex flex-col items-start justify-center gap-3'>
      <NavListItem href='/docs' title='Introduction'>
        Re-usable components built using Radix UI and Tailwind CSS.
      </NavListItem>
      <NavListItem href='/docs/installation' title='Installation'>
        How to install dependencies and structure your app.
      </NavListItem>
      <NavListItem href='/docs/primitives/typography' title='Typography'>
        Styles for headings, paragraphs, lists...etc
      </NavListItem>
    </div>
  </ul>
);
