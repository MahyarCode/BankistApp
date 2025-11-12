'use strict';

import {
  labelSumIn,
  labelSumOut,
  labelSumInterest,
} from '../EventHandlers/Elements.js';
import { formattedMovements } from './formattedMovements.js';

export const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const rate = account.interestRate;

  const IN = movements
    .filter(move => move > 0)
    .reduce((acc, cur) => acc + cur, 0);
  const OUT = movements
    .filter(move => move < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const INTEREST = movements
    .filter(move => move > 0)
    // DESC the interest is only added when the interestRate of deposit for each user is greater than 1 euro
    .reduce(
      (acc, cur) => ((cur * rate) / 100 >= 1 ? acc + (cur * rate) / 100 : acc),
      0
    );

  labelSumIn.textContent = `${formattedMovements(
    account,
    Math.abs(IN).toFixed(2)
  )}`;
  labelSumOut.textContent = `${formattedMovements(
    account,
    Math.abs(OUT).toFixed(2)
  )}`;
  labelSumInterest.textContent = `${formattedMovements(
    account,
    INTEREST.toFixed(2)
  )}`;
};
