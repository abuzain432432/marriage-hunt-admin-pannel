import Subscription from '@/components/Subscriptions';
import { getSubscriptionsQueryKey } from '@/lib/react-query';
import { getSubscriptions } from '@/server/actions';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';

export default async function SubscriptionsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [getSubscriptionsQueryKey, 1],
    queryFn: () => getSubscriptions(1),
    staleTime: 1000,
    retry: false,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Subscription />
    </HydrationBoundary>
  );
}
