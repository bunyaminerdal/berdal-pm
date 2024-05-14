'use client';
import { updateItemSize } from '@/actions/item';
import { ItemTypeMap, OwnerTypeMap } from '@/types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePrototypeClear from '@/hooks/usePrototypeClear';
import { Button } from '@/components/ui/button';
import { BsPlus } from 'react-icons/bs';
import { Droppable } from '@/components/dnd/Droppable';

const ListItemDrop = ({
  ownerId,
  listId,
  listTitle,
  width = 100,
  height = 100,
}: {
  ownerId: string;
  listId: string;
  listTitle?: string;
  width?: number;
  height?: number;
}) => {
  usePrototypeClear('LIST-prototype');

  const ref = useRef<HTMLDivElement>(null);

  const [rect, setRect] = useState({ width: 0, height: 0 });
  const [isMouseUp, setIsMouseUp] = useState(false);

  useEffect(() => {
    if (isMouseUp) {
      if (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.width !== width &&
        rect.height !== height
      )
        updateItemSize(
          listId,
          ItemTypeMap.LIST,
          rect.width.toString(),
          rect.height.toString()
        );
      setIsMouseUp(false);
    }
  }, [height, isMouseUp, ownerId, rect.height, rect.width, listId, width]);
  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver((entries: any) => {
            const entry = entries[0];

            if (entry) {
              if (ref.current) {
                setRect({
                  width: entry.target.offsetWidth,
                  height: entry.target.offsetHeight,
                });
              }
            }
          })
        : null,
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [observer]);

  return (
    <div
      style={{
        width,
        height,
        resize: 'both',
        overflow: 'hidden',
        cursor: 'default',
      }}
      ref={ref}
      className='group rounded-md border border-primary bg-transparent'
      onMouseUp={() => {
        setIsMouseUp(true);
      }}
    >
      <div className='z-0 border-b border-primary bg-transparent px-3 py-2 text-sm font-medium'>
        {listTitle}
      </div>
      <Droppable
        id={listId}
        type={OwnerTypeMap.LIST}
        allowableItemTypes={[ItemTypeMap.TEXT]}
      >
        <div className='relative'>asdf</div>
      </Droppable>
      <Button
        size='icon'
        className='absolute -bottom-3 -left-3 z-10 hidden h-6 w-6 group-hover:flex'
        variant='outline'
      >
        <BsPlus className='h-6 w-6' />
      </Button>
    </div>
  );
};

export default ListItemDrop;
