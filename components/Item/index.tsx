import { ItemTypeMap } from '@/types';
import { Item } from '@prisma/client';
import React from 'react';
import ContainerItem from './items/Container/ContainerItem';
import TextItem from './items/Text/TextItem';
import ListItem from './items/List/ListItem';

const ItemItem = ({ item }: { item: Item }) => {
  switch (item.itemType) {
    case ItemTypeMap.CONTAINER:
      return <ContainerItem item={item} />;
    case ItemTypeMap.TEXT:
      return <TextItem item={item} />;
    case ItemTypeMap.LIST:
      return <ListItem item={item} />;
    default:
      return null;
  }
};

export default ItemItem;
