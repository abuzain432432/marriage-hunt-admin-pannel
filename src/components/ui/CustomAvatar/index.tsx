import { PUBLIC_IMAGE_BASE_URL } from '@/lib/contants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

export default function CustomAvatar({
  altText,
  photo,
  size = 'sm',
}: {
  altText: string;
  photo: string;
  size?: 'sm' | 'lg' | 'md';
}) {
  let classNames;
  if (size === 'sm') {
    classNames = 'w-[35px] h-[35px]';
  }
  if (size === 'md') {
    classNames = 'w-[75px] h-[75px]';
  }
  if (size === 'lg') {
    classNames = 'w-[150px] h-[150px]';
  }
  return (
    <div
      className={cn(
        ' relative overflow-hidden mx-auto  bg-gray-300 rounded-full',
        classNames
      )}
    >
      <Image
        alt={`${altText}`}
        fill
        sizes={
          size == 'sm' ? '100px' : size == 'md' ? '200px' : '300px'
        }
        className='w-auto h-auto'
        src={`${PUBLIC_IMAGE_BASE_URL}/${photo}`}
      />
    </div>
  );
}
