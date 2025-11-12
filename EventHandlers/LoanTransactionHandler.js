'use strict';
import { currentAccount } from './loginAccountHandler.js';
import { inputLoanAmount } from '../EventHandlers/Elements.js';
import { toast } from '../Functions/toast.js';
import { updateUI } from '../Functions/updateUI.js';

export const LoanTransactionHandler = function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(Number(inputLoanAmount.value));

  if (
    loanAmount &&
    loanAmount > 0 &&
    currentAccount.movements.some(move => move >= loanAmount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      currentAccount.dates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);

    toast('Loan is transferred successfully', 'success');
  } else {
    toast('You are not eligible in case of demanding loan', 'error');
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
};
