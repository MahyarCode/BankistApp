'use strict';

// FIXME the Currency change implementation

import { btnCurrency } from '../EventHandlers/Elements.js';

export const changeCurrency = function (account, clicked = false) {
  // const currentCurrency = btnCurrency.getAttribute('data-current-currency');
  const movementCopy = account.movements.slice();

  if (clicked === true) {
    btnCurrency.textContent = `Change Currency to ${account.currency}`;
    const newCurrency = movementCopy.map(move => move * account.toLocale);

    return newCurrency;
  } else {
    btnCurrency.textContent = `Change Currency to USD`;

    return movementCopy;
  }
};
