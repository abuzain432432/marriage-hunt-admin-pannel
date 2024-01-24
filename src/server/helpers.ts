'use server';

import { COOKIES } from '@/lib/contants';
import { cookies } from 'next/headers';

export const setSecureJwt = (tkn: string) => {
  cookies().set(COOKIES.JWT, tkn, {
    secure: true,
    httpOnly: true,
    sameSite: true,
  });
};

// Authorization: 'Bearer ' + token,

export const getAuthorizationHeader = () => {
  const token = cookies().get(COOKIES.JWT);
  if (!token) return false;
  return { Authorization: 'Bearer ' + token.value };
};
