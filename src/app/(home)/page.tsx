'use client';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between'>
      <section className='flex flex-col container mx-auto w-full h-screen jusitfy-center items-center my-auto align-middle'>
        <div className='my-auto md:h-auto h-full w-full justify-center items-center flex flex-col'>
          <h1 className='text-7xl font-black'>In Development</h1>

          <div className='pt-5 text-md md:text-xl font-mono inline-flex gap-6'>
            <h6>#block2024</h6>
            <h6>#FreePalestine🇵🇸</h6>
          </div>
          <p className='pt-10 text-center sm:w-3/4 lg:w-1/2'>
            'Block Out Club' web-app facilitates the blocking of celebrities who
            do not voice support or acknowledgment for the ongoing humanitarian
            crisis in Palestine.
          </p>
        </div>
      </section>
    </main>
  );
}
