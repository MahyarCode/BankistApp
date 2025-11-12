'use strict';

import { containerMovements } from '../EventHandlers/Elements.js';
import { formatMovementDate } from './formatMovementDate.js';
import { formattedMovements } from './formattedMovements.js';

export const displayMovements = function (account, sort = false) {
  const combinedMovesDates = account.movements.map((mov, i) => {
    return { movement: mov, movementDate: account.dates.at(i) };
  });

  // DESC at first, all the reports are sorted from present to past
  const sortedByDatesFirst = combinedMovesDates.sort(
    (a, b) => new Date(a.movementDate) - new Date(b.movementDate)
  );

  // DESC if sort === true: sort the report based on transaction amount $
  const moves = sort
    ? sortedByDatesFirst.toSorted((a, b) => a.movement - b.movement)
    : sortedByDatesFirst;

  // NOTE First, the transactions should be empty:
  // DESC innerHTML targets whole tags inside the elements.
  containerMovements.innerHTML = '';
  // NOTE Then, it should show the new user account transaction details:
  moves.forEach((obj, index) => {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const rowHTML = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__date">${formatMovementDate(
          movementDate,
          account.locale
        )}</div>
        <div class="movements__value">${formattedMovements(
          account,
          movement
        )}</div>
      </div>
        `;
    // DESC the following method insert the html to the tag
    containerMovements.insertAdjacentHTML('afterbegin', rowHTML);

    // NOTE just changing the style to look better:
    // DESC selecting even rows
    document
      .querySelectorAll('.movements__row')
      .forEach((row, i) =>
        i % 2 === 0
          ? (row.style.backgroundColor = '#8bf0f9ff')
          : (row.style.backgroundColor = '#fdfefeff')
      );
  });
};
