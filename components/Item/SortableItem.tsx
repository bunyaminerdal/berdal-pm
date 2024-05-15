import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from '@prisma/client';
import ItemItem from '.';

export function SortableItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* <ItemItem item={item} /> */}
    </div>
  );
}
//TODO: SHOW ITEM
