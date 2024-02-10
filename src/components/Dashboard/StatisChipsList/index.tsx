import React from 'react';
import StatisChipItem from '../StatisChipItem';
import { FaUserCog } from 'react-icons/fa';
import { MdCancelScheduleSend } from 'react-icons/md';
import { VscCompassActive } from 'react-icons/vsc';
import { TbDeviceIpadHorizontalDollar } from 'react-icons/tb';
import { LINKS } from '@/lib/contants';
import {
  GetAccountOverViewApiResponseType,
  GetSubscriptionOverViewApiResponseType,
} from '@/types';

type Props = {
  isSubscriptionsDataLoading: boolean;
  isUsersDataLoading: boolean;
  subscriptionsData:
    | GetSubscriptionOverViewApiResponseType
    | undefined;
  usersData: GetAccountOverViewApiResponseType | undefined;
};
export default function StatisChipsList({
  usersData,
  subscriptionsData,
  isUsersDataLoading,
  isSubscriptionsDataLoading,
}: Props) {
  const statis = [
    {
      label: 'Total accounts',
      statis: usersData?.total,
      icon: (
        <div className='bg-purple-600 rounded-full p-3'>
          <FaUserCog size={24} className='text-white' />
        </div>
      ),
      href: LINKS.USERS,
      isLoading: isUsersDataLoading,
    },
    {
      label: 'Total subscriptions',
      statis: subscriptionsData?.total,
      icon: (
        <div className='bg-green-600 rounded-full p-3'>
          <TbDeviceIpadHorizontalDollar
            size={24}
            className='text-white'
          />
        </div>
      ),
      href: LINKS.SUBSCRIPTIONS,
      isLoading: isSubscriptionsDataLoading,
    },
    {
      label: 'Active subscriptions',
      statis: subscriptionsData?.active,
      icon: (
        <div className='bg-orange-500 rounded-full p-3'>
          <VscCompassActive size={24} className='text-white' />
        </div>
      ),
      href: LINKS.SUBSCRIPTIONS,
      isLoading: isSubscriptionsDataLoading,
    },
    {
      label: 'Canceled subscriptions',
      statis: subscriptionsData?.canceled,
      icon: (
        <div className=' bg-red-500 rounded-full p-3'>
          <MdCancelScheduleSend size={24} className='text-white' />
        </div>
      ),
      href: LINKS.SUBSCRIPTIONS,
      isLoading: isSubscriptionsDataLoading,
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
