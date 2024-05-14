import React, { PropsWithChildren } from 'react';
import DndContextProvider from '../dnd/DndContextProvider';

const ProjectLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DndContextProvider>
        <section className='flex h-full w-full overflow-auto'>
          {children}
        </section>
      </DndContextProvider>
    </>
  );
};

export default ProjectLayout;
