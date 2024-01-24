export type NServerErrorType = {
  message: string;
};

export type SharedApiMessageStatusResponseType = {
  message: string;
  status: string;
};

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
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  bio: string;
  dateOfBirth: Date;
  gender: string;
  maritalStatus: string;
  lastSeen: Date;
  subscription?: string;
  visitCount: 0;
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
