'use strict';

// FIXME the Currency change implementation

import { changeCurrency } from '../Functions/changeCurrency.js';
import { updateUI } from '../Functions/updateUI.js';
import { currentAccount } from './loginAccountHandler.js';

let clicked = false;
export const changeCurrencyHandler = function (e) {
  e.preventDefault();
  changeCurrency(currentAccount, !clicked);
  clicked = !clicked;
  updateUI(currentAccount);
};
