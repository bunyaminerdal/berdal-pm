'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { useTransition } from 'react';
import { start } from 'repl';

export const Social = ({ provider }: { provider: 'google' | 'github' }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await signIn(provider, {
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      });
    });
  };

  return (
    <Button
      size='lg'
      className='w-full'
      variant='outline'
      onClick={() => onClick()}
      disabled={isPending}
      loading={isPending}
    >
      {provider === 'google' ? (
        <FcGoogle className='h-5 w-5' />
      ) : (
        <FaGithub className='h-5 w-5' />
      )}
    </Button>
  );
};
