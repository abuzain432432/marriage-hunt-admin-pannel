import { cn } from '@/lib/utils';
import React from 'react';

export default function ShadowContainer({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ boxShadow: '#a9a9a932 0px 0px 10px 4px' }}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
