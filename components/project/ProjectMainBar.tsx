import { getOwnerByTypeAndId, getParentByChildId } from '@/data/project/items';
import { OwnerTypeMap } from '@/types';
import BackButton from './BackButton';

const ProjectMainBar = async ({
  containerId,
  projectId,
}: {
  containerId?: string;
  projectId: string;
}) => {
  const parentItem = await getParentByChildId(containerId);
  const owner = await getOwnerByTypeAndId(
    parentItem ? containerId || '' : projectId || '',
    parentItem ? OwnerTypeMap.CONTAINER : OwnerTypeMap.PROJECT
  );
  const path =
    !containerId && projectId
      ? `/projects`
      : parentItem?.ownerType === OwnerTypeMap.PROJECT
        ? `/projects/${projectId}`
        : `/projects/${projectId}/${parentItem?.ownerId}`;
  return (
    <div className='absolute left-0 right-0 top-12 z-40 flex h-12 items-center gap-2 border-b bg-background p-2 text-xs'>
      <div className='flex justify-center'>
        <BackButton path={path} />
      </div>
      <p className='w-auto truncate text-ellipsis'>{owner?.name}</p>
    </div>
  );
};

export default ProjectMainBar;
