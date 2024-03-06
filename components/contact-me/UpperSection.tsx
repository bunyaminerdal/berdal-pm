'use client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';
import React from 'react';
import { LinkButton } from '../auth/link-button';

const UpperSection = () => {
  const user = useCurrentUser();
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <p>Don&apos;t hesitate to get in touch with me.</p>
      {!user && (
        <p>
          It&apos;s easier to recognize people when they&apos;re
          <LinkButton
            href='/auth/login?callbackUrl=/contact-me'
            label='Logged in'
            className='p-1'
          />
        </p>
      )}
      {!user && <p>Or you can just continue with the form below.</p>}
    </div>
  );
};

export default UpperSection;
