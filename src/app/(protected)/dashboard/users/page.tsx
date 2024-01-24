import Users from '@/components/Users';
import { getUsersQueryKey } from '@/lib/react-query';
import { getUsers } from '@/server/actions';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import React from 'react';

export default async function UsersPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [getUsersQueryKey, 1],
    queryFn: () => getUsers(1),
    staleTime: 60,
    retry: false,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Users />
    </HydrationBoundary>
  );
}
