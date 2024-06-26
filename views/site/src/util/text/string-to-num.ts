function isPercent(inputArr, logProcess: boolean = false) {
  let isPercent: boolean = false;
  let numFails: number = 0;
  let periodCount: number = 0;

  for (let index = inputArr.length - 1; index >= 0; index--) {
    let ch = inputArr[index];
    if (ch === '%') {
      numFails++;
      inputArr.splice(index, 1);
      logProcess ? console.log("Remove '%'\n", inputArr) : false;
      if (numFails == 1) {
        let decimalPoint: number = inputArr.findLastIndex((e: string) => e === '.');
        if (decimalPoint > -1) {
          let wholes = inputArr.slice(0, decimalPoint + 1);
          let decimals = inputArr.slice(decimalPoint + 1);
          logProcess ? console.log(`Wholes: ${wholes}\nDecimals: ${decimals}`) : false;
          // refind decimal point
          // check two indexes below decimal point to confirm !undefined
          let i = wholes.findLastIndex(e => '.');
          let newDecimalPosition = i - 2;
          do {
            let i = wholes.findLastIndex(e => '.');
            newDecimalPosition = i - 2;
            newDecimalPosition < 0 ? wholes.unshift('0') : false;
          } while(newDecimalPosition < 0);
          
          wholes.splice(wholes.length - 1, 1);
          wholes.splice(newDecimalPosition, 0, '.');
          inputArr = Array.prototype.concat(wholes, decimals);
        } 
      }
    }
  }

  return inputArr;
}


function runTest(input: {inputString, passed, num}) {
  const logProcess = input.inputString.split('').findIndex(e => e == '.') > -1 ? true : false;
  logProcess ? console.group(`Converting ${input.inputString}`) : false;
  
  // convert string value to array
  let inputArr = input.inputString.split('');
  
  // convert [..., 'p', 'x'] to number array
  // from: ['1', '2', '3', '4', 'p', 'x']
  // to: [1, 2, 3, 4, '', '']
  const numArr = isPercent(inputArr, logProcess).map(ch => {
    if (typeof ch === 'number' && !Number.isNaN(ch)) return ch;
    else
      switch(ch) {
        case '.':
          input.passed = true;
          return ch = '.';
        default:
          return ch = '';
      }
  });

  // convert number array to string
  // from: [1, 2, 3, 4, '', '']
  // to: '1234'
  const numStr = numArr.join('').trim();
  // convert number string to number
  // from: '1234'
  // to: 1234
  input.num = Number(numStr);
  console.groupEnd();

  const {inputString, passed, num} = input;
  return {inputString, passed, num};
}

export default function stringToNum(inputString) {
  let passed = false;
  let num = 0;

  while(!passed) {
    let inputObj = runTest({inputString, passed, num});
    inputString = inputObj.inputString + '.';
    num = inputObj.num;
    passed = inputObj.passed;
  }
  
  return num;
}

// test
/*
console.log(stringToNum('1589'));
console.log(stringToNum('dec15.89%'));
console.log(stringToNum('1%5e89'));
console.log(stringToNum('0001589'));
*/