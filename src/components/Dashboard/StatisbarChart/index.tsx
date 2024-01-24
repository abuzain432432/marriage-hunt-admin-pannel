'use client';
import { Text } from '@/components/ui/Text';
import { LINKS } from '@/lib/contants';
import Link from 'next/link';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Apr',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'May',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'June',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'July',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Dec',
    pv: 4300,
    amt: 2100,
  },
];

export default function StatisbarChart({
  label,
  href,
}: {
  label: string;
  href: LINKS;
}) {
  return (
    <div
      style={{ boxShadow: '#a9a9a984 0px 0px 15px 4px' }}
      className={
        ' rounded-2xl overflow-hidden bg-white  pt-8 pb-14 px-5 h-full w-full'
      }
    >
      <div className='flex w-full justify-between'>
        <Text size={'l'}>{label}</Text>
        <Link
          className='text-cyan-700 text-sm inline-block py-0 h-fit '
          href={href}
        >
          More details
        </Link>
      </div>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='pv'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
          <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
