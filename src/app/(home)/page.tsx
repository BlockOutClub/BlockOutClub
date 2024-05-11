'use client';

import { BOC2024Logo } from '@root/components/svgs/boc2024';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <BOC2024Logo />
      <div className='pt-3 text-md md:text-xl font-mono inline-flex gap-6'>
        <h6>#block2024</h6>
        <h6>#FreePalestine🇵🇸</h6>
      </div>
      <p className='pt-10 text-center sm:w-3/4 lg:w-1/2'>
        'Block Out Club' web-app facilitates the blocking of celebrities who do
        not voice support or acknowledgment for the ongoing humanitarian crisis
        in Palestine.
      </p>

      <p className='pt-10'></p>
    </main>
  );
}
