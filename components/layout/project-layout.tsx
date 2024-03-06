import React, { PropsWithChildren } from 'react';
import ProjectSideBar from '../project/ProjectSideBar';
import { Droppable } from '../dnd/Droppable';
import DndContextProvider from '../dnd/DndContextProvider';
import ProjectMainBar from '../project/ProjectMainBar';

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
