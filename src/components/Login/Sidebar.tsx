import Image from 'next/image';
import React from 'react';
import loginBg from '@/assets/images/login.jpg';

export default function Sidebar() {
  return (
    <div className=' h-full bg-[#F7F6F9] col-span-2  flex items-center justify-center w-full'>
      <figure className='w-[450px] relative h-[450px]'>
        <Image
          sizes='w-[450px]'
          priority
          alt='login'
          src={loginBg}
          fill
        />
      </figure>
    </div>
  );
}
