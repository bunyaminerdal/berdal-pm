'use client';
import React, { PropsWithChildren, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GiMove } from 'react-icons/gi';

import { ItemType } from '@/types';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import DeleteButton from '../project/DeleteButton';

export function Draggable({
  type,
  children,
  id,
  ownerId,
  handle,
}: PropsWithChildren<{
  type: ItemType;
  id?: string;
  ownerId?: string;
  handle?: boolean;
}>) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: (id as string) || type,
    data: {
      type,
      id,
      posX: itemRef.current?.offsetLeft,
      posY: itemRef.current?.offsetTop,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
      }
    : undefined;

  return (
    <div ref={itemRef} className='group'>
      <div
        ref={setNodeRef}
        style={style}
        {...(handle ? {} : listeners)}
        {...attributes}
        className='relative'
      >
        {id && (
          <DeleteButton
            itemId={id}
            type={type}
            className='absolute -right-3 -top-3 z-10 hidden h-6 w-6 bg-background group-hover:flex'
            ownerId={ownerId}
          />
        )}
        {handle && (
          <Button
            size='icon'
            className={cn(
              'absolute -left-3 -top-3 z-10 hidden h-6 w-6 group-hover:flex',
              {
                block: transform,
              }
            )}
            {...listeners}
            variant='outline'
          >
            <GiMove className='h-6 w-6' />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
