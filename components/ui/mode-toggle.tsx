import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function ModeToggle({
  size = 'default',
  className,
}: {
  size?: 'icon' | 'default';
  className?: string;
}) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={cn('gap-2', className)}
          size={size}
        >
          <div className='center flex'>
            <SunIcon className='flex h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:hidden dark:-rotate-90' />
            <MoonIcon className=' hidden h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:flex dark:rotate-0' />
          </div>
          <div className={cn('', size === 'icon' ? 'sr-only' : 'not-sr-only')}>
            <span className='flex dark:hidden'>Light Mode</span>
            <span className='hidden dark:flex'>Dark Mode</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
