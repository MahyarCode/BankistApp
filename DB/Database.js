'use strict';
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  dates: [
    '2023-07-15T14:23:00',
    '2024-02-28T09:45:00',
    '2025-11-11T20:05:00',
    '2023-11-03T18:12:00',
    '2025-11-01T22:30:00',
    '2025-11-06T07:55:00',
    '2025-11-09T16:40:00',
    '2025-11-10T11:15:00',
  ],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
  locale: 'en-US',
  currency: 'USD',
  toLocale: 1,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  dates: [
    '2023-06-21T13:20:00',
    '2024-04-14T08:30:00',
    '2023-10-29T19:45:00',
    '2024-02-03T23:10:00',
    '2023-08-17T06:25:00',
    '2024-01-08T15:50:00',
    '2023-12-05T10:35:00',
    '2024-03-22T21:00:00',
  ],
  pin: 2222,
  type: 'standard',
  locale: 'el-GR',
  currency: 'EUR',
  toLocale: 0.86,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  dates: [
    '2023-05-30T12:18:00',
    '2024-02-14T07:42:00',
    '2023-11-19T17:28:00',
    '2024-04-08T22:53:00',
    '2023-09-26T05:37:00',
    '2024-01-30T14:22:00',
    '2023-12-28T09:47:00',
    '2024-03-15T19:12:00',
  ],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
  locale: 'fa-IR',
  currency: 'IRR',
  toLocale: 120_000,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  dates: [
    '2023-05-30T12:18:00',
    '2024-02-14T07:42:00',
    '2023-11-19T17:28:00',
    '2024-04-08T22:53:00',
    '2023-09-26T05:37:00',
    '2024-01-30T14:22:00',
    '2023-12-28T09:47:00',
    '2024-03-15T19:12:00',
  ],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
  locale: 'zh-HK',
  currency: 'HKD',
  toLocale: 7.77,
};

export const accounts = [account1, account2, account3, account4];
