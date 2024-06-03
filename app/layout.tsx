import { auth } from '@/auth';
import MainLayout from '@/components/layout/main-layout';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bünyamin Erdal | Portfolio | Personal Website | Contact me',
  description:
    'Personal website of Bünyamin Erdal. Projects, Contact me Social links. Next.js Tailwind.css Typescript Prisma react-hook-form react-icons.',
  icons: '/berdal.ico',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang='en' suppressHydrationWarning>
      <body className='antialiased'>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
