export enum ItemTypeMap {
  CONTAINER = 'CONTAINER',
  TEXT = 'TEXT',
  LIST = 'LIST',
}
export type ItemType = keyof typeof ItemTypeMap;

export enum OwnerTypeMap {
  PROJECT = 'PROJECT',
  CONTAINER = 'CONTAINER',
  LIST = 'LIST',
}
export type OwnerType = keyof typeof OwnerTypeMap;
