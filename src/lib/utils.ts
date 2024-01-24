import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistance, subDays, format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formateDateInDaysAgo(date: Date | string) {
  return formatDistance(subDays(new Date(date), 0), new Date(), {
    addSuffix: true,
  });
}
// format(new Date(2017, 10, 6), 'MMM')

export function formateDate(date: Date | string) {
  return format(new Date(date), 'd MMMM yyyy');
}
