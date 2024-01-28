export type NServerErrorType = {
  message: string;
};

export type SharedApiMessageStatusResponseType<T = {}> = {
  message: string;
  status: string;
} & T;

export type SharedApiPaginationsResponseTye<T> = {
  totalDocs: number;
  results: number;
  pages: number;
  data: T[];
};
export type UserType = {
  location: {
    type: string;
    coordinates: number[];
    city: string;
    country: string;
  };
  personal: {
    children: string;
    education: string;
    desiredRelationship: string[];
    willingToRelocate: string;
  };
  appearance: { height: 6.2; bodyType: 'Average' };
  habits: { drink: string; smoke: string; exercise: string };
  myIdealPartner: {
    children: string;
    desiredRelationship: string;
    education: string;
    maritalStatus: string;
    willingToRelocate: string;
    bodyType: string;
    drink: string;
    exercise: string;
    height: 4;
    smoke: string;
  };
  _id: string;
  firstName: string;
  photo: string;
  email: string;
  active: boolean;
  role: string;
  blockList: string[];
  favoriteList: string[];
  chatList: string[];
  favoriteCount: number;
  accountType: string;
  age: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  dateOfBirth: Date;
  gender: string;
  maritalStatus: string;
  lastSeen: Date;
  subscription?: string;
  visitCount: number;
  reportCount: number;
};

export type LoginApiResponseType = {
  state: string;
  token: string;
  user: UserType;
} & SharedApiMessageStatusResponseType;

export type GetUsersApiResponseType = {
  totalDocs: number;
  results: number;
  pages: number;
  data: UserType[];
};

export type SubscriptionDetailsType = {
  _id: string;
  user: { firstName: string; photo: string; email: string };
  customer: string;
  invoice: string;
  subscription: string;
  interval: string;
  amount: 20;
  currency: string;
  session: string;
  autoRenew: true;
  status: 'active' | 'canceled';
  createdAt: string;
  updatedAt: string;
  __v: 0;
  endDate: string;
  startDate: string;
};
export type GetSubscriptionApiResponseType =
  SharedApiPaginationsResponseTye<SubscriptionDetailsType>;

export type UserReportDetailsType = {
  _id: string;
  reporter: {
    _id: string;
    firstName: string;
    photo: string;
    email: string;
  };
  reportedUser: {
    _id: string;
    firstName: string;
    photo: string;
    email: string;
  };
  reportType: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

export type GetUserReportsApiResponseType =
  SharedApiPaginationsResponseTye<UserReportDetailsType>;

export type ChangePasswordApiResponseType =
  SharedApiMessageStatusResponseType<{
    state: string;
    token: string;
    user: UserType;
  }>;

export type GetPricesApiResponseType = {
  data: {
    monthlyPrice: {
      id: 'price_1OZW1SLy6Ah29kLIif9lKbLL';
      unit_amount: 2000;
    };
    yearlyPrice: {
      id: 'price_1OZW1JLy6Ah29kLIFPgXBkf3';
      unit_amount: 20000;
    };
  };
};
