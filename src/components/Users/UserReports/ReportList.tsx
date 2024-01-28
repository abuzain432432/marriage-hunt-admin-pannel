import { UserReportDetailsType } from '@/types';
import React from 'react';
import ReportItem from './ReportItem';

export default function ReportList({
  data,
}: {
  data: UserReportDetailsType[];
}) {
  return (
    <div className='grid grid-cols-3 gap-4 py-4'>
      {data.map(item => (
        <ReportItem details={item} key={item._id} />
      ))}
    </div>
  );
}
