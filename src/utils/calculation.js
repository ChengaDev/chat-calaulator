export const calculate = (mathExpression) => {
    // split by whitespace
    let [firstNumber, operator, secondNumber] = mathExpression.split(" ");

    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

    switch (operator.toLowerCase()) {
        case '*':
            return firstNumber * secondNumber;
        case '/':
            return firstNumber / secondNumber;
        case 'x':
            return firstNumber * secondNumber;
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        default: {
            return firstNumber + secondNumber;
        }
    }
};