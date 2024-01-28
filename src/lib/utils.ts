import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistance, subDays, format } from 'date-fns';
import { WEBSITE_BASE_URL } from './contants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formateDateInDaysAgo(date: Date | string) {
  try {
    return formatDistance(subDays(new Date(date), 0), new Date(), {
      addSuffix: true,
    });
  } catch (e) {
    return date;
  }
}
export function formateDate(date: string) {
  try {
    return format(date, 'd MMMM yyyy');
  } catch (e) {
    return date;
  }
}

export function getUserProfilePage(id: string) {
  return `${WEBSITE_BASE_URL}/partnersuggestions/${id}`;
}
