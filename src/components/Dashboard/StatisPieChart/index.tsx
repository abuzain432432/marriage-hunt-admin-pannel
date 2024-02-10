'use client';
import ShadowContainer from '@/components/ui/ShadowContainer';
import { Text } from '@/components/ui/Text';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import StatisPieChartSkelton from './StatisPieChartSkelton';

export type StatisPieChartDataType =
  | Record<string, string | number>[]
  | undefined;

export type Props = {
  data: StatisPieChartDataType;
  label: string;
  href: string;
  isLoading: boolean;
};
export default function StatisPieChart({
  data,
  label,
  href,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <ShadowContainer className='h-full pt-8 pb-14 px-5 flex justify-center items-center  rounded-2xl overflow-hidden'>
        <StatisPieChartSkelton />
      </ShadowContainer>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div>
        No data available for the chart. Check your data source.
      </div>
    );
  }
  return (
    <ShadowContainer className='h-full pt-8 pb-14 px-5  rounded-2xl overflow-hidden'>
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
    </ShadowContainer>
  );
}
