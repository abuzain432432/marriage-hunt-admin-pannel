'use client';
import React, { useState } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { MdOutlineClose } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { getUserReportsQueryKey } from '@/lib/react-query';
import { getUserReports, getUsers } from '@/server/actions';
import Spinner from '@/components/ui/Spinner';
import CustomErrorsPage from '@/components/ui/CustomErrorsPage';
import CustomPagination from '@/components/ui/CustomPagination';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import ReportList from './ReportList';
export default function UserReports({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const [reportTab, setReportTab] = useState<
    null | 'pending' | 'resolved'
  >(null);
  const { isLoading, error, data, isRefetching } = useQuery({
    queryKey: [getUserReportsQueryKey, id, reportTab],
    queryFn: () => getUserReports(id, page, reportTab),
    retry: false,
  });

  let renderedComponent;

  if (data?.error) {
    renderedComponent = <CustomErrorsPage error={data.error} />;
  }
  if (error) {
    renderedComponent = <CustomErrorsPage error={error.message} />;
  }
  if (data?.success) {
    renderedComponent = (
      <>
        <ReportList data={data.success.data} />
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
      </>
    );
  }
  if (isLoading || isRefetching) {
    renderedComponent = (
      <div className='mx-auto w-full  max-w-7xl'>
        <Spinner color='gray' />
      </div>
    );
  }
  return (
    <Drawer onClose={onClose} open={true}>
      <DrawerContent>
        <div className='relative py-6 min-h-[30vh]'>
          <div
            role='button'
            onClick={onClose}
            className='text-white  right-3 -top-2  bg-gray-900 rounded-full cursor-pointer p-0.5 absolute'
          >
            <MdOutlineClose size={20} />
          </div>
          <div className='mx-auto w-full  max-w-7xl'>
            <div>
              <div className='grid mb-4 w-fit gap-4 grid-cols-3'>
                <span
                  onClick={() => {
                    setReportTab(null);
                    setPage(1);
                  }}
                  className={cn(
                    `py-1 px-2 rounded-xl text-center cursor-pointer border-1 ${
                      reportTab === null
                        ? 'border-black bg-black text-white'
                        : 'border-2 border-black'
                    }`
                  )}
                >
                  All
                </span>
                <span
                  className={` py-1 rounded-xl cursor-pointer px-4 ${
                    reportTab === 'pending'
                      ? 'border-black bg-black text-white'
                      : 'border-2 border-black '
                  }`}
                  onClick={() => {
                    setReportTab('pending');
                    setPage(1);
                  }}
                >
                  Pending
                </span>
                <span
                  className={`py-1 rounded-xl cursor-pointer px-4 ${
                    reportTab === 'resolved'
                      ? 'border-black bg-black text-white'
                      : 'border-2 border-black'
                  }`}
                  onClick={() => {
                    setReportTab('resolved');
                    setPage(1);
                  }}
                >
                  Resolved
                </span>
              </div>
            </div>
            {renderedComponent}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
