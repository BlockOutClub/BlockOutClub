import { BOC404 } from '@components/svgs/boc404';

export default function NotFound() {
  return (
    <main className='flex flex-col items-center justify-between'>
      <section className='flex flex-col container mx-auto w-full h-screen jusitfy-center items-center my-auto align-middle'>
        <div className='my-auto md:h-auto h-full w-full justify-center items-center flex flex-col'>
          <div className='pb-3'>
            <BOC404 />
          </div>
          <div className='text-md md:text-xl font-mono underline inline-flex gap-6'>
            <h6>#404</h6>
            <h6>#block2024</h6>
            <h6>#FreePalestine🇵🇸</h6>
          </div>
          <p className='pt-16 text-center sm:w-3/4 lg:w-1/2'>
            The page you are looking for was moved, removed, renamed or might
            never existed!
          </p>
        </div>
      </section>
    </main>
  );
}
