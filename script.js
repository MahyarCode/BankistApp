'use strict';

import { accounts } from './DB/Database.js';
import {
  btnClose,
  btnLogin,
  btnSort,
  btnLoan,
  btnTransfer,
  btnCurrency,
} from './EventHandlers/Elements.js';
import { closeAccountHandler } from './EventHandlers/closeAccountHandler.js';
import { loginAccountHandler } from './EventHandlers/loginAccountHandler.js';
import { sortTransactionHandler } from './EventHandlers/sortTransactionHandler.js';
import { LoanTransactionHandler } from './EventHandlers/LoanTransactionHandler.js';
import { changeCurrencyHandler } from './EventHandlers/currencyChangeHandler.js';
import { transfer } from './EventHandlers/transfer.js';

import { createUsername } from './Functions/createUsername.js';

createUsername(accounts);

btnClose.addEventListener('click', closeAccountHandler);
btnLogin.addEventListener('click', loginAccountHandler);
btnSort.addEventListener('click', sortTransactionHandler);
btnLoan.addEventListener('click', LoanTransactionHandler);
btnTransfer.addEventListener('click', transfer);

// FIXME the Currency change implementation
btnCurrency.addEventListener('click', changeCurrencyHandler);
