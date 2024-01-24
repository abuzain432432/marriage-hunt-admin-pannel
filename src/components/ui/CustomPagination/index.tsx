import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import React from 'react';

export default function CustomPagination({
  currentPage,
  onNextPage,
  onPreviousPage,
  hasNoNextPage,
  hasNoPreviousPage,
}: {
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  hasNoNextPage: boolean;
  hasNoPreviousPage: boolean;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onPreviousPage}
            className={cn('cursor-pointer hover:opacity-80', {
              hasNoPreviousPage:
                'pointer-events-none cursor-not-allowed',
            })}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={onNextPage}
            className={cn('cursor-pointer hover:opacity-80', {
              hasNoNextPage: 'pointer-events-none cursor-not-allowed',
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
