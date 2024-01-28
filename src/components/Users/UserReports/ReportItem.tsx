'use client';
import { useToast } from '@/components/ui/use-toast';
import { getUserReportsQueryKey } from '@/lib/react-query';
import { formateDate, getUserProfilePage } from '@/lib/utils';
import { changeReportStatusAction } from '@/server/actions';
import { UserReportDetailsType } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useAction } from 'next-safe-action/hooks';

import Link from 'next/link';
import React, { ChangeEvent } from 'react';

const reportType: {
  [key: string]: string;
} = {
  spam: 'Spam',
  harassment: 'Harassment',
  fake_account: 'Fake Account',
  inappropriate_content: 'Inappropriate Content',
  other: 'Other',
};
export default function ReportItem({
  details,
}: {
  details: UserReportDetailsType;
}) {
  // changeReportStatusAction
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { execute, status } = useAction(changeReportStatusAction, {
    onSuccess: data => {
      if (data.error) {
        console.log('ERROr');
        toast({
          variant: 'destructive',
          description: data.error,
        });
      }
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [getUserReportsQueryKey],
        });
      }
    },
  });

  return (
    <div className='py-6 border-2 rounded-xl border-gray-200 px-4'>
      <h3 className='text-gray-700 text-xl mb-1 font-semibold'>
        {reportType[details.reportType]}
      </h3>
      <p className='text-gray-600 text-lg '>{details.description}</p>
      <div className='text-gray-60 mt-3'>
        <Link
          href={getUserProfilePage(details.reporter._id)}
          className='text-gray-800 font-semibold text-base px-1'
        >
          {details.reporter.firstName}
        </Link>
        <span className='text-gray-400'>
          reported
          <Link
            href={getUserProfilePage(details.reportedUser._id)}
            className='text-gray-800 font-semibold text-base px-1'
          >
            {details.reportedUser.firstName}
          </Link>
          at
        </span>

        <span className='text-gray-400 text-sm px-1'>
          {formateDate(details.createdAt)}
        </span>
        <div className='w-fit relative ml-auto'>
          <select
            onChange={event => {
              execute({
                status: event.target.value,
                id: details._id,
              });
            }}
            disabled={status === 'executing'}
            defaultValue={details.status}
            className='bg-black/90 disabled:bg-gray-600 w-[120px] rounded-xl text-white py-1.5'
          >
            <option
              className='py-2 border-2 border-white/90 my-1 rounded-xl mx-2 text-center'
              value='pending'
            >
              Pending
            </option>
            <option
              className='py-2 border-2 border-white/90 my-1 rounded-xl mx-2 text-center'
              value='resolved'
            >
              Resolved
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
