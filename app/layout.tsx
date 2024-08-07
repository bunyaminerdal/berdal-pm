import SessionProviderBe from '@/components/auth/SessionProviderBe';
import MainLayout from '@/components/layout/main-layout';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import type { Metadata } from 'next';
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
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='antialiased'>
        <SessionProviderBe>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </SessionProviderBe>
      </body>
    </html>
  );
}
