'use client';

import { useCallback, useEffect } from 'react';

import Link from 'next/link';

import { Globe } from 'lucide-react';

import { Button } from '@repo/ui/button';

import { DesktopMenu } from './components/desktop-menu';
import { MobileMenu } from './components/mobile-menu';

const SCROLL_THRESHOLD = 120;

const Header = () => {
  const handleScroll = useCallback(() => {
    const header = document.getElementById('header');
    if (header && window.scrollY > SCROLL_THRESHOLD) {
      header.style.backgroundColor = 'rgba(250, 250, 249)';
      header.style.boxShadow =
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
    }

    if (header && window.scrollY <= SCROLL_THRESHOLD) {
      header.style.backgroundColor = 'transparent';
      header.style.boxShadow = 'none';
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const header = document.getElementById('header');
    if (header && window.scrollY > SCROLL_THRESHOLD) {
      header.style.backgroundColor = 'rgba(250, 250, 249)';
      header.style.boxShadow =
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
    }
  }, [handleScroll]);

  return (
    <header
      id='header'
      className='sticky top-0 z-50 w-full bg-stone-50 transition-all duration-300 ease-in-out'
    >
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-4'>
        <Link href='/' className='flex items-center gap-2 text-zinc-950'>
          <Globe className='h-6 w-6' />
          <span className='text-xl font-bold'>ImageForge</span>
        </Link>

        <DesktopMenu />

        <div className='hidden items-center space-x-4 sm:flex'>
          <Button variant='outline' size='sm' className='min-w-[120px]'>
            Sign In
          </Button>
          <Button variant='default' size='sm' className='min-w-[120px]'>
            Get Started
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
};

export { Header };
