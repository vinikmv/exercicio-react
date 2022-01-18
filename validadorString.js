function validador(string) {
  const leftBrackets = ['[', '{', '('];
  const rightBrackets = [']', '}', ')'];
  const hasNumber = /\d/;

  if (hasNumber.test(string)) {
    return console.log('String inválida.');
  }

  let leftStack = [];
  let rightStack = [];
  let stack = [];
  let stringToValidate = [];

  stringToValidate = string.trim().split('');

  stringToValidate.map((value, index) => {
    leftBrackets.map((lB) => {
      if (value === lB) {
        leftStack = [...leftStack, { value, index }];
      }
    });

    rightBrackets.map((rB) => {
      if (value === rB) {
        rightStack = [...rightStack, { value, index }];
      }
    });
  });

  if (
    rightStack.length === 0 ||
    leftStack.length === 0 ||
    rightStack.length !== leftStack.length
  ) {
    return console.log('String inválida');
  }

  const allBrackets = leftStack.concat(rightStack).sort((a, b) => {
    return a.index - b.index;
  });

  for (i = 0; i < allBrackets.length; i++) {
    let currentValue = allBrackets[i].value;
    let stackValue = stack[stack.length - 1];

    if (currentValue === '(' || currentValue === '{' || currentValue === '[') {
      stack.push(currentValue);
    } else if (
      (stackValue === '(' && currentValue === ')') ||
      (stackValue === '{' && currentValue === '}') ||
      (stackValue === '[' && currentValue === ']')
    ) {
      stack.pop();
    } else return false;
  }

  return stack.length === 0
    ? console.log('String válida')
    : console.log('String inválida');
}
