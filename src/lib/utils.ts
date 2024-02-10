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

export const getCurrentYearAndMonth = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  return { year: currentYear, month: currentMonth };
};

export const getStartDateAndEndDateForOverviewApiCall = () => {
  const { year, month } = getCurrentYearAndMonth();

  const startDate = format(new Date(year, 0, 1), 'yyyy-MM-dd');

  const endDate = format(
    new Date(year, month, new Date().getDate()),
    'yyyy-MM-dd'
  );

  return { startDate, endDate };
};
