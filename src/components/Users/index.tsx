'use client';
import React, { useState } from 'react';
import UsersTable from '@/components/Users/UsersTable';
import CustomPagination from '@/components/ui/CustomPagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getUsersQueryKey } from '@/lib/react-query';
import { getUsers } from '@/server/actions';
import CustomErrorsPage from '@/components/ui/CustomErrorsPage';
import TableLoading from '@/components/ui/TableLoading';
import ShadowContainer from '../ui/ShadowContainer';

export default function Users() {
  const [page, setPage] = useState(1);

  const { error, data, isRefetching, isPlaceholderData } = useQuery({
    queryKey: [getUsersQueryKey, page],
    queryFn: () => getUsers(page),
    placeholderData: keepPreviousData,
    retry: false,
  });
  let renderedComponent;
  if (isRefetching) {
    renderedComponent = <TableLoading />;
  }
  if (data?.error) {
    renderedComponent = <CustomErrorsPage error={data.error} />;
  }
  if (error) {
    renderedComponent = <CustomErrorsPage error={error.message} />;
  }
  if (!isPlaceholderData && data?.success) {
    renderedComponent = (
      <>
        <UsersTable data={data.success.data} />
        <div className='border-t pt-5 border-t-gray-200'>
          <CustomPagination
            hasNoPreviousPage={page <= 1}
            hasNoNextPage={data.success.pages <= page}
            currentPage={page}
            onNextPage={() => {
              if (data.success.pages <= page) return;
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
  }

  return (
    <ShadowContainer className='py-8 px-8 rounded-xl overflow-hidden'>
      {renderedComponent}
    </ShadowContainer>
  );
}
