import React from 'react';
import StatisbarChart from '@/components/Dashboard/StatisbarChart';
import StatisChipsList from './StatisChipsList';
import StatisPieChart from './StatisPieChart';
import { LINKS } from '@/lib/contants';
const pie1 = [{ name: 'New Account', value: 400, fill: '#16a34a' }];

const pie2 = [
  { name: 'Active', value: 400, fill: '#16a34a' },
  { name: 'Canceled', value: 400, fill: '#e11d48' },
];

export default function Dashboard() {
  return (
    <div className='w-full '>
      <StatisChipsList />
      <div className='flex gap-8 h-[400px]  mb-10'>
        <div className='flex-1'>
          <StatisbarChart
            href={LINKS.USERS}
            label={'This year accounts details'}
          />
        </div>
        <div className='w-[400px]'>
          <StatisPieChart
            href={LINKS.USERS}
            label={'This month accounts details'}
            data={pie1}
          />
        </div>
      </div>
      <div className='flex gap-8  h-[400px]'>
        <div className='flex-1 h-full'>
          <StatisbarChart
            href={LINKS.SUBSCRIPTIONS}
            label={'This month subscription details'}
          />
        </div>
        <div className='w-[400px] h-full'>
          <StatisPieChart
            href={LINKS.USERS}
            label={'This month subscription details'}
            data={pie2}
          />
        </div>
      </div>
    </div>
  );
}
