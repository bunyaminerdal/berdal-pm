export enum ItemTypeMap {
  CONTAINER = 'CONTAINER',
  TEXT = 'TEXT',
}
export type ItemType = keyof typeof ItemTypeMap;

export enum OwnerTypeMap {
  PROJECT = 'PROJECT',
  CONTAINER = 'CONTAINER',
}
export type OwnerType = keyof typeof OwnerTypeMap;
