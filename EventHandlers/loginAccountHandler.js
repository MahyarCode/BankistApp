'use strict';

import {
  inputLoginUsername,
  inputLoginPin,
  labelWelcome,
  labelDate,
  containerApp,
  btnCurrency,
} from './Elements.js';
import { accounts } from '../DB/Database.js';
import { toast } from '../Functions/toast.js';
import { startLogOutTimer } from '../Functions/startLogOutTimer.js';
import { updateUI } from '../Functions/updateUI.js';

// NOTE the currentAccount is specified when user logs in, and it will be used in transfer, loan and delete operations.
export let currentAccount;
let timer;

export const loginAccountHandler = function (e) {
  // DESC the default of each button when no operation is defined, is to reload the page
  // it prevents form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value.trim()
  );

  btnCurrency.textContent = `Change currency to ${currentAccount.currency}`;

  // DESC if user logs in:
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    toast('User Logged in', 'info');

    // DESC Display UI ane Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    // DESC after logged in, the input field must be empty (cancel the display of username and password)
    inputLoginUsername.value = inputLoginPin.value = '';

    // DESC Initiation of Timer:
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // DESC Specifying the present time for labelDate:
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(new Date());

    // DESC Updating the user account
    updateUI(currentAccount);

    // DESC the cursor on PIN or USER input, should lose its focus; therefore, the keyboard won't type in there
    inputLoginPin.blur();
    inputLoginUsername.blur();
  } else {
    toast('The username or password is invalid', 'error');
  }
};
