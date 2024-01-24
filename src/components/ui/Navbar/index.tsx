import Image from 'next/image';
import React from 'react';
import { Text } from '../Text';

export default function Navbar() {
  return (
    <nav className='flex w-full items-center px-8 py-3 border-b border-b-gray-300 mb-8 justify-between'>
      <Text disableMarginBottom as='h2' size={'l'}>
        Overview
      </Text>
      <div className='flex items-center gap-2'>
        <div className='w-[50px] bg-gray-400 rounded-full relative h-[50px]'>
          {/* <Image alt='admin profile' src={'/h'} fill /> */}
        </div>
        <div className='text-black/90'>
          <Text size={'m'} disableMarginBottom as='h3'>
            Umer
          </Text>
        </div>
      </div>
    </nav>
  );
}
