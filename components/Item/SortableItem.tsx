import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from '@prisma/client';
import dynamic from 'next/dynamic';

export function SortableItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const DynamicItemItem = dynamic(() => import('./index'), {
    ssr: true,
  });
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      //TODO:use droppable instead of sort item
      <DynamicItemItem item={item} />
    </div>
  );
}
//TODO: SHOW ITEM
