'use client';
import React from 'react';
import StatisbarChart, {
  StatisbarChartDataType,
} from '@/components/Dashboard/StatisbarChart';
import StatisChipsList from './StatisChipsList';
import StatisPieChart, {
  StatisPieChartDataType,
} from './StatisPieChart';
import { LINKS, MONTHS } from '@/lib/contants';
import { getCurrentYearAndMonth } from '@/lib/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  getSubscriptionsOverviewQueryKey,
  getUsersOverviewQueryKey,
} from '@/lib/react-query';
import {
  getSubscriptionsOverviewAction,
  getUsersOverviewAction,
} from '@/server/actions';
import CustomErrorsPage from '../ui/CustomErrorsPage';
import {
  ACCOUNTS_OVERVIEW_DUMMY_DATA,
  SUBSCRIPTION_OVERVIEW_DUMMY_DATA,
} from '@/Dummy/overview';

const pie2 = [
  { name: 'Active', value: 400, fill: '#16a34a' },
  { name: 'Canceled', value: 400, fill: '#e11d48' },
];

export default function Dashboard() {
  const {
    data: subscriptionsOverviewData,
    isRefetching: isSubscriptionsOverwviewFetching,
  } = useQuery({
    queryKey: [getSubscriptionsOverviewQueryKey],
    queryFn: () => getSubscriptionsOverviewAction(),
    placeholderData: keepPreviousData,
    retry: false,
  });

  const {
    data: usersOverviewData,
    isRefetching: isUserOverviewFetching,
  } = useQuery({
    queryKey: [getUsersOverviewQueryKey],
    queryFn: () => getUsersOverviewAction(),
    placeholderData: keepPreviousData,
    retry: false,
  });
  // TODO uncommit this if you have actual api
  // if (usersOverviewData?.error) {
  //   return <CustomErrorsPage error={usersOverviewData.error} />;
  // }
  // if (subscriptionsOverviewData?.error)
  //   return (
  //     <CustomErrorsPage error={subscriptionsOverviewData.error} />
  //   );

  console.log(usersOverviewData?.success);

  let formatedAccounts: StatisbarChartDataType;
  let accountsDataInThisMonth: StatisPieChartDataType;
  // TODO uncommit this if you have actual api
  // if (usersOverviewData?.success) {
  const { month: currentMonth } = getCurrentYearAndMonth();
  // TODO uncommit this if you have actual api
  // const totalAccountInThisMonth = usersOverviewData.success.data.find(
  const totalAccountInThisMonth =
    ACCOUNTS_OVERVIEW_DUMMY_DATA.data.find(
      item => item.month === currentMonth + 1
    )?.count;
  accountsDataInThisMonth = [
    {
      name: 'New Account',
      value: totalAccountInThisMonth as number,
      fill: '#16a34a',
    },
  ];
  // TODO uncommit this if you have actual api
  // formatedAccounts = usersOverviewData.success.data
  formatedAccounts = ACCOUNTS_OVERVIEW_DUMMY_DATA.data
    .toSorted((a, b) => a.month - b.month)
    .map(account => {
      return {
        'Total accounts': account.count,
        name: MONTHS[account.month - 1],
      };
    });
  // }

  let formatedSubscriptions: StatisbarChartDataType;
  let subscriptionsDataInThisMonth: StatisPieChartDataType;
  // TODO uncommit this if you have actual api

  // if (subscriptionsOverviewData?.success) {
  if (true) {
    const { month: currentMonth } = getCurrentYearAndMonth();
    const subscriptionDetailsInThisMonth =
      // TODO uncommit this if you have actual api
      // subscriptionsOverviewData.success.data.find(
      ACCOUNTS_OVERVIEW_DUMMY_DATA.data.find(
        item => item.month === currentMonth + 1
      );
    const totalSubscriptions = subscriptionDetailsInThisMonth?.count;
    subscriptionsDataInThisMonth = [
      {
        name: 'Subscriptions',
        value: totalSubscriptions as number,
        fill: '#16a34a',
      },
    ];
    // TODO uncommit this if you have actual api
    // formatedSubscriptions = subscriptionsOverviewData.success.data
    formatedSubscriptions = SUBSCRIPTION_OVERVIEW_DUMMY_DATA.data
      .toSorted((a, b) => a.month - b.month)
      .map(account => {
        return {
          'Total Subscriptions': account.count,
          Amount: account.amount,
          name: MONTHS[account.month - 1],
        };
      });
  }
  return (
    <div className='w-full '>
      <StatisChipsList
        isSubscriptionsDataLoading={isSubscriptionsOverwviewFetching}
        isUsersDataLoading={isUserOverviewFetching}
        usersData={usersOverviewData?.success}
        subscriptionsData={subscriptionsOverviewData?.success}
      />
      <div className='flex gap-8 h-[400px]  mb-10'>
        <div className='flex-1'>
          <StatisbarChart
            isLoading={isUserOverviewFetching}
            href={LINKS.USERS}
            label={'This year accounts details'}
            data={formatedAccounts}
            barColors={['green']}
          />
        </div>
        <div className='w-[400px]'>
          <StatisPieChart
            isLoading={isUserOverviewFetching}
            href={LINKS.USERS}
            label={'This month accounts details'}
            data={accountsDataInThisMonth}
          />
        </div>
      </div>
      <div className='flex gap-8  h-[400px]'>
        <div className='flex-1 h-full'>
          <StatisbarChart
            isLoading={isSubscriptionsOverwviewFetching}
            href={LINKS.SUBSCRIPTIONS}
            label={'This year subscription details'}
            data={formatedSubscriptions}
            barColors={['green', 'red']}
          />
        </div>
        <div className='w-[400px] h-full'>
          <StatisPieChart
            isLoading={isUserOverviewFetching}
            href={LINKS.USERS}
            label={'This month subscription details'}
            data={subscriptionsDataInThisMonth}
          />
        </div>
      </div>
    </div>
  );
}
