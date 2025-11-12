'use strict';

const updateTime = function () {
  const now = new Date();
  // labelDate.textContent = now;

  const year = now.getFullYear();
  const month = `${now.getMonth()}`.padStart(2, 0);
  const day = `${now.getDate()}`.padStart(2, 0);
  const hour = `${now.getHours()}`.padStart(2, 0);
  const minute = `${now.getMinutes()}`.padStart(2, 0);

  return `${year}/${month}/${day} - ${hour}:${minute}`;
};
