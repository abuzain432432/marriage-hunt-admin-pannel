import Navbar from '@/components/ui/Navbar';
import { Providers } from '@/components/ui/Providers';
import Sidebar from '@/components/ui/Sidebar';
import { getUsersQueryKey } from '@/lib/react-query';
import { getMeAction, getSubscriptions } from '@/server/actions';
import { QueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [getUsersQueryKey],
    queryFn: () => getMeAction(),
    staleTime: 1000,
  });
  return (
    <Providers>
      <div className='flex '>
        <Sidebar />
        <div className='h-screen flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
          <Navbar />
          <div className='flex-1 px-16'>{children}</div>
        </div>
      </div>
    </Providers>
  );
}
