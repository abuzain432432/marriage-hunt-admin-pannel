import React from 'react';
import styles from './styles.module.css';
import { cn } from '@/lib/utils';
type Props = {
  className?: string;
  color?: 'red' | 'gray' | 'green' | 'purple';
  size?: 'small' | 'medium' | 'large';
};
export default function Spinner({
  className,
  color = 'purple',
  size = 'small',
}: Props) {
  return (
    <div className={cn(styles.spinner)}>
      <span
        className={cn(
          styles.line,
          ' rounded-full   inline-block',
          className,
          {
            'bg-purple-600': color == 'purple',
            'bg-gray-600': color == 'gray',
            'bg-green-600': color == 'green',
            'bg-red-600': color == 'red',

            'w-[14px] h-[14px] mx-0.5 mb-[15px]': size == 'small',
            'w-[25px] h-[25px] mx-1 mb-[25px]': size == 'medium',
            'w-[40px] h-[40px] mx-2 mb-[45px]': size == 'large',
          }
        )}
      />
      <span
        className={cn(
          styles.line,
          ' rounded-full   inline-block',
          className,
          {
            'bg-purple-600': color == 'purple',
            'bg-gray-600': color == 'gray',
            'bg-green-600': color == 'green',
            'bg-red-600': color == 'red',

            'w-[14px] h-[14px] mx-0.5 mb-[15px]': size == 'small',
            'w-[25px] h-[25px] mx-1 mb-[25px]': size == 'medium',
            'w-[40px] h-[40px] mx-2 mb-[45px]': size == 'large',
          }
        )}
      />
      <span
        className={cn(
          styles.line,
          ' rounded-full   inline-block',
          className,
          {
            'bg-purple-600': color == 'purple',
            'bg-gray-600': color == 'gray',
            'bg-green-600': color == 'green',
            'bg-red-600': color == 'red',

            'w-[14px] h-[14px] mx-0.5 mb-[15px]': size == 'small',
            'w-[25px] h-[25px] mx-1 mb-[25px]': size == 'medium',
            'w-[40px] h-[40px] mx-2 mb-[45px]': size == 'large',
          }
        )}
      />
    </div>
  );
}
