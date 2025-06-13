'use client';

import { useState } from 'react';

import { Menu } from 'lucide-react';

import { Button } from '@repo/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/sheet';

const menuItems = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Documentation', href: '#documentation' },
  { label: 'Blog', href: '#blog' },
];

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='lg:hidden'>
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='h-full min-w-[320px] p-8 sm:w-[480px]'>
        <SheetHeader className='p-0 text-start'>
          <SheetTitle className='mb-2 text-2xl font-bold text-stone-900'>Menu</SheetTitle>
        </SheetHeader>
        <div className='flex h-full max-h-[calc(100dvh-104px)] flex-col justify-between'>
          <nav className='flex flex-col space-y-6 pt-4'>
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleLinkClick}
                className='text-lg font-medium text-stone-900 hover:text-stone-600'
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className='flex flex-col space-y-3'>
            <Button variant='outline' className='w-full justify-center' onClick={handleLinkClick}>
              Sign In
            </Button>
            <Button variant='default' className='w-full justify-center' onClick={handleLinkClick}>
              Get Started
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };
