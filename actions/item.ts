'use server';
import { db } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { ItemType, ItemTypeMap, OwnerType, OwnerTypeMap } from '@/types';
import mutateProjects from './project';

export const createItem = async (
  type: string,
  ownerId: string,
  ownerType: OwnerType,
  positionX: string = '0',
  positionY: string = '0',
  order: number = 0
) => {
  switch (ownerType) {
    case OwnerTypeMap.PROJECT:
      const project = await db.project.findUnique({
        where: { id: ownerId },
      });
      if (!project) return { error: 'project not found!' };
      break;
    case OwnerTypeMap.CONTAINER:
      const container = await db.container.findUnique({
        where: { id: ownerId },
      });
      if (!container) return { error: 'container not found!' };
      break;
    case OwnerTypeMap.LIST:
      const list = await db.list.findUnique({
        where: { id: ownerId },
      });
      if (!list) return { error: 'list not found!' };
    default:
      break;
  }
  switch (type) {
    case ItemTypeMap.CONTAINER:
      const container = await db.container.create({
        data: {
          name: 'Container',
          positionX,
          positionY,
        },
      });
      if (!container) return { error: 'container creation failed!' };
      const containerItem = await db.item.create({
        data: {
          itemType: ItemTypeMap.CONTAINER,
          itemId: container.id,
          ownerId,
          ownerType,
        },
      });
      if (!containerItem) return { error: 'item creation failed!' };
      switch (ownerType) {
        case OwnerTypeMap.PROJECT:
          const project = await db.project.findUnique({
            where: { id: ownerId },
          });

          await db.project.update({
            where: { id: ownerId },
            data: {
              itemIds: [...(project?.itemIds || []), containerItem.id],
            },
          });
          break;
        case OwnerTypeMap.CONTAINER:
          const container = await db.container.findUnique({
            where: { id: ownerId },
          });
          await db.container.update({
            where: { id: ownerId },
            data: {
              itemIds: [...(container?.itemIds || []), containerItem.id],
            },
          });
          break;

        default:
          break;
      }
      break;

    case ItemTypeMap.TEXT:
      const text = await db.text.create({
        data: {
          context: '',
          positionX,
          positionY,
          width: '200',
          height: '100',
        },
      });
      if (!text) return { error: 'text creation failed!' };
      const textItem = await db.item.create({
        data: {
          itemType: ItemTypeMap.TEXT,
          itemId: text.id,
          ownerId,
          ownerType,
          order,
        },
      });
      if (!textItem) return { error: 'item creation failed!' };
      switch (ownerType) {
        case OwnerTypeMap.PROJECT:
          const project = await db.project.findUnique({
            where: { id: ownerId },
          });

          await db.project.update({
            where: { id: ownerId },
            data: {
              itemIds: [...(project?.itemIds || []), textItem.id],
            },
          });
          break;
        case OwnerTypeMap.CONTAINER:
          const container = await db.container.findUnique({
            where: { id: ownerId },
          });
          await db.container.update({
            where: { id: ownerId },
            data: {
              itemIds: [...(container?.itemIds || []), textItem.id],
            },
          });
          break;
        case OwnerTypeMap.LIST:
          const list = await db.list.findUnique({
            where: { id: ownerId },
          });
          await db.list.update({
            where: { id: ownerId },
            data: {
              itemIds: [...(list?.itemIds || []), textItem.id],
            },
          });
          break;

        default:
          break;
      }
      break;

    case ItemTypeMap.LIST:
      const list = await db.list.create({
        data: {
          title: 'List',
          positionX,
          positionY,
          width: '200',
          height: '100',
        },
      });
      if (!list) return { error: 'list creation failed!' };
      const listItem = await db.item.create({
        data: {
          itemType: ItemTypeMap.LIST,
          itemId: list.id,
          ownerId,
          ownerType,
          order,
        },
      });
      if (!listItem) return { error: 'item creation failed!' };
      switch (ownerType) {
        case OwnerTypeMap.PROJECT:
          const project = await db.project.findUnique({
            where: { id: ownerId },
          });

          await db.project.update({
            where: { id: ownerId },
            data: {
              itemIds: [...(project?.itemIds || []), listItem.id],
            },
          });
          break;
        case OwnerTypeMap.CONTAINER:
          const container = await db.container.findUnique({
            where: { id: ownerId },
          });
          await db.container.update({
            where: { id: ownerId },
            data: {
              itemIds: [...(container?.itemIds || []), listItem.id],
            },
          });
          break;
        case OwnerTypeMap.LIST:
          const list = await db.list.findUnique({
            where: { id: ownerId },
          });
          await db.list.update({
            where: { id: ownerId },
            data: {
              itemIds: [...(list?.itemIds || []), listItem.id],
            },
          });
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
  mutateProjectItems(ownerId);

  return { success: 'Project created successfully!' };
};

export const updateItemPos = async (
  id: string,
  itemType: ItemType,
  posX: string,
  posY: string
) => {
  switch (itemType) {
    case ItemTypeMap.CONTAINER:
      const container = await db.container.findUnique({
        where: { id },
      });
      if (!container) return { error: 'container not found!' };
      await db.container.update({
        where: { id },
        data: {
          positionX: (+container.positionX + +posX).toString(),
          positionY: (+container.positionY + +posY).toString(),
        },
      });
      break;
    case ItemTypeMap.TEXT:
      const text = await db.text.findUnique({
        where: { id },
      });
      if (!text) return { error: 'text not found!' };
      await db.text.update({
        where: { id },
        data: {
          positionX: (+text.positionX + +posX).toString(),
          positionY: (+text.positionY + +posY).toString(),
        },
      });
      break;
    case ItemTypeMap.LIST:
      const list = await db.list.findUnique({
        where: { id },
      });
      if (!list) return { error: 'list not found!' };
      await db.list.update({
        where: { id },
        data: {
          positionX: (+list.positionX + +posX).toString(),
          positionY: (+list.positionY + +posY).toString(),
        },
      });
      break;

    default:
      break;
  }
  mutateProjectItems(id);
};

export const updateOwner = async (
  itemId: string,
  newOwnerId: string,
  newOwnerType: OwnerType
) => {
  if (!newOwnerId || !newOwnerType) return { error: 'new owner not found!' };
  const item = await db.item.findFirst({
    where: { itemId: itemId },
  });
  if (!item) return { error: 'item not found!' };
  const oldOwnerId = item.ownerId;
  const oldOwnerType = item.ownerType;
  const oldOwner = await (
    db[oldOwnerType?.toLowerCase() as any] as any
  ).findFirst({
    where: {
      id: oldOwnerId,
    },
  });
  const newOwner = await (
    db[newOwnerType?.toLowerCase() as any] as any
  ).findFirst({
    where: {
      id: newOwnerId,
    },
  });
  if (!oldOwner || !oldOwnerType) return { error: 'old owner not found!' };
  if (!newOwner) return { error: 'new owner not found!' };
const updatedItem=  await db.item.update({
    where: { id: item.id },
    data: {
      ownerId: newOwnerId,
      ownerType: newOwnerType,
    },
  });
  console.log("🚀 ~ updatedItem:", updatedItem)
  await (
    db[oldOwnerType?.toLowerCase() as any] as any
  ).update({
    where: { id: oldOwner.id },
    data: {
      itemIds:[...(oldOwner.itemIds as string[]).filter((id) => id !== item.id)],
    },
  });
  await (
    db[newOwnerType?.toLowerCase() as any] as any
  ).update({
    where: { id: newOwner.id },
    data: {
      itemIds:[...(newOwner.itemIds as string[]), item.id],
    },
  });

};

export const updateItemSize = async (
  id: string,
  itemType: ItemType,
  width: string,
  height: string
) => {
  switch (itemType) {
    case ItemTypeMap.TEXT:
      const text = await db.text.findUnique({
        where: { id },
      });
      if (!text) return { error: 'text not found!' };
      await db.text.update({
        where: { id },
        data: {
          width,
          height,
        },
      });
      break;
    case ItemTypeMap.LIST:
      const list = await db.list.findUnique({
        where: { id },
      });
      if (!list) return { error: 'list not found!' };
      await db.list.update({
        where: { id },
        data: {
          width,
          height,
        },
      });
      break;

    default:
      break;
  }
  mutateProjectItems(id);
};
export const updateTextContext = async (id: string, textContext: string) => {
  const text = await db.text.findUnique({
    where: { id },
  });
  if (!text) return { error: 'text not found!' };
  await db.text.update({
    where: { id },
    data: {
      context: textContext,
    },
  });
  mutateProjectItems(id);
};

export const deleteItem = async (id: string, type: ItemType | OwnerType) => {
  switch (type) {
    case OwnerTypeMap.PROJECT:
      const project = await db.project.findUnique({
        where: { id },
      });
      if (!project) return { error: 'project not found!' };
      let projectItemIds = project?.itemIds;
      await recursiveDeleteFunc(projectItemIds).then(async () => {
        await db.project
          .delete({
            where: { id },
          })
          .then(async () => {
            return { success: 'Project deleted successfully!' };
          });
      });
      mutateProjects();
      break;
    default:
      const item = await db.item.findFirst({
        where: { itemId: id },
      });
      if (!item) return { error: `${type.toLowerCase()} not found!` };
      await (db[item.ownerType.toLowerCase() as any] as any)
        .findFirst({
          where: {
            id: item.ownerId,
          },
        })
        .then(async (owner: any) => {
          let itemIds = [item.id];
          await recursiveDeleteFunc(itemIds).then(async () => {
            await (db[item.ownerType.toLowerCase() as any] as any)
              .update({
                where: {
                  id: item.ownerId,
                },
                data: {
                  itemIds: owner?.itemIds?.filter(
                    (itemId: string) => itemId !== item.id
                  ),
                },
              })
              .then(async () => {
                return {
                  success: `${type.toLowerCase()} deleted successfully!`,
                };
              });
          });
        });
      mutateProjectItems(item.ownerId);
      break;
  }
};

export async function mutateProjectItems(id: string) {
  revalidateTag(id);
}

const recursiveDeleteFunc = (ids: string[]): Promise<string[]> => {
  return new Promise(async (resolve: (value: string[]) => void) => {
    db.item
      .findMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      .then((items) => {
        if (!items?.[0]) return resolve([]);
        (db[items[0].itemType.toLowerCase() as any] as any)
          .findFirst({
            where: {
              id: items[0].itemId,
            },
          })
          .then((item: any) => {
            (db[items[0].itemType.toLowerCase() as any] as any)
              .delete({
                where: {
                  id: items[0].itemId,
                },
              })
              .then(() => {
                db.item
                  .delete({
                    where: {
                      id: items[0].id,
                    },
                  })
                  .then(() => {
                    return resolve(
                      ids
                        .filter((id) => id !== items[0].id)
                        .concat(item?.itemIds || [])
                    );
                  });
              });
          });
      });
  }).then((ids: string[]) => {
    if (ids.length > 0) {
      return recursiveDeleteFunc(ids);
    } else {
      return ids;
    }
  });
};
