'use server';
import { loginSchema } from '@/types/form';
import { APPLICATION_JSON_HEADER } from '@/lib/contants';
import { createSafeActionClient } from 'next-safe-action';
import {
  GetUsersApiResponseType,
  LoginApiResponseType,
  NServerErrorType,
} from '@/types';
import { setSecureJwt, getAuthorizationHeader } from './helpers';
const action = createSafeActionClient();
const API_BASE = process.env.API_BASE;

export const loginAction = action(loginSchema, async body => {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: {
      ...APPLICATION_JSON_HEADER,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error: NServerErrorType = await response.json();
    return { error: error.message || 'Something went wrong' };
  }
  const data: LoginApiResponseType = await response.json();
  setSecureJwt(data.token as string);
  return { success: data };
});

export const getMeAction = async () => {
  try {
    const response = await fetch(`${API_BASE}/users/me`, {
      headers: {
        ...getAuthorizationHeader(),
      },
    });
    if (!response.ok) {
      const error: NServerErrorType = await response.json();
      return { error: error.message || 'Something went wrong' };
    }
    const data: LoginApiResponseType = await response.json();
    return { success: data };
  } catch (err) {
    return { error: 'Something went wrong' };
  }
};

// getUsers

export const getUsers = async (page: number) => {
  const response = await fetch(
    `${API_BASE}/users/?page=${page}&limit=1`,
    {
      headers: {
        ...getAuthorizationHeader(),
      },
    }
  );
  if (!response.ok) {
    const error: NServerErrorType = await response.json();
    return { error: error.message || 'Something went wrong' };
  }
  const data: GetUsersApiResponseType = await response.json();
  return { success: data };
};
