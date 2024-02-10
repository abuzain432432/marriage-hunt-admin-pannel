'use client';
import React, { useState } from 'react';
import CustomPagination from '@/components/ui/CustomPagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getSubscriptionsQueryKey } from '@/lib/react-query';
import { getSubscriptions } from '@/server/actions';
import CustomErrorsPage from '@/components/ui/CustomErrorsPage';
import TableLoading from '@/components/ui/TableLoading';
import ShadowContainer from '../ui/ShadowContainer';
import SubscriptionsTable from './SubscriptionsTable';
import { SUBSCRIPTIONS_DUMMY_DATA } from '@/Dummy/subscriptions';

export default function Subscription() {
  const [page, setPage] = useState(1);

  const { error, data, isRefetching, isPlaceholderData } = useQuery({
    queryKey: [getSubscriptionsQueryKey, page],
    queryFn: () => getSubscriptions(page),
    placeholderData: keepPreviousData,
  });
  let renderedComponent;
  if (isRefetching) {
    renderedComponent = <TableLoading />;
  }
  // if (data?.error) {
  //   renderedComponent = <CustomErrorsPage error={data.error} />;
  // }
  // if (error) {
  //   renderedComponent = <CustomErrorsPage error={error.message} />;
  // }
  // if (!isPlaceholderData && data?.success) {

  renderedComponent = (
    <>
      {/* <SubscriptionsTable data={data.success.data} /> */}
      <SubscriptionsTable data={SUBSCRIPTIONS_DUMMY_DATA.data} />

      <div className='border-t pt-5 border-t-gray-200'>
        <CustomPagination
          hasNoPreviousPage={page <= 1}
          // hasNoNextPage={data.success.pages <= page}
          hasNoNextPage={SUBSCRIPTIONS_DUMMY_DATA.pages <= page}
          currentPage={page}
          onNextPage={() => {
            // if (data.success.pages <= page) return;
            if (SUBSCRIPTIONS_DUMMY_DATA.pages <= page) return;

            setPage(page => page + 1);
          }}
          onPreviousPage={() => {
            if (page <= 1) return;
            setPage(page => page - 1);
          }}
        />
      </div>
    </>
  );
  // }

  return (
    <ShadowContainer className='py-8 px-8 rounded-xl overflow-hidden'>
      {renderedComponent}
    </ShadowContainer>
  );
}
