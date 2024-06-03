'use client';
import { updateItemSize } from '@/actions/item';
import { Droppable } from '@/components/dnd/Droppable';
import { Button } from '@/components/ui/button';
import usePrototypeClear from '@/hooks/usePrototypeClear';
import { ItemTypeMap, OwnerTypeMap } from '@/types';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { BsPlus } from 'react-icons/bs';

const ListItemDrop = ({
  children,
  ownerId,
  listId,
  listTitle,
  width = 100,
  height = 100,
}: PropsWithChildren<{
  ownerId: string;
  listId: string;
  listTitle?: string;
  width?: number;
  height?: number;
}>) => {
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
        // overflow: 'auto',
        resize: 'both',
        cursor: 'default',
      }}
      ref={ref}
      className='group flex flex-col rounded-md border border-primary'
      onMouseUp={() => {
        setIsMouseUp(true);
      }}
    >
      <div className='h-10 border-b border-primary px-3 py-2 text-sm font-medium'>
        {listTitle}
      </div>
      <Droppable
        id={listId}
        type={OwnerTypeMap.LIST}
        allowableItemTypes={[ItemTypeMap.TEXT]}
      >
        {children}
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
