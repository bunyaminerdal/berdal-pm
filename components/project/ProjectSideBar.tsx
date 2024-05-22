import React from 'react';
import { Droppable } from '../dnd/Droppable';
import { ItemType, ItemTypeMap, OwnerTypeMap } from '@/types';
import PrototypeItem from '../Item/PrototypeItem';
import { getParentByChildId } from '@/data/project/items';

const ProjectSideBar = async () => {
  return (
    <div className='absolute bottom-0 left-0 top-12 z-30 flex w-24 flex-col justify-stretch gap-2 border-r bg-background p-2 pt-14 text-xs'>
      <Droppable id={'layout'} type='PROJECT'>
        {Object.keys(ItemTypeMap).map((itemType) => {
          return (
            <PrototypeItem itemType={itemType as ItemType} key={itemType} />
          );
        })}
      </Droppable>
    </div>
  );
};

export default ProjectSideBar;
