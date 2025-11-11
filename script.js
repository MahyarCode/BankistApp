'use strict';
// BANKIST APP

/////////////////////////////////////////////////
// TODO Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  dates: [
    '2023-07-15T14:23:00',
    '2024-02-28T09:45:00',
    '2025-11-11T20:05:00',
    '2023-11-03T18:12:00',
    '2025-11-01T22:30:00',
    '2025-11-06T07:55:00',
    '2025-11-09T16:40:00',
    '2025-11-10T11:15:00',
  ],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
  locale: 'en-US',
  currency: 'USD',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  dates: [
    '2023-06-21T13:20:00',
    '2024-04-14T08:30:00',
    '2023-10-29T19:45:00',
    '2024-02-03T23:10:00',
    '2023-08-17T06:25:00',
    '2024-01-08T15:50:00',
    '2023-12-05T10:35:00',
    '2024-03-22T21:00:00',
  ],
  pin: 2222,
  type: 'standard',
  locale: 'el-GR',
  currency: 'EUR',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  dates: [
    '2023-05-30T12:18:00',
    '2024-02-14T07:42:00',
    '2023-11-19T17:28:00',
    '2024-04-08T22:53:00',
    '2023-09-26T05:37:00',
    '2024-01-30T14:22:00',
    '2023-12-28T09:47:00',
    '2024-03-15T19:12:00',
  ],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
  locale: 'fa-IR',
  currency: 'IRR',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  dates: [
    '2023-05-30T12:18:00',
    '2024-02-14T07:42:00',
    '2023-11-19T17:28:00',
    '2024-04-08T22:53:00',
    '2023-09-26T05:37:00',
    '2024-01-30T14:22:00',
    '2023-12-28T09:47:00',
    '2024-03-15T19:12:00',
  ],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
  locale: 'zh-HK',
  currency: 'HKD',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// TODO Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// DESC It is a notification function
const toast = function (message, type) {
  const typeColors = {
    warn: '#fcad03',
    error: '#fc4103',
    info: '#03e7fc',
    success: '#008000',
  };
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'center',
    close: true,
    offset: {
      x: 37.5,
      y: 70,
    },

    style: {
      background: typeColors[type],
      fontFamily: 'Arial',
      fontSize: '16px',
    },
  }).showToast();
};
/////////////////////////////////////////////////
// TODO Functions

// FIXME Need a function that creates a username for each user based on their first character of name
// 'Steven Thomas Williams' ==> stw
const createUsername = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(el => el[0])
      .join('');
  });
};
createUsername(accounts);

// FIXME Need a function to display timer
const startLogOutTimer = function () {
  // DESC set time to 5 minutes
  let time = 300;

  // NOTE the reason of tick() function is to start the countdown immediately after logging in
  const tick = function () {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    // DESC in each call, print the remaining time to UI
    labelTimer.textContent =
      `${min}`.padStart(2, 0) + ':' + `${sec}`.padStart(2, 0);

    // DESC when 0 seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      // DESC Display UI ane Message
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // DESC call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

// FIXME Need a function to calculate the current time when user logs in
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

// FIXME Need a function to turn dates into local date based on region
const formatMovementDate = function (date, locale) {
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

// FIXME Need a function to turn currencies into local currency value of the account region
const formattedMovements = function (account, moves) {
  return new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency,
  }).format(moves);
};

// FIXME Need a function which shows the transactions of each user
const displayMovements = function (account, sort = false) {
  const combinedMovesDates = account.movements.map((mov, i) => {
    return { movement: mov, movementDate: account.dates.at(i) };
  });

  // TODO turn the transaction amounts into the 'locale' for each account ??????

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

// FIXME Need a function to calculate and show the balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${formattedMovements(
    account,
    account.balance.toFixed(2)
  )}`;
};

// FIXME Need a function to calculate and display the summary for "IN", "OUT", "INTEREST"
const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const rate = account.interestRate;

  const IN = movements
    .filter(move => move > 0)
    .reduce((acc, cur) => acc + cur, 0);
  const OUT = movements
    .filter(move => move < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const INTEREST = movements
    .filter(move => move > 0)
    // DESC the interest is only added when the interestRate of deposit for each user is greater than 1 euro
    .reduce(
      (acc, cur) => ((cur * rate) / 100 >= 1 ? acc + (cur * rate) / 100 : acc),
      0
    );

  labelSumIn.textContent = `${formattedMovements(
    account,
    Math.abs(IN).toFixed(2)
  )}`;
  labelSumOut.textContent = `${formattedMovements(
    account,
    Math.abs(OUT).toFixed(2)
  )}`;
  labelSumInterest.textContent = `${formattedMovements(
    account,
    INTEREST.toFixed(2)
  )}`;
};

// FIXME Need a function that does all the updates in display the summary, balance, movements
const updateUI = function (account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};

///////////////////////////////////////
// displayMovements(currentAccount.movements);
// calcDisplayBalance(currentAccount.movements);
// calcDisplaySummary(currentAccount);
///////////////////////////////////////
// TODO Event handlers

// NOTE we should first set the current account to undefined
let currentAccount, timer;

// FIXME "Login Button" When user logs in, its account must show up
btnLogin.addEventListener('click', function (e) {
  // DESC the default of each button when no operation is defined, is to reload the page
  // it prevents form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value.trim()
  );

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
});

// FIXME "Transfer Button" When user logs in, its account must show up
let receiverAccount;
let transferAmount;
btnTransfer.addEventListener('click', function (e) {
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
});

// FIXME "Close Button" When user wants to close its account
btnClose.addEventListener('click', function (e) {
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
});

// FIXME "Sort Button" To sort the transactions (without modifying the original transaction dataset)
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  //DESC this is because every time you click on sort button, it will show you original or sorted data
});

// FIXME "Loan Button" When user asks for Loan
btnLoan.addEventListener('click', function (e) {
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
});
/////////////////////////////////////////////////

// DESC Fake Login
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;
