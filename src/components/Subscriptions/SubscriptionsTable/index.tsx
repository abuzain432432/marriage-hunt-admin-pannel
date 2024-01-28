import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { SubscriptionDetailsType } from '@/types';
import { formateDate } from '@/lib/utils';
import CustomAvatar from '@/components/ui/CustomAvatar';

export default function SubscriptionsTable({
  data,
}: {
  data: SubscriptionDetailsType[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead> Photo</TableHead>

          <TableHead>AutoRenew</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(subscription => (
          <TableRow key={subscription._id}>
            <TableCell>{subscription?.user?.firstName}</TableCell>
            <TableCell>{subscription?.amount}</TableCell>
            <TableCell>
              {subscription.interval === 'month'
                ? 'Monthly plan'
                : 'Annual plan'}
            </TableCell>
            <TableCell className=' relative'>
              <CustomAvatar
                altText={subscription?.user?.firstName}
                photo={subscription?.user?.photo}
              />
            </TableCell>

            <TableCell>
              {subscription.autoRenew ? 'True' : 'False'}
            </TableCell>
            <TableCell>
              {formateDate(subscription.startDate)}
            </TableCell>
            <TableCell>{formateDate(subscription.endDate)}</TableCell>
            <TableCell>{subscription?.user?.email}</TableCell>
            <TableCell>
              {subscription.status === 'active' ? (
                <div>
                  <span className='px-2 py-1 rounded-full text-center bg-green-500 text-white inline-block w-[90px] '>
                    Active
                  </span>
                </div>
              ) : (
                <div>
                  <span className='px-2 py-1 rounded-full text-center inline-block w-[90px]  bg-red-500 text-white'>
                    Canceled
                  </span>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
