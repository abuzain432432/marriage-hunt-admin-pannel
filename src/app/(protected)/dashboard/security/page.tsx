import Security from '@/components/Security';
import { getPricesQueryKey } from '@/lib/react-query';
import { getPricesAction } from '@/server/actions';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';

export default async function SecurityPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [getPricesQueryKey],
    queryFn: () => getPricesAction(),
    staleTime: 1000,
    retry: false,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Security />
    </HydrationBoundary>
  );
}
