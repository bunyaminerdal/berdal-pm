'use client';
import { useTransition } from 'react';

import { FiTrash2 } from 'react-icons/fi';

import { deleteItem } from '@/actions/item';
import { cn } from '@/lib/utils';
import { ItemType, OwnerType } from '@/types';
import { Button } from '../ui/button';

const DeleteButton = ({
  itemId,
  type,
  ownerId,
  className,
}: {
  itemId: string;
  type: ItemType | OwnerType;
  ownerId?: string;
  className?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size='icon'
      variant='outline'
      disabled={isPending}
      loading={isPending}
      onClick={async () => {
        startTransition(async () => {
          await deleteItem(itemId, type);
        });
      }}
      className={cn(className, { 'flex w-14': isPending })}
    >
      <FiTrash2 className='h-[1.2rem] w-[1.2rem]' />
    </Button>
  );
};

export default DeleteButton;
