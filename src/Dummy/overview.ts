import {
  GetAccountOverViewApiResponseType,
  GetSubscriptionOverViewApiResponseType,
} from '@/types';

export const ACCOUNTS_OVERVIEW_DUMMY_DATA: GetAccountOverViewApiResponseType =
  {
    status: 'success',
    total: 12,
    data: [
      {
        count: 100,
        subscribers: 50,
        users: [
          {
            _id: '1',
            firstName: 'John',
            email: 'john@example.com',
            photo: 'john.jpg',
          },
        ],
        month: 1,
      },
      {
        count: 120,
        subscribers: 55,
        users: [
          {
            _id: '2',
            firstName: 'Alice',
            email: 'alice@example.com',
            photo: 'alice.jpg',
          },
          {
            _id: '3',
            firstName: 'Bob',
            email: 'bob@example.com',
            photo: 'bob.jpg',
          },
        ],
        month: 2,
      },
      {
        count: 130,
        subscribers: 60,
        users: [
          {
            _id: '4',
            firstName: 'Emma',
            email: 'emma@example.com',
            photo: 'emma.jpg',
          },
        ],
        month: 3,
      },
      {
        count: 110,
        subscribers: 45,
        users: [
          {
            _id: '5',
            firstName: 'David',
            email: 'david@example.com',
            photo: '',
          },
          {
            _id: '6',
            firstName: 'Ella',
            email: 'ella@example.com',
            photo: '',
          },
        ],
        month: 4,
      },
      {
        count: 105,
        subscribers: 48,
        users: [
          {
            _id: '7',
            firstName: 'Oliver',
            email: 'oliver@example.com',
            photo: '',
          },
        ],
        month: 5,
      },
      {
        count: 115,
        subscribers: 52,
        users: [
          {
            _id: '8',
            firstName: 'Sophia',
            email: 'sophia@example.com',
            photo: '',
          },
        ],
        month: 6,
      },
      {
        count: 125,
        subscribers: 58,
        users: [
          {
            _id: '9',
            firstName: 'William',
            email: 'william@example.com',
            photo: '',
          },
        ],
        month: 7,
      },
      {
        count: 140,
        subscribers: 65,
        users: [
          {
            _id: '10',
            firstName: 'Mia',
            email: 'mia@example.com',
            photo: '',
          },
        ],
        month: 8,
      },
      {
        count: 145,
        subscribers: 68,
        users: [
          {
            _id: '11',
            firstName: 'James',
            email: 'james@example.com',
            photo: '',
          },
        ],
        month: 9,
      },
      {
        count: 135,
        subscribers: 62,
        users: [
          {
            _id: '12',
            firstName: 'Isabella',
            email: 'isabella@example.com',
            photo: '',
          },
        ],
        month: 10,
      },
      {
        count: 125,
        subscribers: 55,
        users: [
          {
            _id: '13',
            firstName: 'Benjamin',
            email: 'benjamin@example.com',
            photo: '',
          },
        ],
        month: 11,
      },
      {
        count: 130,
        subscribers: 60,
        users: [
          {
            _id: '14',
            firstName: 'Charlotte',
            email: 'charlotte@example.com',
            photo: '',
          },
        ],
        month: 12,
      },
    ],
  };

export const SUBSCRIPTION_OVERVIEW_DUMMY_DATA: GetSubscriptionOverViewApiResponseType =
  {
    status: 'success',
    total: 12,
    active: 1000,
    canceled: 200,
    yearly: 600,
    monthly: 400,
    data: [
      {
        count: 50,
        amount: 5000,
        subscriptions: ['subscription_id_1', 'subscription_id_2'],
        month: 1,
      },
      {
        count: 45,
        amount: 4500,
        subscriptions: ['subscription_id_3', 'subscription_id_4'],
        month: 2,
      },
      {
        count: 55,
        amount: 5500,
        subscriptions: ['subscription_id_5', 'subscription_id_6'],
        month: 3,
      },
      {
        count: 60,
        amount: 6000,
        subscriptions: ['subscription_id_7', 'subscription_id_8'],
        month: 4,
      },
      {
        count: 65,
        amount: 6500,
        subscriptions: ['subscription_id_9', 'subscription_id_10'],
        month: 5,
      },
      {
        count: 70,
        amount: 7000,
        subscriptions: ['subscription_id_11', 'subscription_id_12'],
        month: 6,
      },
      {
        count: 75,
        amount: 7500,
        subscriptions: ['subscription_id_13', 'subscription_id_14'],
        month: 7,
      },
      {
        count: 80,
        amount: 8000,
        subscriptions: ['subscription_id_15', 'subscription_id_16'],
        month: 8,
      },
      {
        count: 85,
        amount: 8500,
        subscriptions: ['subscription_id_17', 'subscription_id_18'],
        month: 9,
      },
      {
        count: 90,
        amount: 9000,
        subscriptions: ['subscription_id_19', 'subscription_id_20'],
        month: 10,
      },
      {
        count: 95,
        amount: 9500,
        subscriptions: ['subscription_id_21', 'subscription_id_22'],
        month: 11,
      },
      {
        count: 100,
        amount: 10000,
        subscriptions: ['subscription_id_23', 'subscription_id_24'],
        month: 12,
      },
    ],
  };
