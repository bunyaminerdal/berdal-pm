import { Draggable } from '@/components/dnd/Draggable';
import { ItemType } from '@/types';
import { Item } from '@prisma/client';
import React from 'react';
import TextItemTextArea from './TextItemTextArea';
import { getTextItemById } from '@/data/project/items';

const TextItem = async ({ item }: { item: Item }) => {
  const text = await getTextItemById(item.itemId);
  const positionX = +(text?.positionX || '0');
  const positionY = +(text?.positionY || '0');
  const width = +(text?.width || '100');
  const height = +(text?.height || '100');
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
        <TextItemTextArea
          ownerId={item.ownerId}
          textId={item.itemId}
          textContext={text?.context}
          width={width}
          height={height}
        />
      </Draggable>
    </div>
  );
};

export default TextItem;
