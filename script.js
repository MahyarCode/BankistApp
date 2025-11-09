'use strict';
// BANKIST APP

/////////////////////////////////////////////////
// TODO Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  dates: [
    '2023/07/15 - 14:23',
    '2024/02/28 - 09:45',
    '2023/11/03 - 18:12',
    '2024/05/19 - 22:30',
    '2023/09/08 - 07:55',
    '2024/01/25 - 16:40',
    '2023/12/12 - 11:15',
    '2024/03/07 - 20:05',
  ],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  dates: [
    '2023/06/21 - 13:20',
    '2024/04/14 - 08:30',
    '2023/10/29 - 19:45',
    '2024/02/03 - 23:10',
    '2023/08/17 - 06:25',
    '2024/01/08 - 15:50',
    '2023/12/05 - 10:35',
    '2024/03/22 - 21:00',
  ],
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  dates: [
    '2023/05/30 - 12:18',
    '2024/02/14 - 07:42',
    '2023/11/19 - 17:28',
    '2024/04/08 - 22:53',
    '2023/09/26 - 05:37',
    '2024/01/30 - 14:22',
    '2023/12/28 - 09:47',
    '2024/03/15 - 19:12',
  ],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  dates: [
    '2023/07/10 - 11:25',
    '2024/02/22 - 16:40',
    '2023/10/15 - 08:55',
    '2024/05/05 - 21:30',
    '2023/08/29 - 13:45',
  ],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
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
labelDate.textContent = updateTime();

// FIXME Need a function which shows the transactions of each user
const displayMovements = function (account, sort = false) {
  const movements = account.movements;
  const dates = account.dates;
  const moves = sort ? movements.toSorted((a, b) => a - b) : movements;

  // NOTE First, the transactions should be empty:
  // DESC innerHTML targets whole tags inside the elements.
  containerMovements.innerHTML = '';
  // NOTE Then, it should show the new user account transaction details:
  moves.forEach((move, index) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const rowHTML = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__date">${dates[index]}</div>
        <div class="movements__value">${move.toFixed(2)}€</div>
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
  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
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

  labelSumIn.textContent = `${IN.toFixed(2)}€`;
  labelSumOut.textContent = `${Math.abs(OUT).toFixed(2)}€`;
  labelSumInterest.textContent = `${INTEREST.toFixed(2)}€`;
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
let currentAccount;

// FIXME "Login Button" When user logs in, its account must show up
btnLogin.addEventListener('click', function (e) {
  // DESC the default of each button when no operation is defined, is to reload the page
  // it prevents form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value.trim()
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    toast('User Logged in', 'info');

    // DESC Display UI ane Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 10;
    // DESC after logged in, the input field must be empty (cancel the display of username and password)
    inputLoginUsername.value = inputLoginPin.value = '';

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

    currentAccount.dates.push(updateTime());
    receiverAccount.dates.push(updateTime());

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
    currentAccount.movements.push(loanAmount);
    currentAccount.dates.push(updateTime());
    updateUI(currentAccount);

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
