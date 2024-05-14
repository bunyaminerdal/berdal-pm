import { db } from '@/lib/db';
import { OwnerType, OwnerTypeMap } from '@/types';
import { getProjectById } from './project';

export const getItemsByOwnerId = async (
  ownerId: string,
  ownerType: OwnerType
) => {
  try {
    switch (ownerType) {
      case OwnerTypeMap.PROJECT:
        const project = await db.project.findUnique({
          where: { id: ownerId },
        });
        if (!project) return null;
        break;
      case OwnerTypeMap.CONTAINER:
        const container = await db.container.findUnique({
          where: { id: ownerId },
        });
        if (!container) return null;
        break;
      default:
        break;
    }
    const items = await db.item.findMany({
      where: { ownerId },
    });

    return items || [];
  } catch {
    return null;
  }
};

export const getContainerItemById = async (id: string) => {
  try {
    const container = await db.container.findUnique({
      where: { id },
    });
    return container;
  } catch {
    return null;
  }
};

export const getTextItemById = async (id: string) => {
  try {
    const text = await db.text.findUnique({
      where: { id },
    });
    return text;
  } catch {
    return null;
  }
};
export const getListItemById = async (id: string) => {
  try {
    const list = await db.list.findUnique({
      where: { id },
    });
    return list;
  } catch {
    return null;
  }
};

export const getParentByChildId = async (childId: string|undefined) => {
  if(!childId) return null;
  try {
    const parent = await db.item.findFirst({
      where: {itemId: childId },
    });
    return parent;
  } catch {
    return null;
  }
};
export const getOwnerByTypeAndId =async (itemId: string, itemType: OwnerType) => {
  switch (itemType) {
    case  OwnerTypeMap.CONTAINER:
      return await getContainerItemById(itemId);
    case OwnerTypeMap.PROJECT:
      return await getProjectById(itemId);
    default:
      return null;
  }
}