'use strict';

import { displayMovements } from './displayMovements.js';
import { calcDisplayBalance } from './calcDisplayBalance.js';
import { calcDisplaySummary } from './calcDisplaySummary.js';

export const updateUI = function (account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};
