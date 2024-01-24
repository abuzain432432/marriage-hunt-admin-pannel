'use client';
import React, { useState } from 'react';
import UsersTable from '@/components/Users/UsersTable';
import CustomPagination from '@/components/ui/CustomPagination';
import { useQuery } from '@tanstack/react-query';
import { getUsersQueryKey } from '@/lib/react-query';
import { getUsers } from '@/server/actions';
import CustomErrorsPage from '@/components/ui/CustomErrorsPage';
import TableLoading from '@/components/ui/TableLoading';

export default function Users() {
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: [getUsersQueryKey, page],
    queryFn: () => getUsers(page),
    // staleTime: 60,
    // retry: false,
  });
  let renderedComponent;
  if (isLoading) {
    renderedComponent = <TableLoading />;
  }
  if (data?.error) {
    renderedComponent = <CustomErrorsPage error={data.error} />;
  }
  if (error) {
    renderedComponent = <CustomErrorsPage error={error.message} />;
  }
  if (data?.success) {
    renderedComponent = (
      <>
        <UsersTable data={data.success.data} />
        <div className='border-t border-t-gray-200'>
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

  console.log('ISLOADING_________________----');
  console.log(isLoading);
  console.log('DATA');
  console.log(data);
  return (
    <div
      className='py-8 px-8 rounded-xl overflow-hidden'
      style={{ boxShadow: '#a9a9a984 0px 0px 15px 4px' }}
    >
      {renderedComponent}
    </div>
  );
}
