'use strict';

import { currentAccount } from './loginAccountHandler.js';
import { displayMovements } from '../Functions/displayMovements.js';

let sorted = false;
export const sortTransactionHandler = function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  //DESC this is because every time you click on sort button, it will show you original or sorted data
};
