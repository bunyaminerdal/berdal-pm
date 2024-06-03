import { Draggable } from '@/components/dnd/Draggable';
import { getContainerItemById } from '@/data/project/items';
import { ItemType } from '@/types';
import { Item } from '@prisma/client';
import ContainerItemButton from './ContainerItemButton';

const ContainerItem = async ({ item }: { item: Item }) => {
  const container = await getContainerItemById(item.itemId);
  const positionX = +(container?.positionX || '0');
  const positionY = +(container?.positionY || '0');
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
        ownerId={item.ownerId}
      >
        <ContainerItemButton
          containerId={container?.id || ''}
          containerName={container?.name || ''}
        />
      </Draggable>
    </div>
  );
};

export default ContainerItem;
