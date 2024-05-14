'use client';

import React, { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ItemType, OwnerType, OwnerTypeMap } from '@/types';

export function Droppable({
  id,
  type = OwnerTypeMap.PROJECT,
  allowableItemTypes,
  children,
}: PropsWithChildren<{
  id: String;
  type: OwnerType;
  allowableItemTypes?: ItemType[];
}>) {
  const { isOver, setNodeRef } = useDroppable({
    id: id as string,
    data: {
      type,
      id,
      allowableItemTypes,
    },
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex h-full w-full flex-col gap-2'
    >
      {children}
    </div>
  );
}
