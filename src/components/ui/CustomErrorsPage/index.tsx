import React from 'react';
import noData from '@/assets/images/nodata.jpg';
import Image from 'next/image';
export default function CustomErrorsPage({
  error,
}: {
  error: string;
}) {
  if (error === "We couldn't find any document!") {
    return (
      <div className=' flex justify-center items-center flex-col'>
        <div className='w-[300px] relative h-[300px]'>
          <Image alt='no data found' fill src={noData} />
        </div>
      </div>
    );
  }
  return (
    <div className='text-gray-600 font-semibold text-center'>
      Something went wrong
    </div>
  );
}
