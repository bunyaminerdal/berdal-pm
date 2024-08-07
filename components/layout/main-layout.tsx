import { currentUser } from '@/lib/auth';
import { ExtendedUser } from '@/next-auth';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import Navbar from './navbar';

const MainLayout = async ({ children }: PropsWithChildren) => {
  const user = await currentUser();
  return (
    <div className='flex h-full w-full flex-col'>
      <Navbar user={user as ExtendedUser} />
      <main className='flex w-full min-w-[300px] flex-1 overflow-hidden'>
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
