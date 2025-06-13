import Link from 'next/link';

import { Globe } from 'lucide-react';

const footerMenu = {
  product: [
    {
      title: 'Features',
      href: '/features',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'Changelog',
      href: '/changelog',
    },
    {
      title: 'Roadmap',
      href: '/roadmap',
    },
  ],
  resources: [
    {
      title: 'Documentation',
      href: '/documentation',
    },
    {
      title: 'API Reference',
      href: '/api-reference',
    },
    {
      title: 'Exemples',
      href: '/examples',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
  ],
  company: [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
    {
      title: 'Privacy',
      href: '/privacy',
    },
    {
      title: 'Terms',
      href: '/terms',
    },
  ],
};

const Footer = () => {
  const getCategoryName = (category: string) =>
    category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');

  return (
    <footer className='mx-auto flex w-full max-w-7xl flex-col space-y-8 bg-stone-50 p-8 text-stone-950'>
      <div className='flex flex-row flex-wrap items-start justify-between gap-8 md:flex-nowrap md:gap-0'>
        {Object.entries(footerMenu).map(([category, items]) => (
          <div key={category}>
            <h3 className='mb-4 text-lg font-semibold'>{getCategoryName(category)}</h3>
            <ul className='space-y-2'>
              {items.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className='text-sm text-stone-600 hover:text-stone-950'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className='flex max-w-[300px] flex-col flex-wrap items-start space-y-2'>
          <Link href='/' className='space-2 flex items-center text-stone-950'>
            <Globe className='h-6 w-6' />
            <span className='text-xl font-bold'>ImageForge</span>
          </Link>
          <span className='text-sm text-stone-600'>
            Powerfull image processing tools for modern web application
          </span>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center space-y-6'>
        <hr className='flex h-[0.5px] w-full bg-stone-300' />
        <span className='text-sm text-stone-600'>© 2025 ImageForge. All rights reserved.</span>
      </div>
    </footer>
  );
};
export { Footer };
