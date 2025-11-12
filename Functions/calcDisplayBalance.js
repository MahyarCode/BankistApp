'use strict';

import { labelBalance } from '../EventHandlers/Elements.js';
import { formattedMovements } from './formattedMovements.js';

export const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${formattedMovements(
    account,
    account.balance.toFixed(2)
  )}`;
};
