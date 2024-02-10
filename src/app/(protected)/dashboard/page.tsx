import Dashboard from '@/components/Dashboard';
import {
  getSubscriptionsOverviewQueryKey,
  getUsersOverviewQueryKey,
} from '@/lib/react-query';
import {
  getSubscriptionsOverviewAction,
  getUsersOverviewAction,
} from '@/server/actions';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [getSubscriptionsOverviewQueryKey],
    queryFn: () => getSubscriptionsOverviewAction(),
    retry: false,
  });

  await queryClient.prefetchQuery({
    queryKey: [getUsersOverviewQueryKey],
    queryFn: () => getUsersOverviewAction(),
    retry: false,
  });
  //
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
