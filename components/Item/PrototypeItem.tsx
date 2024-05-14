import { ItemType, ItemTypeMap } from '@/types';
import React from 'react';
import { Draggable } from '../dnd/Draggable';
import { Button } from '../ui/button';
import { FaSpinner } from 'react-icons/fa';

const PrototypeItem = ({ itemType }: { itemType: ItemType }) => {
  return (
    <div id={`${itemType}-prototype`} className='group'>
      <Draggable type={itemType}>
        <Button
          className='flex h-20 w-20 items-center justify-center '
          variant='outline'
        >
          <span className='flex group-data-[loading=true]:hidden'>
            {ItemTypeMap[itemType]}
          </span>
          <FaSpinner className='hidden group-data-[loading=true]:block group-data-[loading=true]:animate-spin' />
        </Button>
      </Draggable>
    </div>
  );
};

export default PrototypeItem;
