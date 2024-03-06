import { PropsWithChildren } from 'react';
import Navbar from './navbar';
import { Toaster } from 'sonner';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-full w-full flex-col '>
      <Navbar />
      <main className='flex w-full min-w-[300px] flex-1 overflow-hidden'>
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
