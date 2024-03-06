import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const BackButton = ({ path }: { path: string }) => {
  return (
    <Button className='' asChild>
      <Link href={path}>Back</Link>
    </Button>
  );
};

export default BackButton;
