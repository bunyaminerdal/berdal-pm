import Link from 'next/link';

export default function Home() {
  return (
    <section className='flex w-full min-w-80 flex-1 flex-col items-center overflow-hidden'>
      <div className='flex w-full flex-1 items-center overflow-auto p-5'>
        <div className='flex w-full flex-col items-center gap-2'>
          <div className='mt-5 flex flex-col items-center border-b p-3'>
            <h1 className='px-1 text-xl font-bold md:px-5 md:text-3xl'>
              Berdal Project Manager
            </h1>
          </div>
          <div className='my-5 flex flex-col justify-center gap-2'>
            <h2 className='px-1 font-bold md:px-5'>Organize your Projects</h2>
            <h5 className='flex justify-center px-1 md:px-5'>
              Dev purpose only!
            </h5>
          </div>
          <h2
            className='mt-24 flex gap-1 text-pretty text-xs font-light'
            id='footer'
          >
            <span>Copyright ©</span> <Link href={'/'}>Bünyamin ERDAL</Link>
            <span>2024</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
