import Link from 'next/link';
import { Button } from '../ui/button';

const BackButton = ({ path }: { path: string }) => {
  return (
    <Button className='' asChild>
      <Link href={path}>Back</Link>
    </Button>
  );
};

export default BackButton;
