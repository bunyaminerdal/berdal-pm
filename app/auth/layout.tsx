import React, { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className='flex w-full min-w-80 flex-1 flex-col items-center justify-center'>
      <div className='w-full flex-1 overflow-auto  p-5 md:flex'>
        <div className='flex w-full flex-col items-center gap-2 md:flex-1'>
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
