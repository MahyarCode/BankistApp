'use strict';

export const formattedMovements = function (account, moves) {
  return new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency,
  }).format(moves);
};
