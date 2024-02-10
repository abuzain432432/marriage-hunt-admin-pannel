import { PUBLIC_IMAGE_BASE_URL } from '@/lib/contants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import DefaultImage from '@/assets/images/default-user.jpg';
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
    classNames = 'w-[55px] h-[55px]';
  }
  if (size === 'lg') {
    classNames = 'w-[150px] h-[150px]';
  }
  const photoUrl = photo
    ? `${PUBLIC_IMAGE_BASE_URL}/${photo}`
    : DefaultImage; //TODO remove this check it is used for testing purpose only
  console.log(photo);
  return (
    <div
      className={cn(
        `relative overflow-hidden mx-auto  bg-gray-500 rounded-full ${
          size == 'sm'
            ? 'w-[100px] h-[100px] '
            : 'w-[200px] h-[200px] '
        }`,
        classNames,
        ``
      )}
    >
      <Image
        alt={`${altText}`}
        fill
        sizes={
          size == 'sm' ? '100px' : size == 'md' ? '200px' : '300px'
        }
        className='w-auto h-auto'
        src={photoUrl}
      />
    </div>
  );
}
