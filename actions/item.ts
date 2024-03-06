'use server';
import { db } from '@/lib/db';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ItemType, ItemTypeMap, OwnerType, OwnerTypeMap } from '@/types';
import mutateProjects from './project';

export const createItem = async (
  type: string,
  ownerId: string,
  ownerType: OwnerType,
  positionX: string = '0',
  positionY: string = '0'
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

    default:
      break;
  }
  mutateProjectItems(id);
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
