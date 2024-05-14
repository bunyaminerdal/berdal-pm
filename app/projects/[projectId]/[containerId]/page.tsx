import ItemItem from '@/components/Item';
import { Droppable } from '@/components/dnd/Droppable';
import ProjectMainBar from '@/components/project/ProjectMainBar';
import ProjectSideBar from '@/components/project/ProjectSideBar';
import { getItemsByOwnerId } from '@/data/project/items';
import { OwnerTypeMap } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react';

const ContainerPage = async ({
  params,
}: {
  params: { containerId: string; projectId: string };
}) => {
  const items = await getItemsByOwnerId(
    params.containerId,
    OwnerTypeMap.CONTAINER
  );
  if (items === null) return redirect(`/projects/${params.projectId}`);
  return (
    <>
      <ProjectMainBar
        projectId={params.projectId}
        containerId={params.containerId}
      />
      <ProjectSideBar />
      <Droppable id={params.containerId} type={OwnerTypeMap.CONTAINER}>
        <div className='relative'>
          {items?.map((item) => <ItemItem key={item.id} item={item} />)}
        </div>
      </Droppable>
    </>
  );
};

export default ContainerPage;
