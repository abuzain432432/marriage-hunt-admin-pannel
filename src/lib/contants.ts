export const PUBLIC_IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
export const WEBSITE_BASE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_BASE_URL;

export const APPLICATION_JSON_HEADER = {
  'Content-Type': 'application/json',
};

export enum LINKS {
  LOGIN = '/',
  DASHBOARD = '/dashboard',
  USERS = '/dashboard/users',
  SUBSCRIPTIONS = '/dashboard/subscriptions',
  SECURITY = '/dashboard/security',
}

export const sitesRoutes = [
  LINKS.LOGIN,
  LINKS.DASHBOARD,
  LINKS.SUBSCRIPTIONS,
  LINKS.USERS,
  LINKS.SECURITY,
];

export const publicRoutes = [LINKS.LOGIN];

export const protectedRoutes = [
  LINKS.DASHBOARD,
  LINKS.SUBSCRIPTIONS,
  LINKS.USERS,
  LINKS.SECURITY,
];

export enum COOKIES {
  JWT = 'token',
}

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;
