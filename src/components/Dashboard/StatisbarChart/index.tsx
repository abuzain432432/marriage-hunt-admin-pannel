'use client';
import ShadowContainer from '@/components/ui/ShadowContainer';
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
import StatisbarChartSkelton from './StatisbarChartSkelton';

export type StatisbarChartDataType =
  | Record<string, number | string>[]
  | undefined;
type Props = {
  label: string;
  href: LINKS;
  isLoading: boolean;
  data: StatisbarChartDataType;
  barColors?: string[];
};
export default function StatisbarChart({
  label,
  href,
  isLoading,
  data,
  barColors,
}: Props) {
  if (isLoading) {
    return (
      <ShadowContainer
        className={
          'rounded-2xl overflow-hidden bg-white  pt-8 pb-14 px-5 h-full w-full'
        }
      >
        <StatisbarChartSkelton />
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
  const dataKeys = Object.keys(data[0]).filter(key => key !== 'name');
  return (
    <ShadowContainer
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
          {dataKeys.map((key, index) => {
            if (key !== 'name' && barColors && barColors[index]) {
              // If a color is provided for the current bar, use it
              return (
                <Line
                  key={index}
                  type='monotone'
                  dataKey={key}
                  stroke={barColors[index]}
                  activeDot={{ r: 8 }}
                />
              );
            }
            // Otherwise, use a default color (you may customize this)
            return (
              <Line
                key={index}
                type='monotone'
                dataKey={key}
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
            );
          })}
          {/* <Line
            type='monotone'
            dataKey='pv'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          /> */}
          <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </ShadowContainer>
  );
}
