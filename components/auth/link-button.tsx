'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HTMLAttributeAnchorTarget } from 'react';

interface BackButtonProps {
  href: string;
  label: string;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}

export const LinkButton = ({
  href,
  label,
  className,
  target,
}: BackButtonProps) => {
  return (
    <Button
      variant='link'
      className={cn('font-normal', className)}
      size='sm'
      asChild
    >
      <Link href={href} target={target}>
        {label}
      </Link>
    </Button>
  );
};
