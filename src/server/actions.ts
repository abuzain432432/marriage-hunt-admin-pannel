'use server';
import {
  changePasswordSchema,
  changeReportStatusSchema,
  deteteUserSchema,
  loginSchema,
  logoutSchema,
  updatePriceSchema,
} from '@/types/form';
import { APPLICATION_JSON_HEADER } from '@/lib/contants';
import { createSafeActionClient } from 'next-safe-action';
import {
  ChangePasswordApiResponseType,
  GetAccountOverViewApiResponseType,
  GetPricesApiResponseType,
  GetSubscriptionApiResponseType,
  GetSubscriptionOverViewApiResponseType,
  GetUserReportsApiResponseType,
  GetUsersApiResponseType,
  LoginApiResponseType,
  NServerErrorType,
} from '@/types';
import {
  setSecureJwt,
  getAuthorizationHeader,
  deleteSecureJwt,
} from './helpers';
import { getStartDateAndEndDateForOverviewApiCall } from '@/lib/utils';
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
    `${API_BASE}/users/?page=${page}&limit=3`,
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

export const getUserReports = async (
  id: string,
  page: number,
  status: null | 'pending' | 'resolved'
) => {
  let url = `${API_BASE}/reports/${id}?page=${page}&limit=3`;
  if (status) {
    url += `&status=${status}`;
  }
  const response = await fetch(url, {
    headers: {
      ...getAuthorizationHeader(),
    },
  });
  if (!response.ok) {
    const error: NServerErrorType = await response.json();
    return { error: error.message || 'Something went wrong' };
  }
  const data: GetUserReportsApiResponseType = await response.json();
  return { success: data };
};

export const getSubscriptions = async (page: number) => {
  const response = await fetch(
    `${API_BASE}/payments/?page=${page}&limit=5`,
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
  const data: GetSubscriptionApiResponseType = await response.json();
  return { success: data };
};

export const changeReportStatusAction = action(
  changeReportStatusSchema,
  async body => {
    const response = await fetch(`${API_BASE}/reports/${body.id}`, {
      method: 'PATCH',
      headers: {
        ...getAuthorizationHeader(),
        ...APPLICATION_JSON_HEADER,
      },

      body: JSON.stringify({ status: body.status }),
    });
    if (!response.ok) {
      const error: NServerErrorType = await response.json();
      return { error: error.message || 'Something went wrong' };
    }
    const data: { status: string } = await response.json();
    return { success: data };
  }
);

export const deleteUserAction = action(
  deteteUserSchema,
  async body => {
    const response = await fetch(`${API_BASE}/users/${body.id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthorizationHeader(),
      },
    });
    if (!response.ok) {
      const error: NServerErrorType = await response.json();
      return { error: error.message || 'Something went wrong' };
    }
    return { success: 'User account has been deleted successfully' };
  }
);

export const changePasswordAction = action(
  changePasswordSchema,
  async body => {
    const response = await fetch(`${API_BASE}/users/updatepassword`, {
      method: 'PATCH',
      headers: {
        ...APPLICATION_JSON_HEADER,
        ...getAuthorizationHeader(),
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error: NServerErrorType = await response.json();
      return { error: error.message || 'Something went wrong' };
    }
    const data: ChangePasswordApiResponseType = await response.json();
    return { success: data };
  }
);

export const updatePriceAction = action(
  updatePriceSchema,
  async body => {
    let url;
    if (body.plan === 'monthly') {
      url = `${API_BASE}/prices/update-monthly-price/${body.price}`;
    } else {
      url = `${API_BASE}/prices/update-yearly-price/${body.price}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...APPLICATION_JSON_HEADER,
        ...getAuthorizationHeader(),
      },
    });
    if (!response.ok) {
      const error: NServerErrorType = await response.json();
      return { error: error.message || 'Something went wrong' };
    }
    const data: ChangePasswordApiResponseType = await response.json();
    return { success: 'Price updated successfully' };
  }
);

export const getPricesAction = async () => {
  const response = await fetch(`${API_BASE}/prices`, {
    method: 'GET',
    headers: {
      ...getAuthorizationHeader(),
      ...APPLICATION_JSON_HEADER,
    },
  });
  if (!response.ok) {
    const error: NServerErrorType = await response.json();
    return { error: error.message || 'Something went wrong' };
  }
  const data: GetPricesApiResponseType = await response.json();
  return { success: data };
};

export const getSubscriptionsOverviewAction = async () => {
  const { endDate, startDate } =
    getStartDateAndEndDateForOverviewApiCall();
  let url = `${API_BASE}/payments/overview/from/${startDate}/to/${endDate}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...getAuthorizationHeader(),
    },
  });
  if (!response.ok) {
    const error: NServerErrorType = await response.json();
    return { error: error.message || 'Something went wrong' };
  }
  const data: GetSubscriptionOverViewApiResponseType =
    await response.json();
  return { success: data };
};

export const getUsersOverviewAction = async () => {
  const { endDate, startDate } =
    getStartDateAndEndDateForOverviewApiCall();
  let url = `${API_BASE}/users/overview/from/${startDate}/to/${endDate}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...getAuthorizationHeader(),
    },
  });
  if (!response.ok) {
    const error: NServerErrorType = await response.json();
    return { error: error.message || 'Something went wrong' };
  }
  const data: GetAccountOverViewApiResponseType =
    await response.json();
  return { success: data };
};

export const logoutAction = action(logoutSchema, async body => {
  let url = `${API_BASE}/users/logout`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...getAuthorizationHeader(),
    },
  });
  if (!response.ok) {
    const error: NServerErrorType = await response.json();
    return { error: error.message || 'Something went wrong' };
  }
  deleteSecureJwt();
  return { success: 'Logout successfully' };
});
