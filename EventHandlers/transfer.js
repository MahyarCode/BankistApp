'use strict';

import { currentAccount } from './loginAccountHandler.js';
let receiverAccount;

import { accounts } from '../DB/Database.js';
import { inputTransferTo, inputTransferAmount } from './Elements.js';
import { toast } from '../Functions/toast.js';
import { updateUI } from '../Functions/updateUI.js';

export const transfer = function (e) {
  e.preventDefault();
  receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value.trim()
  );
  const transferValue = Number(inputTransferAmount.value);

  if (
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username &&
    transferValue > 0 &&
    transferValue <= currentAccount.balance
  ) {
    currentAccount.movements.push(-Number(transferValue));
    receiverAccount.movements.push(Number(transferValue));

    currentAccount.dates.push(new Date().toISOString());
    receiverAccount.dates.push(new Date().toISOString());

    // DESC the cursor on PIN or USER input, should lose its focus; therefore, the keyboard won't type in there
    inputTransferTo.blur();
    inputTransferAmount.blur();

    // DESC after successful transfer in, the input field must be empty (cancel the display of transfer details)
    inputTransferTo.value = inputTransferAmount.value = '';
    toast(
      `The Transaction to ${receiverAccount.owner} was Successful`,
      'success'
    );
    updateUI(currentAccount);
  } else {
    toast('The user account is not valid or not found', 'error');
  }
};
