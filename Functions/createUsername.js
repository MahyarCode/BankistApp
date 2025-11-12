'use strict';

// DESC Need a function that creates a username for each user based on their first character of name
// 'Steven Thomas Williams' ==> stw
export const createUsername = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(el => el[0])
      .join('');
  });
};
