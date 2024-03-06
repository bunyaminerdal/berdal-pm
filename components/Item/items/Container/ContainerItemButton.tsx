'use client';
import { Button } from '@/components/ui/button';
import usePrototypeClear from '@/hooks/usePrototypeClear';
import { useParams, useRouter } from 'next/navigation';

const ContainerItemButton = ({
  containerId,
  containerName,
}: {
  containerId: string;
  containerName: string;
}) => {
  usePrototypeClear(containerId ? 'CONTAINER-prototype' : null);
  const { push } = useRouter();
  const { projectId } = useParams();
  return (
    <Button
      className='flex h-20 w-20 items-center justify-center'
      variant='outline'
      onClick={() => {
        push(`/projects/${projectId}/${containerId}`);
      }}
    >
      {containerName}
    </Button>
  );
};

export default ContainerItemButton;
