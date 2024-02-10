'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Text } from '@/components/ui/Text';
import ChangePriceModal from './ChangePriceModal';
import { getPricesQueryKey } from '@/lib/react-query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPricesAction } from '@/server/actions';
import { Skeleton } from '@/components/ui/skeleton';
import CustomErrorsPage from '@/components/ui/CustomErrorsPage';
import { PRICES_DUMMY_DATA } from '@/Dummy/security';

export default function Plans() {
  const [plan, setPlan] = useState<null | 'yearly' | 'monthly'>(null);
  const { error, data, isRefetching, isPlaceholderData } = useQuery({
    queryKey: [getPricesQueryKey],
    queryFn: () => getPricesAction(),
    placeholderData: keepPreviousData,
    retry: false,
  });

  let renderedComponent;
  if (isRefetching) {
    renderedComponent = (
      <div className='w-full  gap-5 mb-12 flex'>
        <Skeleton className='h-[150px] w-full rounded-xl' />
        <Skeleton className='h-[150px] w-full rounded-xl' />
      </div>
    );
  }
  {
    /* //// TODO uncommit this if you have actual api */
  }
  // if (data?.error) {
  //   renderedComponent = <CustomErrorsPage error={data.error} />;
  // }
  // if (error) {
  //   renderedComponent = <CustomErrorsPage error={error.message} />;
  // }
  // if (!isPlaceholderData && data?.success) {
  renderedComponent = (
    <div className='w-full gap-5 mb-12 flex'>
      <div className='bg-purple-800 flex-1 rounded-xl text-white py-4 px-6'>
        <p className='text-sm font-semibold'>Anual Plans</p>
        {/* //// TODO uncommit this if you have actual api */}
        <p className='text-6xl font-extralight my-3'>
          {PRICES_DUMMY_DATA.data.yearlyPrice.unit_amount / 100}
          {/* {data.success.data.yearlyPrice.unit_amount / 100}$ */}
        </p>
        <div className='mt-5 flex justify-end'>
          <Button
            onClick={() => setPlan('yearly')}
            size={'sm'}
            className='bg-white text-purple-800 hover:bg-purple-900 hover:text-white font-semibold '
          >
            Change price
          </Button>
        </div>
      </div>
      <div className='bg-purple-800 flex-1 rounded-xl text-white py-4 px-6'>
        <p className='text-sm font-semibold'>Monthly Plans</p>
        <p className='text-6xl font-extralight my-3'>
          {/* //// TODO uncommit this if you have actual api */}
          {/* {data.success.data.monthlyPrice.unit_amount / 100}$ */}
          {PRICES_DUMMY_DATA.data.monthlyPrice.unit_amount / 100}$
        </p>
        <div className='mt-5 flex justify-end'>
          <Button
            onClick={() => setPlan('monthly')}
            size={'sm'}
            className='bg-white text-purple-800 hover:bg-purple-900 hover:text-white font-semibold '
          >
            Change price
          </Button>
        </div>
      </div>
    </div>
  );
  // }
  return (
    <div
      className='
    max-w-4xl mx-auto '
    >
      <div className='text-black font-extralight mb-6 text-center  lg:w-1/2 sm:w-[75%] lg:mx-auto sm:mr-auto xl:pl-0  lg:pl-6 sm:pl-6'>
        <Text disableMarginBottom responsive={true} size={'l'}>
          Subscription Plans
        </Text>
      </div>
      {renderedComponent}
      <ChangePriceModal
        onOpenChange={() => setPlan(null)}
        plan={plan}
      />
    </div>
  );
}
