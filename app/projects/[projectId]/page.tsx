import ItemItem from '@/components/Item';
import { Droppable } from '@/components/dnd/Droppable';
import ProjectMainBar from '@/components/project/ProjectMainBar';
import ProjectSideBar from '@/components/project/ProjectSideBar';
import { getItemsByOwnerId } from '@/data/project/items';
import { ItemTypeMap, OwnerTypeMap } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react';

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const items = await getItemsByOwnerId(params.projectId, OwnerTypeMap.PROJECT);
  if (items === null) return redirect(`/projects`);

  return (
    <>
      <ProjectMainBar projectId={params.projectId} containerId={''} />
      <ProjectSideBar />
      <Droppable
        id={params.projectId}
        type={OwnerTypeMap.PROJECT}
        allowableItemTypes={[ItemTypeMap.TEXT]}
      >
        <div className='relative'>
          {items?.map((item) => <ItemItem key={item.id} item={item} />)}
        </div>
      </Droppable>
    </>
  );
};

export default ProjectPage;
