import Navbar from '@/components/ui/Navbar';
import { Providers } from '@/components/ui/Providers';
import Sidebar from '@/components/ui/Sidebar';
import React, { ReactNode } from 'react';

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
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
