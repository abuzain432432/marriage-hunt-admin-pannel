import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { LINKS } from '@/lib/contants';
import { IoSettings } from 'react-icons/io5';
import { FaBasketball } from 'react-icons/fa6';
import { HiOutlineUsers } from 'react-icons/hi';
import { FaSackDollar } from 'react-icons/fa6';
import Link from 'next/link';
import { Text } from '../Text';
const sidebarItems = [
  {
    label: 'Overview',
    icon: <FaBasketball size={24} />,
    href: LINKS.DASHBOARD,
  },
  {
    label: 'Users',
    icon: <HiOutlineUsers size={24} />,
    href: LINKS.USERS,
  },
  {
    label: 'Subscriptions',
    icon: <FaSackDollar size={24} />,
    href: LINKS.SUBSCRIPTIONS,
  },
  {
    label: 'Security',
    icon: <IoSettings size={24} />,
    href: LINKS.SECURITY,
  },
];
export default function Sidebar() {
  return (
    <div className='w-[300px] relative min-h-screen py-5 bg-gray-800'>
      <p className='text-3xl font-bold text-center text-white'>
        Israelite Dating
      </p>
      <ul className='w-10/12 flex my-5 flex-col gap-4 mx-auto'>
        {sidebarItems.map(item => (
          <Link href={item.href}>
            <Text
              as='div'
              disableMarginBottom
              key={item.label}
              className='w-full hover:opacity-80 flex gap-2 items-center cursor-pointer bg-white py-3 px-4 rounded-xl'
            >
              <div>{item.icon}</div>
              <p>{item.label}</p>
            </Text>
          </Link>
        ))}
      </ul>
      <li className='absolute bottom-11  w-full flex justify-center items-center'>
        <IoLogOutOutline size={34} className='text-white' />
      </li>
    </div>
  );
}
