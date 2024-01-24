import { Text } from '@/components/ui/Text';
import { LINKS } from '@/lib/contants';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export default function StatisChipItem({
  label,
  icon,
  statis,
  href,
}: {
  label: string;
  icon: ReactNode;
  statis: string | number;
  href: LINKS;
}) {
  return (
    <li
      style={{ boxShadow: '#a9a9a984 0px 0px 15px 4px' }}
      className='flex-1 rounded-xl flex relative items-center gap-6    py-8 px-6'
    >
      {icon}
      <div className='  text-gray-800'>
        <Text size={'l'} disableMarginBottom>
          {statis}
        </Text>
        <div className='mt-1 text-gray-600'>
          <Text disableMarginBottom>{label}</Text>
        </div>
      </div>
      <Link
        className='absolute text-cyan-700 px-1 border-b border-b-cyan-700 text-sm right-4 bottom-1.5'
        href={href}
      >
        View all
      </Link>
    </li>
  );
}
