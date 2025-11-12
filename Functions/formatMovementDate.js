'use strict';

export const formatMovementDate = function (date, locale) {
  const calcDaysPassed = date1 =>
    Math.abs((date1 - Date.now()) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(date).getTime());

  if (daysPassed < 1)
    return (
      'Today' +
      ' - ' +
      `${new Date(date).getHours()}`.padStart(2, 0) +
      ':' +
      `${new Date(date).getMinutes()}`.padStart(2, 0)
    );
  if (1 <= daysPassed && daysPassed < 2)
    return (
      'Yesterday' +
      ' - ' +
      `${new Date(date).getHours()}`.padStart(2, 0) +
      ':' +
      `${new Date(date).getMinutes()}`.padStart(2, 0)
    );
  if (daysPassed <= 7) return `${Math.floor(daysPassed)} days ago.`;
  else {
    // const year = new Date(date).getFullYear();
    // const month = `${new Date(date).getMonth()}`.padStart(2, 0);
    // const day = `${new Date(date).getDate()}`.padStart(2, 0);
    // const hour = `${new Date(date).getHours()}`.padStart(2, 0);
    // const minute = `${new Date(date).getMinutes()}`.padStart(2, 0);

    // return `${year}/${month}/${day} - ${hour}:${minute}`;
    return new Intl.DateTimeFormat(locale).format(new Date(date));
  }
};
