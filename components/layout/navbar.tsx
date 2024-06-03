'use client';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaFolder, FaHome } from 'react-icons/fa';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import { UserButton } from '../auth/user-button';

const MenuItems = () => {
  return <div></div>;
};
const HamburgerMenuItems = ({
  setOpen,
  isNavbar = false,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<'closed' | 'open'>>;
  isNavbar?: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className='flex h-full w-full flex-col justify-between align-middle md:flex-row'>
      <div className='block md:flex'>
        <Button
          variant={
            pathname === '/' && !isNavbar
              ? 'default'
              : isNavbar
                ? 'ghost'
                : 'outline'
          }
          className={cn(
            'm-1 flex flex-grow md:rounded-none',
            pathname === '/' && isNavbar
              ? 'border-b-4 border-primary-foreground'
              : ''
          )}
          asChild
          onClick={() => setOpen?.('closed')}
        >
          <Link href='/' className='flex gap-2'>
            <FaHome />
            Home
          </Link>
        </Button>
        <Button
          variant={
            pathname === '/projects' && !isNavbar
              ? 'default'
              : isNavbar
                ? 'ghost'
                : 'outline'
          }
          className={cn(
            'm-1 flex flex-grow md:rounded-none',
            pathname === '/projects' && isNavbar
              ? 'border-b-4 border-primary-foreground'
              : ''
          )}
          asChild
          onClick={() => setOpen?.('closed')}
        >
          <Link href='/projects' className='flex gap-2'>
            <FaFolder />
            Projects
          </Link>
        </Button>
      </div>
      <div className='flex flex-col md:flex-row'>
        <UserButton setOpen={setOpen} className='m-1 rounded-md shadow' />
        <ModeToggle
          className='m-1 rounded-md shadow'
          size={isNavbar ? 'icon' : 'default'}
        />
      </div>
    </div>
  );
};
const Sidebar = () => {
  const [open, setOpen] = useState<'closed' | 'open'>('closed');
  return (
    <div className='w-full bg-primary'>
      <div className='hidden h-12 w-full self-center border-r md:flex'>
        <p className='flex-shrink-0 self-center p-2 font-semibold'>
          Bünyamin Erdal
        </p>
        <HamburgerMenuItems isNavbar />
      </div>
      <div className='flex h-12 w-full items-center justify-between border p-4 md:hidden'>
        <p className='flex-shrink-0 self-center p-2 font-semibold'>
          Bünyamin Erdal
        </p>
        <Button
          variant='ghost'
          size='icon'
          className='p-1'
          onClick={() => setOpen(open === 'open' ? 'closed' : 'open')}
          name='hamburger-menu-button'
          title='Menu'
        >
          <RxHamburgerMenu
            data-state={open}
            className='h-8 w-8 data-[state=open]:sr-only'
          />
          <RxCross1
            data-state={open}
            className='h-8 w-8 data-[state=closed]:sr-only'
          />
        </Button>
        <div
          data-state={open}
          className='fixed inset-x-0 inset-y-12 z-50 h-full bg-background pb-12 transition ease-in-out data-[state=closed]:sr-only data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
        >
          <HamburgerMenuItems setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
