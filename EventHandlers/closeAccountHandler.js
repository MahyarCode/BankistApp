'use strict';
import { currentAccount } from './loginAccountHandler.js';
import { containerApp, inputClosePin, inputCloseUsername } from './Elements.js';
import { accounts } from '../DB/Database.js';
import { toast } from '../Functions/toast.js';

export const closeAccountHandler = function (e) {
  e.preventDefault();

  if (
    currentAccount?.username === inputCloseUsername.value &&
    currentAccount?.pin === Number(inputClosePin.value)
  ) {
    const deleteIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(deleteIndex, 1);

    toast('Account is deleted successfully', 'info');
    containerApp.style.opacity = 0;
  } else {
    toast(
      'Use the same username as your account, or, the password is incorrect',
      'error'
    );
  }
};
