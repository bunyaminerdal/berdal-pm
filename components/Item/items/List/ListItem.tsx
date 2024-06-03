import { Draggable } from '@/components/dnd/Draggable';
import { getItemsByOwnerId, getListItemById } from '@/data/project/items';
import { ItemType, OwnerTypeMap } from '@/types';
import { Item } from '@prisma/client';
import ItemItem from '../..';
import ListItemDrop from './ListItemDrop';

const ListItem = async ({ item }: { item: Item }) => {
  const list = await getListItemById(item.itemId);
  const items = await getItemsByOwnerId(list?.id || '', OwnerTypeMap.LIST);
  console.log('🚀 ~ ListItem ~ items:', items);
  const positionX = +(list?.positionX || '0');
  const positionY = +(list?.positionY || '0');
  const width = +(list?.width || '100');
  const height = +(list?.height || '100');
  return (
    <div
      id={item.itemId}
      style={{
        position: 'absolute',
        top: `${positionY}px` || 0,
        left: `${positionX}px` || 0,
      }}
    >
      <Draggable
        id={item.itemId}
        type={item.itemType as ItemType}
        handle
        ownerId={item.ownerId}
      >
        <ListItemDrop
          ownerId={item.ownerId}
          listId={list?.id || ''}
          listTitle={list?.title || ''}
          width={width}
          height={height}
        >
          {items?.map((i) => <ItemItem item={i} key={i.itemId} />)}
        </ListItemDrop>
      </Draggable>
    </div>
  );
};

export default ListItem;
