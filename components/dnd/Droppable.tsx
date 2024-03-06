'use client';

import React, { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable({ id, children }: PropsWithChildren<{ id: String }>) {
  const { isOver, setNodeRef } = useDroppable({
    id: id as string,
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
