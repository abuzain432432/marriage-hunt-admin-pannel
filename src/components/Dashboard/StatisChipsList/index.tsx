import React from 'react';
import StatisChipItem from '../StatisChipItem';
import { FaUserCog } from 'react-icons/fa';
import { MdCancelScheduleSend } from 'react-icons/md';
import { VscCompassActive } from 'react-icons/vsc';
import { TbDeviceIpadHorizontalDollar } from 'react-icons/tb';
import { LINKS } from '@/lib/contants';

export default function StatisChipsList() {
  const statis = [
    {
      label: 'Total accounts',
      statis: 2000,
      icon: (
        <div className='bg-purple-600 rounded-full p-3'>
          <FaUserCog size={24} className='text-white' />
        </div>
      ),
      href: LINKS.USERS,
    },
    {
      label: 'Total subscriptions',
      statis: 200,
      icon: (
        <div className='bg-green-600 rounded-full p-3'>
          <TbDeviceIpadHorizontalDollar
            size={24}
            className='text-white'
          />
        </div>
      ),
      href: LINKS.SUBSCRIPTIONS,
    },
    {
      label: 'Active subscriptions',
      statis: 200,
      icon: (
        <div className='bg-orange-500 rounded-full p-3'>
          <VscCompassActive size={24} className='text-white' />
        </div>
      ),
      href: LINKS.SUBSCRIPTIONS,
    },
    {
      label: 'Canceled subscriptions',
      statis: 200,
      icon: (
        <div className=' bg-red-500 rounded-full p-3'>
          <MdCancelScheduleSend size={24} className='text-white' />
        </div>
      ),
      href: LINKS.SUBSCRIPTIONS,
    },
  ];
  return (
    <ul className='grid grid-cols-4  mb-10 gap-6  flex-wrap'>
      {statis.map(item => (
        <StatisChipItem key={item.label} {...item} />
      ))}
    </ul>
  );
}
