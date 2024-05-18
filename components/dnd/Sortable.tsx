import React from 'react';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../Item/SortableItem';
import { Item } from '@prisma/client';

const Sortable = ({ items, listId }: { items: Item[]; listId: string }) => {
  return (
    <SortableContext
      items={items}
      //   strategy={verticalListSortingStrategy}
      id={listId}
    >
      {items.map(
        (item) =>
          // <SortableItem key={item.id} item={item} />
          item.itemId
      )}
    </SortableContext>
  );
};

export default Sortable;
