// TODO Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// TODO some practice outside the application:

console.log('---------------------- Practice 1 ----------------------');
// DESC PREFIX ++ OPERATOR guide:

// DESC the following code will count the number of deposits and withdrawals in the whole dataset

const { depositNumbers, withdrawalNumbers } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? ++sums.depositNumbers : ++sums.withdrawalNumbers;
      return sums;
    },
    { depositNumbers: 0, withdrawalNumbers: 0 }
  );
console.log(
  'The Number of Deposits: ',
  depositNumbers,
  '\n',
  'The Number of Withdrawals: ',
  withdrawalNumbers
);

// DESC the following code will count the amount of deposits and withdrawals in the whole dataset
const { depositAmount, withdrawalAmount } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.depositAmount += cur) : (sums.withdrawalAmount += cur);
      return sums;
    },
    { depositAmount: 0, withdrawalAmount: 0 }
  );
console.log(
  'The Amount of Deposits: ',
  depositAmount,
  '\n',
  'The Amount of Withdrawals: ',
  withdrawalAmount
);

console.log('---------------------- Practice 2 ----------------------');

const titleCase = function (title) {
  const uppercaseFirstWord = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'and', 'with', 'to', 'other'];
  const newTitle = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : uppercaseFirstWord(word)))
    .join(' ');

  return uppercaseFirstWord(newTitle);
};

console.log(titleCase('this is a title'));
console.log(titleCase('this is another title with other Example'));
console.log(
  titleCase(
    'and this is a title contains subject and object that converted to it'
  )
);
