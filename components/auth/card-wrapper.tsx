'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { LinkButton } from '@/components/auth/link-button';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string | React.ReactNode;
  headerTitle: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerTitle,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className='flex w-full flex-col items-center gap-2 md:flex-1  '>
      <Card className=' flex w-full flex-col items-center gap-2 shadow-md md:w-[500px] '>
        <CardHeader>
          <Header label={headerLabel} title={headerTitle} />
        </CardHeader>
        <CardContent className='w-full'>{children}</CardContent>
        {showSocial && (
          <CardFooter>
            <div className='flex w-full items-center gap-x-2'>
              <Social provider='google' />
              <Social provider='github' />
            </div>
          </CardFooter>
        )}
        {backButtonLabel && backButtonHref && (
          <CardFooter>
            <LinkButton
              label={backButtonLabel}
              href={backButtonHref}
              className='w-full'
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
