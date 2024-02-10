'use client';
import React from 'react';
import { Text } from '../Text';
import { getUsersQueryKey } from '@/lib/react-query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMeAction } from '@/server/actions';
import CustomAvatar from '../CustomAvatar';
import { usePathname } from 'next/navigation';
import { LINKS } from '@/lib/contants';
export default function Navbar() {
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: [getUsersQueryKey],
    queryFn: () => getMeAction(),
    placeholderData: keepPreviousData,
  });
  let navbarTitle = 'Overview';
  if (pathname.endsWith(LINKS.SECURITY)) {
    console.log(pathname);
    navbarTitle = 'Security';
  } else if (pathname.endsWith(LINKS.SUBSCRIPTIONS)) {
    navbarTitle = 'Subscriptions';
  } else if (pathname.endsWith(LINKS.USERS)) {
    navbarTitle = 'Users';
  }
  return (
    <nav className='flex w-full items-center px-8 py-3 border-b border-b-gray-300 mb-8 justify-between'>
      <Text disableMarginBottom as='h2' size={'l'}>
        {navbarTitle}
      </Text>
      <div className='flex items-center gap-2'>
        {data?.success ? (
          <CustomAvatar
            size='md'
            altText={data?.success?.user.firstName}
            photo={data?.success?.user.photo}
          />
        ) : (
          <div className='w-[50px] bg-gray-400 rounded-full relative h-[50px]'></div>
        )}

        <div className='text-black/90'>
          <Text size={'m'} disableMarginBottom as='h3'>
            {data?.success && data.success.user.firstName}
          </Text>
        </div>
      </div>
    </nav>
  );
}
