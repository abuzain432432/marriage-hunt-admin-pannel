'use client';
import { Text } from '@/components/ui/Text';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';

export default function StatisPieChart({
  data,
  label,
  href,
}: {
  data: unknown[];
  label: string;
  href: string;
}) {
  return (
    <div
      className='h-full pt-8 pb-14 px-5  rounded-2xl overflow-hidden'
      style={{ boxShadow: '#a9a9a984 0px 0px 15px 4px' }}
    >
      <Text disableMarginBottom as='h3' size={'l'}>
        {label}
      </Text>
      <ResponsiveContainer
        className={'mt-3'}
        width='100%'
        height='100%'
      >
        <PieChart>
          <Pie dataKey='value' data={data} fill='#8884d8' label />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
